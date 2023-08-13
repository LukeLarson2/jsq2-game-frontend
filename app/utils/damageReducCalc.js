// Damage Reduction Calculation
const damageReducCalc = (user, playerRes, enemyRes) => {
  const resistResult = { resist: 0 };
  if (user === "player") {
    resistResult.resist = enemyRes;
  } else {
    resistResult.resist = playerRes;
  }
  return resistResult;
};

export default damageReducCalc;
