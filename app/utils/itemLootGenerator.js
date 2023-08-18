import axios from "axios";
import dbURI from '../lib/dbURI'
// Define qualities and their associated probabilities.

const qualities = [
  { quality: "Common", probability: 0.5 },
  { quality: "Uncommon", probability: 0.25 },
  { quality: "Rare", probability: 0.12 },
  { quality: "Epic", probability: 0.08 },
  { quality: "Legendary", probability: 0.04 },
  { quality: "Mythic", probability: 0.01 },
];

// Define container types.
const containers = [
  "common-barrel",
  "rusty-iron-chest",
  "iron-chest",
  "steel-chest",
  "decorated-steel-chest",
  "mithril-chest",
  "enchanted-mithril-chest",
  "transcendent-mithril-chest",
];

// A function to select a random quality based on the probabilities.
// Items pool.
// Function to get a random quality based on the probabilities.
function randomQuality() {
  let sum = 0;
  const r = Math.random();
  for (let i = 0; i < qualities.length; i++) {
    sum += qualities[i].probability;
    if (r <= sum) {
      return qualities[i].quality;
    }
  }
}

// Function to get items from database.
async function getBagItems() {
  try {
    const response = await axios.get(`${dbURI}/items`);
    return response.data;
  } catch (error) {
    console.error(`Error occurred while getting bag items: ${error}`);
  }
}

// Function to get a random item from a quality level.
const getRandomItem = (items, quality) => {
  const filteredItems = items.filter((item) => item.quality === quality);
  const item = filteredItems[Math.floor(Math.random() * filteredItems.length)];
  return item;
};

// Updated findItems function.
// Updated findItems function.
const itemLootGenerator = async (container) => {
  let items = [];

  let maxQualityIndex = containers.indexOf(container);
  if (maxQualityIndex >= qualities.length) {
    maxQualityIndex = qualities.length - 1;
  }

  // Fetch items from the database.
  const itemsPool = await getBagItems();

  for (let i = 0; i < 5; i++) {
    let item = null;
    while (item === null) {
      let quality = randomQuality();
      let qualityIndex = qualities.findIndex((q) => q.quality === quality);

      if (
        ["mithril-chest", "enchanted-mithril-chest"].includes(container) &&
        ["Common", "Uncommon"].includes(quality)
      ) {
        continue;
      }

      if (
        container === "transcendent-mithril-chest" &&
        ["Common", "Uncommon", "Rare"].includes(quality)
      ) {
        continue;
      }

      if (qualityIndex <= maxQualityIndex) {
        item = getRandomItem(itemsPool, quality);
      }
    }

    // Randomize the shielding, dodge, damage, and accuracy values within a range of +/- 2% of the original value.
    let totalPercentageChange = 0;
    ["shielding", "dodge", "damage", "accuracy"].forEach((key) => {
      const originalValue = item[key];
      const randomFactor = 1 + (Math.random() * 0.04 - 0.02); // Random factor between 98% to 102%
      const newValue = Math.ceil(originalValue * randomFactor)
      totalPercentageChange += (newValue - originalValue) / originalValue;
      item[key] = newValue;
    });

    // Adjust the value of the item based on the total percentage change from the base stats.
    item.value = item.value * (1 + totalPercentageChange);

    items.push(item);
  }

  return items;
};


export default itemLootGenerator;
