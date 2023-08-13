import damageCalc from '../utils/damageCalc'
import dbURI from '../lib/dbURI'

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
  currentUser, selectedCharacter) => {
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
    "Authorization": `Bearer ${currentUser}`, // Assuming you use a Bearer token for authentication
  },
  body: JSON.stringify({
    selectedCharacterId: character._id, // Using character's ID
    energy: newEnergy,
    currentUser:currentUser
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
};

export default handleLifeSteal