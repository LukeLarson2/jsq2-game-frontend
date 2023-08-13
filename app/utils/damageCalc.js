import toHitCalc from "../utils/toHitCalc";
import dodgeCalc from "../utils/dodgeCalc";
import damageReducCalc from "../utils/damageReducCalc";

const damageCalc = (
  attacker,
  skillDmg,
  mainHand,
  offHand,
  playerArmor,
  minDamage,
  maxDamage,
  enemyAcc,
  enemy
) => {
  const hitResult = toHitCalc(attacker, mainHand.accuracy, enemyAcc);
  if (attacker === "player") {
    if (hitResult.hit) {
      const dodgeResult = dodgeCalc(attacker, playerArmor.dodge, enemy.dodge);
      if (!dodgeResult.dodge) {
        const resistResult = damageReducCalc(
          attacker,
          playerArmor.shielding,
          enemy.resist
        );
        const mainHandDmg = Number.parseFloat(mainHand.damage / 100);

        const offHandDmg = Number.parseFloat(offHand.damage / 100);

        const mainDmgPer = Number.parseInt(Math.ceil(skillDmg * mainHandDmg));

        const offDmgPer = Number.parseInt(Math.ceil(skillDmg * offHandDmg));

        const totalDamage = Number.parseInt(skillDmg + mainDmgPer + offDmgPer);
        const damageReducedPercent = Number.parseFloat(
          resistResult.resist / 100
        );
        const damageReduced = Math.floor(
          totalDamage - totalDamage * damageReducedPercent
        );

        if (hitResult.crit) {
          return Number.parseInt(
            Math.ceil(damageReduced + damageReduced * 0.15)
          );
        }

        return damageReduced;
      }
    }
    return 0; // Dodge or not hit
  } else if (attacker === "enemy") {
    if (hitResult.hit) {
      const dodgeResult = dodgeCalc(attacker, playerArmor.dodge, enemy.dodge);

      if (!dodgeResult.dodge) {
        const resistResult = damageReducCalc(
          attacker,
          playerArmor.shielding,
          enemy.resist
        );

        const damageRange =
          Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

        const damageReducedPercent = Number.parseFloat(
          resistResult.resist / 100
        );

        const damageReduced = Math.floor(
          damageRange - damageRange * damageReducedPercent
        );

        if (hitResult.crit) {
          return Number.parseInt(
            Math.ceil(damageReduced + damageReduced * 0.15)
          );
        }
        return damageReduced;
      }
    }
    return 0; // Dodge or not hit
  }
  return 0; // For any other cases (although shouldn't reach here with "player" and "enemy")
};
export default damageCalc;
