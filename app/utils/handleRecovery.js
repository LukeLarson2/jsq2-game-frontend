import dbURI from '../lib/dbURI'

const handleRecovery = async (
  recoveryToNum,
  character,
  currentEnergy,
  setBattleRecovery,
  battleRecovery,
  setIsRecovering,
  setTurn,
  setPlayerRecoveryDisplyed,
  setDisplayedRecovery,
  setCurrentEnergy,
  setIsAttacking,
  currentUser,
  selectedCharacterId
) => {
  const maxEnergyCheck =
    currentEnergy + recoveryToNum > 100 ? 100 : recoveryToNum;
  const newEnergy =
    maxEnergyCheck === 100 ? 100 : currentEnergy + recoveryToNum;
  await fetch(`${dbURI}/users/characters/energy`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser}`, // Assuming you use a Bearer token for authentication
    },
    body: JSON.stringify({
      selectedCharacterId: character._id, // Using character's ID
      energy: newEnergy,
      currentUser: currentUser,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setDisplayedRecovery(recoveryToNum);

      setTimeout(() => {
        setPlayerRecoveryDisplyed(true);
      }, 300);

      setTimeout(() => {
        setCurrentEnergy(newEnergy);
      }, 900);
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  setTimeout(() => {
    setIsRecovering(false);
    setIsAttacking(false);
  }, 2200);
  setBattleRecovery(!battleRecovery);
  setIsRecovering(true);
  setTurn(false);
  setTimeout(() => setPlayerRecoveryDisplyed(false), 1800);
};

export default handleRecovery;
