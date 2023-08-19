import damageCalc from "../utils/damageCalc";
import dbURI from "../lib/dbURI";
import axios from 'axios'

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
      Authorization: `Bearer ${currentUser}`, // Assuming currentUser is the loginToken
    },
    body: JSON.stringify({
      selectedCharacterId, // Use selectedCharacterId instead of _id
      energy: newEnergy,
      currentUser,
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

  if (outgoingDamage > 0) {
    const maxHealthCheck = playerHealth + healingToNum > 100 ? 100 : healingToNum;
    const newHealth = maxHealthCheck === 100 ? 100 : playerHealth + healingToNum;
    await axios.put(`${dbURI}/users/characters/health`, {
      selectedCharacterId,
      health: newHealth,
      currentUser,
    })
    .then((response) => {
      // With axios, the response data is located in response.data
      setDisplayedRecovery(healingToNum);
      setTimeout(() => setPlayerRecoveryDisplayed(true), 600);
      setTimeout(() => setPlayerHealth(newHealth), 1000);
      getPlayerHealth(character, setPlayerHealth);
      return response.data; // Return the data from the response
    })
    .catch((error) => {
      console.error("Error:", error);
      // You can access more details with error.response
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      }
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
