import damageCalc from "../utils/damageCalc";
import dbURI from "../lib/dbURI";

const handleLifeSteal = async (
  user,
  damageToNum,
  mainHand,
  offHand,
  armor,
  currentEnemy,
  character,
  enemyHealth,
  currentEnergy,
  skillEnergy,
  setIsAttacking,
  setTurn,
  setEnemyHealth,
  setEnemyDamageTaken,
  handleHit,
  setEnemyDamageDisplayed,
  setDisplayedDamage,
  triggerQuote,
  setCurrentEnergy,
  currentUser,
  selectedCharacterId,
  healingToNum,
  playerHealth,
  setBattleRecovery,
  battleRecovery,
  setIsRecovering,
  setDisplayedRecovery,
  setPlayerHealth,
  getPlayerHealth,
  setPlayerRecoveryDisplayed
) => {
  const outgoingDamage = damageCalc(
    user,
    damageToNum,
    mainHand,
    offHand,
    armor,
    0,
    0,
    0,
    currentEnemy
  );

  const damageToEnemy = enemyHealth - Number.parseInt(outgoingDamage);
  const newEnergy = currentEnergy - skillEnergy;

  await fetch(`${dbURI}/users/characters/energy`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser}`, // Assuming you use a Bearer token for authentication
    },
    body: JSON.stringify({
      selectedCharacterId: selectedCharacterId, // Using character's ID
      energy: newEnergy,
      currentUser: currentUser,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setCurrentEnergy(newEnergy);
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  setIsAttacking(true);
  setTimeout(() => {
    setTurn(false);
    setEnemyHealth(damageToEnemy);
    setEnemyDamageTaken(Number.parseInt(outgoingDamage));
    handleHit("player", Number.parseInt(outgoingDamage));
    setEnemyDamageDisplayed(true);
    setDisplayedDamage(
      Number.parseInt(outgoingDamage) < 1
        ? "Miss"
        : `- ${Number.parseInt(outgoingDamage)}`
    );
    triggerQuote(damageToEnemy < 1 ? "missQuotes" : "damageQuotes");
    setTimeout(() => {
      setEnemyDamageDisplayed(false);
    }, 1800);
  }, 300);
  setTimeout(() => setIsAttacking(false), 2200);

  if (damageToEnemy > 0) {
    const maxHealthCheck =
      playerHealth + healingToNum > 100 ? 100 : healingToNum;
    const newHealth =
      maxHealthCheck === 100 ? 100 : playerHealth + healingToNum;
    await fetch(`${dbURI}/users/characters/health`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`, // Assuming you use a Bearer token for authentication
      },
      body: JSON.stringify({
        selectedCharacterId, // Using character's ID
        health: newHealth,
        currentUser: currentUser,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setDisplayedRecovery(healingToNum);
        setTimeout(() => setPlayerRecoveryDisplayed(true), 600);
        setTimeout(() => setPlayerHealth(newHealth), 1000);
        getPlayerHealth(character, setPlayerHealth);
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setBattleRecovery(!battleRecovery);
    setIsRecovering(true);
    setTurn(false);
    setTimeout(() => {
      setIsRecovering(false);
      setIsAttacking(false);
    }, 2100);
    setTimeout(() => setPlayerRecoveryDisplayed(false), 1800);
  }
};

export default handleLifeSteal;
