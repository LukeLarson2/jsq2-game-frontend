const axios = require("axios");
import dbURI from '../lib/dbURI'
async function getCharacterInfo(currentUser, selectedCharacterId) {
  try {
    // Fetch the user's character based on the current user's token and selectedCharacterId
    const characterResponse = await axios.post(`${dbURI}/users/characters`, {
      selectedCharacterId, currentUser
    });
    const character = characterResponse.data;

    if (!character) {
      console.error("Character not found");
      return null;
    }

    return character;
  } catch (error) {
    console.error(`Error occurred while getting character information: ${error}`);
    return null;
  }
}


export default getCharacterInfo;
