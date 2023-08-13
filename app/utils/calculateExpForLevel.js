function calculateExpForLevel(level) {
  if (level < 1 || level > 30) {
    throw new Error("Level should be between 1 and 30");
  }

  // This is our base experience needed to go from level 1 to 2.
  let baseExp = 6;

  // exp = baseExp * (rate ^ (level - 2))
  // For levels 1 to 5, we'll use a smaller rate to make leveling easier.
  let rate = level <= 5 ? 1.05 : 1.75;

  if (level === 1) {
    return 6;
  }

  // Calculate the experience needed for the level
  let exp = baseExp;
  for (let i = 2; i < level; i++) {
    exp *= rate;
  }

  // Round up to the nearest whole number, as we can't have fractions of experience points.
  const expNeeded = Math.ceil(exp);

  return expNeeded;
}

export default calculateExpForLevel;
