"use client";
import React, { useState, useEffect } from "react";
import FriendlyNPCCard from "./FriendlyNPCCard";
import OpenContainer from "./OpenContainer";
import BuySellGoods from "./BuySellGoods";
import getContainerImage from "../utils/getContainerImage";
import getShopImage from "../utils/getShopImage";
import getShopStory from "../utils/getShopStory";
import templeStory from "../utils/templeStory";
import goldenRuinsStory from "../utils/goldenRuinsStory";
import keyStory from "../utils/keyStory";
import axios from "axios";
import "../stylesheets/StoryModal.css";
import dbURI from "../lib/dbURI";

const StoryModal = ({
  userStory,
  setUserStory,
  setShowMap,
  setArea,
  setRace,
  setLevel,
  setShowBattle,
  currentIndex,
  setCurrentIndex,
  setShowStory,
  regionBackground,
  setRegionBackground,
  characterId,
  characterRace,
  inventory,
  playerHealth,
  currentEnergy,
  setPlayerHealth,
  setCurrentEnergy,
  useItem,
  setUseItem,
  sellItem,
  isLoading,
  setIsLoading,
  shopItems,
  buyItem,
  equippedGear,
  enoughGold,
  setEnoughGold,
  currentGold,
  setCurrentGold,
  setShowDeath,
  setShopType,
  shopType,
  setCurrentArenaLevel,
  currentArenaLevel,
  setGetReward,
  getReward,
  setArenaTracker,
  arenaTracker,
  setFinalStory,
  finalStory,
  setDisplayEndGameModal,
  currentUser,
  selectedCharacterId,
  sellAllItemsOfQuality,
  itemQuantity,
  setItemQuantity,
}) => {
  const [isContainer, setIsContainer] = useState(false);
  const [choices, setChoices] = useState({});
  const [containerType, setContainerType] = useState("");
  const [containerImage, setContainerImage] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [isShop, setIsShop] = useState(false);
  const [shopStory, setShopStory] = useState([]);
  const [showShopGoods, setShowShopGoods] = useState(false);
  const [savedIndex, setSavedIndex] = useState(0);
  const [shopIndex, setShopIndex] = useState(0);
  const [inTemple, setInTemple] = useState(false);
  const [shopKeeper, setShopKeeper] = useState({});
  const [inCave, setInCave] = useState(false);
  const [specialBackground, setSpecialBackground] = useState("");

  const nextItem = userStory[currentIndex + 1];

  const deleteKey = async (key) => {
    try {
      // Removing the item from the inventory
      await axios.delete(
        `${dbURI}/users/characters/inventory?selectedCharacterId=${selectedCharacterId}&key=${key}&currentUser=${currentUser}`
      );
      // If the request is successful, do something here, e.g., close the modal
    } catch (error) {
      console.error("An error occurred while deleting the item: ", error);
    }
  };

  const updateArenaLevel = async () => {
    try {
      // Fetch the current arena level
      const responseArenaLevel = await axios.post(
        `${dbURI}/users/characters/arenaLevel`,
        {
          selectedCharacterId,
          currentUser,
        }
      );
      if (!responseArenaLevel.data) {
        console.error("Invalid response for arena level");
        return;
      }

      const pulledArenaLevel = responseArenaLevel.data.arenaCount;

      await axios.put(`${dbURI}/users/characters/arenaLevel`, {
        selectedCharacterId,
        pulledArenaLevel, // Send current value without incrementing
        currentUser,
      });
      setCurrentArenaLevel(pulledArenaLevel + 1);
    } catch (error) {
      console.error(
        "An error occurred while updating the arena level: ",
        error.message
      );
    }
  };

  const arenaReward = async () => {
    try {
      // Increasing character's gold
      await axios.put(`${dbURI}/users/characters/gold`, {
        selectedCharacterId, // Using selectedCharacterId
        gold: 30000,
        currentUser,
      });
      // If successful, you might want to update the character's gold in the client's state
    } catch (error) {
      console.error(
        "An error occurred while awarding the arena reward: ",
        error
      );
    }
  };

  useEffect(() => {
    const fetchShopStory = async () => {
      if (nextItem === "general-shop") {
        const story = await getShopStory(nextItem, characterRace);
        setShopIndex(0);
        setShopImage(getShopImage(nextItem));
        setShopKeeper({
          name: "Shop Keeper",
          race: "Human",
          group: "Villager",
          level: 1,
        });
        setShopStory(story);
      } else if (nextItem === "weapon-shop") {
        const story = await getShopStory(nextItem, characterRace);
        setShopIndex(0);
        setShopImage(getShopImage("weapon-shop"));
        setShopKeeper({
          name: "Shop Keeper",
          race: "Elf",
          group: "Weapon Smith",
          level: 1,
        });
        setShopStory(story);
      } else if (nextItem === "armor-shop") {
        const story = await getShopStory(nextItem, characterRace);
        setShopIndex(0);
        setShopImage(getShopImage("armor-shop"));
        setShopKeeper({
          name: "Shop Keeper",
          race: "Dwarf",
          group: "Armor Smith",
          level: 1,
        });
        setShopStory(story);
      } else if (nextItem === "enter-dragon-temple") {
        setInTemple(true);
        setCurrentIndex(currentIndex + 2);
        setRegionBackground("./mountain_shrine_interior.png");
      } else if (nextItem === "check-dragon") {
        let foundDragonToy = false;
        inventory.map((item) => {
          if (item.itemName === "Dragon Toy") {
            setUserStory(templeStory);
            setCurrentIndex(0);
            foundDragonToy = true;
          }
        });

        if (!foundDragonToy) {
          setCurrentIndex(currentIndex + 2);
        }
      } else if (nextItem === "stone-idol") {
        let foundCube = false;
        inventory.map((item) => {
          if (item.itemName === "Carved Cube") {
            setUserStory(goldenRuinsStory);
            setCurrentIndex(0);
            foundCube = true;
          }
        });

        if (!foundCube) {
          setCurrentIndex(currentIndex + 2);
        }
      } else if (nextItem === "forest-cave") {
        setInCave(true);
        setCurrentIndex(currentIndex + 2);
        setRegionBackground("./cave_enterance_forest.png");
      } else if (
        nextItem ===
        "Suddenly, you come upon an iron door that is locked, standing as a mysterious barrier to whatever lies beyond."
      ) {
        setRegionBackground("./cave_iron_door.png");
      } else if (nextItem === "iron-key-check") {
        const ironKey = inventory.find(
          (item) => item.itemName === "Mithril Key"
        );

        if (ironKey) {
          setUserStory(keyStory("iron-key-check"));
          setCurrentIndex(0);
          deleteKey(ironKey.key);
        } else {
          setCurrentIndex(currentIndex + 2);
        }
      } else if (nextItem === "mountain-cave") {
        setInCave(true);
        setCurrentIndex(currentIndex + 2);
        setRegionBackground("./mountain_cave_enterance.png");
      } else if (
        nextItem ===
        "Inside the cave, you find an intricate mithril door that is locked, its surface engraved with ancient runes."
      ) {
        setRegionBackground("./cave_mithril_door.png");
      } else if (nextItem === "mithril-key-check") {
        const mithrilKey = inventory.find(
          (item) => item.itemName === "Mithril Key"
        );

        if (mithrilKey) {
          setUserStory(keyStory("mithril-key-check"));
          setCurrentIndex(0);
          deleteKey(mithrilKey.key);
        } else {
          setCurrentIndex(currentIndex + 2);
        }
      } else if (nextItem === "trash-iron-key") {
        setCurrentIndex(currentIndex + 2);
      } else if (nextItem === "trash-mithril-key") {
        setCurrentIndex(currentIndex + 2);
      }
    };
    fetchShopStory();
  }, [nextItem, characterRace]);

  useEffect(() => {
    if (
      nextItem ===
      "Around you, hundreds of gladiators roam the shadowy halls, their eyes reflecting stories of battles won and lost."
    ) {
      setRegionBackground("./pan_strane_arena_interior.png");
    } else if (userStory[currentIndex] === "arena-level-up") {
      setArenaTracker(arenaTracker + 1);
      if (currentArenaLevel < arenaTracker) {
        updateArenaLevel();
        setCurrentIndex(currentIndex + 2);
      } else {
        setCurrentIndex(currentIndex + 2);
      }
    } else if (
      userStory[currentIndex] ===
      "As the oversear leaves, you pull out your map and choose your next destination as the 'Champion of Pan Strane'!"
    ) {
      arenaReward();
      setCurrentGold(currentGold + 3000);
      setGetReward(!getReward);
    }
  }, [nextItem]);

  useEffect(() => {
    if (nextItem === "enter-eldoria") {
      setFinalStory(true);
      setRegionBackground("./eldoria_city_inside_walls.png");
      setCurrentIndex(currentIndex + 2);
    } else if (nextItem === "enter-eldoria-throne") {
      setRegionBackground("./orc_leader_image_1.png");
      setCurrentIndex(currentIndex + 2);
    } else if (
      (nextItem === "end" ||
        nextItem === "end." ||
        nextItem === "End" ||
        nextItem === "End.") &&
      finalStory
    ) {
      setDisplayEndGameModal(true);
      setShowMap(true);
      setShowStory(false);
      setShowBattle(false);
      setCurrentIndex(0);
    }
  }, [nextItem]);

  useEffect(() => {
    if (shopStory[shopIndex + 1] === "open-general-shop") {
      setShopType("General Goods");
      setShowShopGoods(true);
    }
    if (shopStory[shopIndex + 1] === "open-weapon-shop") {
      setShopType("Weapon");
      setShowShopGoods(true);
    }
    if (shopStory[shopIndex + 1] === "open-armor-shop") {
      setShopType("Armor");
      setShowShopGoods(true);
    }
    if (shopStory[shopIndex] === "end") {
      setShopIndex(0);
      setIsShop(false);
      setShowMap(true);
    }
  }, [shopIndex, shopStory, shopType, characterRace]);

  const handleNext = () => {
    const chestTypes = [
      "common-barrel",
      "rusty-iron-chest",
      "iron-chest",
      "steel-chest",
      "decorated-steel-chest",
      "mithril-chest",
      "enchanted-mithril-chest",
      "transcendent-mithril-chest",
    ];
    if (isShop) {
      return setShopIndex(shopIndex + 1);
    }
    if (!isShop) {
      if (nextItem.race) {
        setShowDeath(false);
        setArea(nextItem.area);
        setRace(nextItem.race);
        setLevel(nextItem.level);
        setShowStory(false);
        setShowBattle(true);
      } else if (chestTypes.includes(nextItem)) {
        setContainerType(nextItem);
        setContainerImage(getContainerImage(nextItem));
        setChoices(userStory[currentIndex + 2]);
        setIsContainer(true);
      } else if (
        nextItem === "general-shop" ||
        nextItem === "weapon-shop" ||
        nextItem === "armor-shop"
      ) {
        setIsShop(true);
      } else if (
        nextItem === "end" ||
        nextItem === "End" ||
        nextItem === "End." ||
        nextItem === "end."
      ) {
        setCurrentIndex(0);
        setInTemple(false);
        setShowStory(false);
        setShowMap(true);
      } else if (typeof nextItem !== "object") {
        setShowDeath(false);
        return setCurrentIndex(currentIndex + 1);
      }
    }
  };

  return (
    <div className="area-story-modal-overlay">
      {isContainer && (
        <OpenContainer
          containerType={containerType}
          choices={choices}
          setIsContainer={setIsContainer}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          containerImage={containerImage}
          characterId={characterId}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      )}
      {showShopGoods && (
        <BuySellGoods
          setShowShopGoods={setShowShopGoods}
          setShopIndex={setShopIndex}
          shopIndex={shopIndex}
          inventory={inventory}
          _id={characterId}
          playerHealth={playerHealth}
          currentEnergy={currentEnergy}
          setPlayerHealth={setPlayerHealth}
          setCurrentEnergy={setCurrentEnergy}
          useItem={useItem}
          setUseItem={setUseItem}
          isShop={isShop}
          sellItem={sellItem}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          shopItems={shopItems}
          buyItem={buyItem}
          equippedGear={equippedGear}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          shopType={shopType}
          shopKeeper={shopKeeper}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
          sellAllItemsOfQuality={sellAllItemsOfQuality}
          itemQuantity={itemQuantity}
          setItemQuantity={setItemQuantity}
        />
      )}
      {!isShop ? (
        <div
          className="area-story-modal"
          style={{
            backgroundImage: `url(${regionBackground})`,
          }}
          onClick={handleNext}
        >
          <div className="area-story-modal-content">
            <div className="area-story-story-box">
              {userStory[currentIndex]}
            </div>
            <div className="area-story-buttons">
              <button type="button" className="area-story-next-button">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="area-story-modal"
          style={{ backgroundImage: `url(${shopImage})` }}
          onClick={handleNext}
        >
          {shopIndex > 1 && (
            <FriendlyNPCCard
              characterRace={characterRace}
              shopKeeper={shopKeeper}
              shopType={shopType}
            />
          )}
          <div className="area-story-modal-content">
            <div className="area-story-story-box">{shopStory[shopIndex]}</div>
            <div className="area-story-buttons">
              <button type="button" className="area-story-next-button">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryModal;
