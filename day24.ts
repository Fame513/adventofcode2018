import {getInput, getTestFunction} from './helper';

const DAY = 24;

class Army {
  units: number;
  hp: number;
  weak: string[] = [];
  immune: string[];
  attack: number;
  attackType: string;
  initiative: number;
  boost: number = 0;


  constructor(units: number, hp: number, weak: string[], immune: string[], attack: number, attackType: string, initiative: number) {
    this.units = units;
    this.hp = hp;
    this.weak = weak;
    this.immune = immune;
    this.attack = attack;
    this.attackType = attackType;
    this.initiative = initiative;
  }
  
  getEffectivePower(): number {
    return this.units * (this.attack + this.boost);
  }
  
  getDamageBy(enemy: Army): number {
    if (this.immune.indexOf(enemy.attackType) >= 0) {
      return 0;
    } else {
      return enemy.getEffectivePower() * (this.weak.indexOf(enemy.attackType) >= 0 ? 2 : 1)
    }
  }
  
  hitBy(enemy: Army): boolean {
    const power = this.getDamageBy(enemy);
    this.units -= Math.floor(power / this.hp);
    return this.units > 0;
  }
  
  selectArmyForAttack(enemies: Army[]): Army | undefined {
    enemies.sort((a, b) => {
      let ret = b.getDamageBy(this) - a.getDamageBy(this);
      if (ret === 0) {
        ret = b.getEffectivePower() - a.getEffectivePower();
      }
      if (ret === 0) {
        ret = b.initiative - a.initiative;
      }
      return ret;
    });
    
    // for (const en of enemies) {
    //   if (en.hp <= en.getDamageBy(this)) {
    //     return en;
    //   }
    // } 
    //
    return enemies[0];
  }
}

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(immunes: Army[], infections: Army[]) {
  while (immunes.length && infections.length) {
    const attackMap: Map<Army, Army> = new Map();
    
    immunes.sort(targetSelectionSort);
    const infectionsForAttack = infections.slice();
    for (const im of immunes) {
      const target = im.selectArmyForAttack(infectionsForAttack);
      if (target) {
        attackMap.set(im, target);
        infectionsForAttack.splice(infectionsForAttack.indexOf(target), 1);
      }
    }

    infections.sort(targetSelectionSort);
    const immunesForAttack = immunes.slice();
    for (const inf of infections) {
      const target = inf.selectArmyForAttack(immunesForAttack);
      if (target) {
        attackMap.set(inf, target);
        immunesForAttack.splice(immunesForAttack.indexOf(target), 1);
      }
    }
    
    const atackers = Array.from(attackMap.keys());
    atackers.sort((a, b) => b.initiative - a.initiative);
    for (const atacker of atackers) {
      if (atacker.units > 0) {
        const enemy = attackMap.get(atacker);
        enemy.hitBy(atacker);
      }
    }

    immunes = immunes.filter(v => v.units > 0);
    infections = infections.filter(v => v.units > 0);
  }
  
  return immunes.length ? immunes.reduce((buff, v) => buff + v.units, 0) : infections.reduce((buff, v) => buff + v.units, 0)
}

function targetSelectionSort(a: Army, b: Army) {
  let val = b.getEffectivePower() - a.getEffectivePower();
  if (val === 0) {
    val = b.initiative - a.initiative;
  }
  return val;
}

function calculatePart2(input: string) {
  let boost = 1000;
  let deltaBoost = 1000;
  let prevResult = false;
  
  while (true) {
    let [immunes, infections] = parse(input);
    for (const im of immunes) {
      im.boost = boost;
    }
    while (immunes.length && infections.length) {
      const attackMap: Map<Army, Army> = new Map();

      immunes.sort(targetSelectionSort);
      const infectionsForAttack = infections.slice();
      for (const im of immunes) {
        const target = im.selectArmyForAttack(infectionsForAttack);
        if (target) {
          attackMap.set(im, target);
          infectionsForAttack.splice(infectionsForAttack.indexOf(target), 1);
        }
      }

      infections.sort(targetSelectionSort);
      const immunesForAttack = immunes.slice();
      for (const inf of infections) {
        const target = inf.selectArmyForAttack(immunesForAttack);
        if (target) {
          attackMap.set(inf, target);
          immunesForAttack.splice(immunesForAttack.indexOf(target), 1);
        }
      }

      const atackers = Array.from(attackMap.keys());
      atackers.sort((a, b) => b.initiative - a.initiative);
      for (const atacker of atackers) {
        if (atacker.units > 0) {
          const enemy = attackMap.get(atacker);
          enemy.hitBy(atacker);
        }
      }

      immunes = immunes.filter(v => v.units > 0);
      infections = infections.filter(v => v.units > 0);
    }
    const result = !!immunes.length;
    console.log('Win with boost', boost, result ? 'Immune system' : 'infection');
    
    if (!prevResult && result && deltaBoost === 1) {
      return immunes.reduce((buff, v) => buff + v.units, 0);
    } else {
      if (prevResult !== result) {
        deltaBoost = Math.ceil(deltaBoost * -0.5);
      }
      prevResult = result;
      boost += deltaBoost;
      if (boost === 68) {
        boost += deltaBoost;
      }
    }
  }
}

function parse(input: string): [Army[], Army[]] {
  const regexp = /(\d+) units each with (\d+) hit points (\(.*\) )?with an attack that does (\d+) (\w+) damage at initiative (\d+)/;
  const weakRegex = /weak to ([^;)]*)[;)]/;
  const immuneRegex = /immune to ([^;)]*)[;)]/;
  const [immune, infection] = input.split('\n\n');
  const immunes = immune.split('\n').slice(1)
    .map(row => row.match(regexp))
    .map(val => {
      let weak = [];
      let immune = [];
      if (val[3]) {
        const weakMatch = val[3].match(weakRegex);
        const immuneMatch = val[3].match(immuneRegex);
        if (weakMatch) {
          weak = weakMatch[1].split(', ');
        }
        if (immuneMatch) {
          immune = immuneMatch[1].split(', ');
        }
      }
      return new Army(+val[1], +val[2], weak, immune, +val[4], val[5], +val[6]);
    });

  const infections = infection.split('\n').slice(1)
    .map(row => row.match(regexp))
    .map(val => {
      let weak = [];
      let immune = [];
      if (val[3]) {
        const weakMatch = val[3].match(weakRegex);
        const immuneMatch = val[3].match(immuneRegex);
        if (weakMatch) {
          weak = weakMatch[1].split(', ');
        }
        if (immuneMatch) {
          immune = immuneMatch[1].split(', ');
        }
      }
      return new Army(+val[1], +val[2], weak, immune, +val[4], val[5], +val[6]);
    });
    
  return [immunes, infections];
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(...parse(input));
  const result2 = calculatePart2(input);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(...parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  part1Test(`Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`, 5216);
  console.log('---------------------');

  part2Test(`Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`, 51);
  console.log('---------------------');
}