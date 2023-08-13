import dbURI from '../lib/dbURI'

const handleHealing = async (
  healingToNum,
  character,
  playerHealth,
  currentEnergy,
  skillEnergy,
  setBattleRecovery,
  battleRecovery,
  setIsRecovering,
  setTurn,
  setIsAttacking,
  setDisplayedRecovery,
  setCurrentEnergy,
  setPlayerHealth,
  getPlayerHealth,
  setPlayerRecoveryDisplyed,
  currentUser,
  selectedCharacterId
) => {
  const maxHealthCheck = playerHealth + healingToNum > 100 ? 100 : healingToNum;
  const newHealth = maxHealthCheck === 100 ? 100 : playerHealth + healingToNum;
  await fetch(`${dbURI}/users/characters/health`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${loginToken}`, // Assuming you use a Bearer token for authentication
    },
    body: JSON.stringify({
      selectedCharacterId: character._id, // Using character's ID
      health: newHealth,
      currentUser:currentUser
    }),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    setDisplayedRecovery(healingToNum);
    setTimeout(() => setPlayerRecoveryDisplyed(true), 600);
    setTimeout(() => setPlayerHealth(newHealth), 1000);
    getPlayerHealth(character, setPlayerHealth)
    return response.json();
  })
  .catch((error) => {
    console.error("Error:", error);
  });


  const newEnergy = currentEnergy - skillEnergy;
  await fetch(`${dbURI}/users/characters/energy`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${loginToken}`, // Assuming you use a Bearer token for authentication
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

    setBattleRecovery(!battleRecovery);
    setIsRecovering(true);
    setTurn(false);
    setTimeout(() => {
      setIsRecovering(false);
      setIsAttacking(false);
    }, 2100);
    setTimeout(() => setPlayerRecoveryDisplyed(false), 1800);
};

export default handleHealing;
