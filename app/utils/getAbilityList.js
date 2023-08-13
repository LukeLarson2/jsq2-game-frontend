const axios = require("axios");
import dbURI from '../lib/dbURI'

async function getAbilityList() {
  try {
    const response = await axios.get(`${dbURI}/abilities`);
    return response.data;
  } catch (error) {
    console.error(
      `Error occurred while getting character information: ${error}`
    );
  }
}

export default getAbilityList;
