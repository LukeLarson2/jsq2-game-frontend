// Dodge Calculation
const dodgeCalc = (user, playerDef, enemyDef) => {
  const randomEvade = Math.floor(Math.random() * 100) + 1;
  const dodgeResult = { dodge: false };
  if (user === "player") {
    if (enemyDef > randomEvade) {
      dodgeResult.dodge = true;
    }
  } else {
    if (playerDef > randomEvade) {
      dodgeResult.dodge = true;
    }
  }
  return dodgeResult;
};

export default dodgeCalc;
