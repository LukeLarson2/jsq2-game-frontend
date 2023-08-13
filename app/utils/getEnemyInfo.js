const axios = require("axios");
import dbURI from '../lib/dbURI'

async function getEnemyInfo() {
  try {
    const response = await axios.get(`${dbURI}/enemies`);
    return response.data;
  } catch (error) {
    console.error(`Error occurred while getting enemy information: ${error}`);
  }
}

export default getEnemyInfo;
