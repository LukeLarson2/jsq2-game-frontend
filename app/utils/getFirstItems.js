import axios from 'axios';
import dbURI from '../lib/dbURI'

const getFirstItems = async (role) => {
  try {
    const response = await axios.get(`${dbURI}/items`);
    const items = response.data;

    // Filter items with quality of 'Common' and where rolesUsedBy includes the role
    const filteredItems = items.filter(item => {
      return item.quality === 'Common' && item.rolesUsedBy.includes(role);
    });

    return filteredItems;
  } catch (error) {
    console.error(`Error occurred while getting bag items: ${error}`);
    return [];
  }
}

export default getFirstItems;
