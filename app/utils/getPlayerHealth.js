import axios from 'axios'
import dbURI from '../lib/dbURI'

const getPlayerHealth = async (currentUser, selectedCharacterId, setPlayerHealth) => {
  try{

  const response = await axios.post(`${dbURI}/users/characters/health`, {
      selectedCharacterId,
      currentUser
    })
    const playerHealth = response.data

    if (!playerHealth) {
      console.error("Character not found");
      return null;
    }
    return playerHealth;
  } catch (error) {
    console.error(`Error occurred while getting character information: ${error}`);
    return null;
  }
  };

export default getPlayerHealth;
