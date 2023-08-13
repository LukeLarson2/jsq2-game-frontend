const axios = require("axios");
import dbURI from '../lib/dbURI'

async function getBagItems() {
  try {
    const response = await axios.get(`${dbURI}/items`);
    return response.data;
  } catch (error) {
    console.error(`Error occurred while getting bag items: ${error}`);
  }
}

export default getBagItems;
