const toHitCalc = (attacker, mainHand, enemyAcc) => {
  const hitValue = Math.floor(Math.random() * 100) + 1;
  const hitObj = { hit: false, crit: false, critMessage: "" };
  if (attacker === "player") {
    const mainAcc = Number.parseInt(mainHand);
    if (mainAcc >= hitValue) {
      hitObj.hit = true;
    }
    if (hitObj.hit) {
      const rollForCrit = Math.floor(Math.random() * 20) + 1;
      if (rollForCrit === 20) {
        hitObj.crit = true;
        hitObj.critMessage = "Critical Hit!";
      }
    }
  } else {
    const enemyAccNum = Number.parseInt(enemyAcc);
    if (enemyAccNum >= hitValue) {
      hitObj.hit = true;
    }
    if (hitObj.hit) {
      const rollForCrit = Math.floor(Math.random() * 20) + 1;
      if (rollForCrit === 20) {
        hitObj.crit = true;
        hitObj.critMessage = "Critical Hit!";
      }
    }
  }
  return hitObj;
};

export default toHitCalc;
