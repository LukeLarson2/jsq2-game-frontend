"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import BattleScreen from "../components/BattleScreen";
import CharacterBanner from "./CharacterBanner";
import getCharacterInfo from "../utils/getCharacterInfo";
import itemQualityCheck from "../utils/itemQualityCheck";
import "../stylesheets/Game.css";
import InGameMap from "../components/InGameMap";
import StoryModal from "../components/StoryModal";
import getBagItems from "../utils/getBagItems";
import getRegionImage from "../utils/getRegionImage";
import calculateExpForLevel from "../utils/calculateExpForLevel";
import CharacterCardEdit from "../components/CharacterCardEdit";
import CharacterInventory from "../components/CharacterInventory";
import SkillTree from "./SkillTree";
import DeathModal from "../components/DeathModal";
import { v4 as uuidv4 } from "uuid";
import AlertModal from "../components/AlertModal";
import getArenaScript from "../utils/getArenaScript";
import getEnemyInfo from "../utils/getEnemyInfo";
import EndGameModal from "../components/EndGameModal";
import Credits from "../components/Credits";
import dbURI from "../lib/dbURI";
import getPlayerHealth from "../utils/getPlayerHealth";
import regionColorCheck from "../utils/regionColorCheck";

const Game = ({
  currentUser,
  setCurrentPage,
  selectedCharacterId,
  setSelectedCharacterId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [character, setCharacter] = useState(null);
  const [characterId, setCharacterId] = useState("");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showMap, setShowMap] = useState(true);
  const [showStory, setShowStory] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBattle, setShowBattle] = useState(false);
  const [earnedXp, setEarnedXp] = useState(false);
  const [area, setArea] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState(0);
  const [userStory, setUserStory] = useState([]);
  const [regionBackground, setRegionBackground] = useState("");
  const [xpNeeded, setXpNeeded] = useState(0);
  const [currentXp, setCurrentXp] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(0);
  const [currentEnergy, setCurrentEnergy] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [takeHit, setTakeHit] = useState(false);
  const [useItem, setUseItem] = useState(false);
  const [storyPromptResult, setStoryPromptResult] = useState("");
  const [ownedAbilities, setOwnedAbilities] = useState([]);
  const [currentSkillPoints, setCurrentSkillPoints] = useState(0);
  const [currentGold, setCurrentGold] = useState(0);
  const [playerDeath, setPlayerDeath] = useState(false);
  const [soldItem, setSoldItem] = useState(false);
  const [boughtItem, setBoughtItem] = useState(false);
  const [shopItems, setShopItems] = useState([]);
  const [equippedGear, setEquippedGear] = useState({});
  const [inStore, setInStore] = useState([]);
  const [mainHandColor, setMainHandColor] = useState("");
  const [offHandColor, setOffHandColor] = useState("");
  const [showDeath, setShowDeath] = useState(false);
  const [currentEnemyName, setCurrentEnemyName] = useState("");
  const [goldLoss, setGoldLoss] = useState(0);
  const [enoughGold, setEnoughGold] = useState(true);
  const [mapFizzle, setMapFizzle] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [shopType, setShopType] = useState("");
  const [battleRecovery, setBattleRecovery] = useState(false);
  const [arenaEnemies, setArenaEnemies] = useState([]);
  const [inArena, setInArena] = useState(false);
  const [currentArenaLevel, setCurrentArenaLevel] = useState(0);
  const [lowRank, setLowRank] = useState(false);
  const [highRank, setHighRank] = useState(false);
  const [masterRank, setMasterRank] = useState(false);
  const [championRank, setChampionRank] = useState(false);
  const [getReward, setGetReward] = useState(false);
  const [arenaTracker, setArenaTracker] = useState(1);
  const [finalStory, setFinalStory] = useState(false);
  const [displayEndGameModal, setDisplayEndGameModal] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [regionColor, setRegionColor] = useState("");
  const [currentEnemy, setCurrentEnemy] = useState({});
  const [enemyHealth, setEnemyHealth] = useState(0);
  const [enemyMaxHealth, setEnemyMaxHealth] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [playerRecoveryDisplayed, setPlayerRecoveryDisplyed] = useState(false);

  const [useSkillPoints, setUseSkillPoints] = useState(false);

  const characterInfoFetch = async () => {
    const data = await getCharacterInfo(currentUser, selectedCharacterId);
    setCharacter(data);
    setCurrentLevel(data.level);
    setCurrentXp(data.exp);
    setXpNeeded(data.expNeeded);
    setCharacterId(data._id);
    setInventory(data.inventory);
    setPlayerHealth(data.health);
    setCurrentEnergy(data.energy);
    setCurrentSkillPoints(data.skillPoints);
    setCurrentGold(data.wallet);
    setEquippedGear(data.equippedGear);
    setMainHandColor(itemQualityCheck(data.equippedGear.mainHand));
    setOffHandColor(itemQualityCheck(data.equippedGear.offHand));
    setCurrentArenaLevel(data.arenaCount);

    if (data.arenaCount >= 10 && data.arenaCount < 20) {
      setLowRank(true);
      setHighRank(false);
      setMasterRank(false);
      setChampionRank(false);
    }
    if (data.arenaCount >= 20 && data.arenaCount < 30) {
      setHighRank(true);
      setLowRank(false);
      setMasterRank(false);
      setChampionRank(false);
    }
    if (data.arenaCount >= 30 && data.arenaCount < 33) {
      setMasterRank(true);
      setLowRank(false);
      setHighRank(false);
      setChampionRank(false);
    }
    if (data.arenaCount === 33) {
      setChampionRank(true);
      setLowRank(false);
      setHighRank(false);
      setMasterRank(false);
    }
  };

  const populateStore = async () => {
    const itemCollection = await getBagItems(dbURI);
    setShopItems([]);
    const qualityTypes = ["Common", "Uncommon", "Rare"];

    if (shopType === "General Goods") {
      let newShopItems = itemCollection
        .filter(
          (item) =>
            (item.type === "Potion" || item.type === "Food") &&
            qualityTypes.includes(item.quality)
        )
        .map((item) => ({
          ...item,
          itemValue: item.itemValue * 2,
        }));

      // Remove duplicates based on itemName
      newShopItems = newShopItems.reduce((unique, item) => {
        return unique.some((uni) => uni.itemName === item.itemName)
          ? unique
          : [...unique, item];
      }, []);

      setShopItems((prevItems) => [...prevItems, ...newShopItems]);
    } else if (shopType === "Weapon") {
      let newShopItems = itemCollection
        .filter(
          (item) =>
            item.type === "Weapon" && qualityTypes.includes(item.quality)
        )
        .map((item) => ({
          ...item,
          itemValue: item.itemValue * 2,
        }));

      // Remove duplicates based on itemName
      newShopItems = newShopItems.reduce((unique, item) => {
        return unique.some((uni) => uni.itemName === item.itemName)
          ? unique
          : [...unique, item];
      }, []);

      setShopItems((prevItems) => [...prevItems, ...newShopItems]);
    } else if (shopType === "Armor") {
      let newShopItems = itemCollection
        .filter(
          (item) => item.type === "Armor" && qualityTypes.includes(item.quality)
        )
        .map((item) => ({
          ...item,
          itemValue: item.itemValue * 2,
        }));

      // Remove duplicates based on itemName
      newShopItems = newShopItems.reduce((unique, item) => {
        return unique.some((uni) => uni.itemName === item.itemName)
          ? unique
          : [...unique, item];
      }, []);

      setShopItems((prevItems) => [...prevItems, ...newShopItems]);
    }
  };

  const fullEnergy = async (currentUser, selectedCharacterId) => {
    await fetch(`${dbURI}/users/characters/energy`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser, // currentUser of the user
        selectedCharacterId, // ID of the character
        energy: 100, // New energy value
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setCurrentEnergy(100);
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fullHealth = async (currentUser, selectedCharacterId) => {
    await fetch(`${dbURI}/users/characters/health`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedCharacterId, // ID of the character
        health: 100, // New health value
        currentUser, // currentUser of the user
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setPlayerHealth(100);
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const levelUp = async () => {
    try {
      const response = await axios.put(`${dbURI}/users/characters/level`, {
        selectedCharacterId,
        currentUser,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;
      addSkillPoints(currentUser, selectedCharacterId, 2); // If each level up gives 2 skill points

      setCurrentLevel(data.level);
      setCurrentXp(0);
      fullHealth(currentUser, selectedCharacterId);
      fullEnergy(currentUser, selectedCharacterId);
      setXpNeeded(data.expNeeded); // Using the updated expNeeded from the server response
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addSkillPoints = async (
    currentUser,
    selectedCharacterId,
    pointsToAdd
  ) => {
    try {
      const response = await axios.put(
        `${dbURI}/users/characters/skillPoints`,
        {
          currentUser,
          selectedCharacterId,
          pointsToAdd,
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;
      // You can do something with the data if needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    characterInfoFetch();
  }, [
    showBattle,
    showStory,
    showMap,
    showVictory,
    earnedXp,
    currentXp,
    playerHealth,
    currentEnergy,
    battleRecovery,
    takeHit,
    useItem,
    ownedAbilities,
    useSkillPoints,
    currentSkillPoints,
    playerDeath,
    soldItem,
    boughtItem,
    getReward,
    selectedCharacterId,
    currentLevel,
  ]);

  useEffect(() => {
    setShowDeath(false);
  }, [showMap, showBattle]);

  useEffect(() => {
    populateStore();
  }, [showStory, shopType]);

  useEffect(() => {
    if (currentXp >= xpNeeded && characterId) {
      levelUp();
    }
  }, [earnedXp, currentXp]);

  useEffect(() => {
    const getEnemies = async () => {
      try {
        const response = await axios.get(`${dbURI}/enemies`);
        setArenaEnemies(response.data);
      } catch (error) {
        console.error(
          `Error occurred while getting enemy information: ${error}`
        );
      }
    };
    getEnemies();
  }, [inArena]);

  const xpPercentage = Math.floor((currentXp / xpNeeded) * 100);

  const confirmTravel = async (regionId) => {
    if (regionId === "panStraneArena") {
      const allEnemiesStory = getArenaScript(arenaEnemies);
      setInArena(true);
      setShowMap(false);
      setShowStory(true);
      setUserStory(allEnemiesStory);
      setRegionBackground("./pan_strane_arena.png");
      setCurrentIndex(0);
      setArenaTracker(1);
      return;
    }
    setIsLoading(true);
    const imageUrl = getRegionImage(regionId);
    setRegionBackground(imageUrl);

    // Check if a story for the region exists in character's story array
    const existingStory = character.characterStory.flatMap((story) => {
      if (story.region === regionId) {
        // story.story is a serialized array, so we parse it back into an array
        return JSON.parse(story.story);
      }
      // If the region doesn't match, we return an empty array so flatMap removes it
      return [];
    });

    if (existingStory.length > 0) {
      setUserStory(existingStory);
    } else {
      let data;
      let story;
      try {
        if (storyPromptResult === null) {
          return alert("No story promt available for the selected region");
        }
        const response = await fetch(`${dbURI}/openai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `${storyPromptResult}`,
          }),
        });
        data = await response.json();
        story = data.modelResponse;
      } catch (error) {
        setIsLoading(false);
        setMapFizzle(true);
        return alert("Network request failed, please try again.");
      }

      try {
        setUserStory(JSON.parse(story));
      } catch (err) {
        setIsLoading(false);
        setMapFizzle(true);
        return console.log(err);
      }
      try {
        await axios.put(`${dbURI}/users/characters/stories`, {
          selectedCharacterId, // Include selected character ID
          regionId,
          story,
          currentUser,
        });
        setUserStory(JSON.parse(story));
      } catch (err) {
        setIsLoading(false);
        setMapFizzle(true);
        console.error(err); // Log the error
        return res
          .status(500)
          .json({ message: "An error occurred", error: err });
      }
    }

    setIsLoading(false);
    setShowMap(false);
    setShowStory(true);
  };

  const updateCharacterAbilities = (updatedAbilities, updatedSkillPoints) => {
    setCharacter((prevState) => ({
      ...prevState,
      abilities: updatedAbilities,
      skillPoints: updatedSkillPoints,
    }));
  };

  const sellItem = async (item) => {
    const { key, itemValue } = item; // Assuming that 'key' exists in item
    setIsLoading(true);
    try {
      // Removing the item from the inventory
      await axios.delete(
        `${dbURI}/users/characters/inventory?selectedCharacterId=${selectedCharacterId}&key=${key}&currentUser=${currentUser}`
      );

      // Increasing character's gold
      await axios.put(
        `${dbURI}/users/characters/gold`,
        {
          selectedCharacterId, // Using selectedCharacterId instead of characterId
          gold: itemValue,
          currentUser,
        },
        { headers: { Authorization: `Bearer ${currentUser}` } }
      );
      setSoldItem(!soldItem);
      setIsLoading(false);
    } catch (error) {
      console.error("An error occurred while selling the item: ", error);
    }
    setIsLoading(false);
  };

  const buyItem = async (item) => {
    setIsLoading(true);
    try {
      // Assigning a unique key to the item
      item.key = uuidv4();

      // Create a new object based on the item with value halved
      const newItem = {
        ...item,
        itemValue: item.itemValue / 2,
      };

      // Adding the item to the inventory
      await axios.put(
        `${dbURI}/users/characters/inventory`,
        {
          selectedCharacterId, // Using selectedCharacterId instead of characterId
          newItems: [newItem], // use the new item with halved value
          currentUser,
        },
        { headers: { Authorization: `Bearer ${currentUser}` } }
      );

      // Decreasing character's gold
      await axios.put(
        `${dbURI}/users/characters/gold`,
        {
          selectedCharacterId, // Using selectedCharacterId instead of characterId
          gold: -item.itemValue, // use negative value to decrease gold
          currentUser,
        },
        { headers: { Authorization: `Bearer ${currentUser}` } }
      );

      setBoughtItem(!boughtItem);
    } catch (error) {
      console.error("An error occurred while buying the item: ", error.message);
    }
    setIsLoading(false);
  };

  const generateEnemyCard = (race, area, level) => {
    const fetchEnemy = async () => {
      const allEnemyInfo = await getEnemyInfo();
      if (allEnemyInfo) {
        const possibleEnemies = [];
        allEnemyInfo.map((enemy) => {
          if (
            enemy.race === race &&
            enemy.level === level &&
            enemy.area === area
          ) {
            possibleEnemies.push(enemy);
          }
        });
        const randomIndex = Math.floor(Math.random() * possibleEnemies.length);
        const selectedEnemy = possibleEnemies[randomIndex];
        setRegionColor(regionColorCheck(selectedEnemy.area.toLowerCase()));
        setCurrentEnemy(selectedEnemy);
        setCurrentEnemyName(selectedEnemy.name);
        setEnemyHealth(selectedEnemy.health);
        setEnemyMaxHealth(selectedEnemy.health);
      }
    };
    fetchEnemy();
  };

  useEffect(() => {
    setShowDeath(false);
    setPlayerDeath(false);
    generateEnemyCard(race, area, level);
  }, []);

  useEffect(() => {
    if (currentEnemy.health && enemyHealth <= 0) {
      setShowVictory(true);
    }
  }, [enemyHealth, currentEnemy.health]);

  useEffect(() => {
    if (showVictory && timeoutId) {
      clearTimeout(timeoutId);
    }
    if (playerDeath) {
      clearTimeout(timeoutId);
      setShowDeath(true);
    }
  }, [showVictory, playerDeath, timeoutId]);

  useEffect(() => {
    getPlayerHealth(currentUser, selectedCharacterId, setPlayerHealth);
  }, [playerRecoveryDisplayed]);

  useEffect(() => {
    if (playerHealth <= 0) {
      setShowDeath(true);
    }
  }, [playerHealth]);

  // Only render BattleScreen when character data is loaded
  if (character) {
    return (
      <div className="game-container-place-holder">
        <CharacterBanner
          character={character}
          xpNeeded={xpNeeded}
          currentLevel={currentLevel}
          xpPercentage={xpPercentage}
          inventory={inventory}
          setShowEdit={setShowEdit}
          showEdit={showEdit}
          setShowInventory={setShowInventory}
          showInventory={showInventory}
          showBattle={showBattle}
          setShowBattle={setShowBattle}
          isSkillTreeOpen={isSkillTreeOpen}
          setIsSkillTreeOpen={setIsSkillTreeOpen}
          setShowMap={setShowMap}
          setCurrentIndex={setCurrentIndex}
          currentGold={currentGold}
          currentArenaLevel={currentArenaLevel}
          setInArena={setInArena}
          highRank={highRank}
          lowRank={lowRank}
          masterRank={masterRank}
          championRank={championRank}
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
          setSelectedCharacterId={setSelectedCharacterId}
          dbURI={dbURI}
        />
        {displayEndGameModal && (
          <EndGameModal
            character={character}
            setDisplayEndGameModal={setDisplayEndGameModal}
            setShowCredits={setShowCredits}
            currentUser={currentUser}
            selectedCharacterId={selectedCharacterId}
            dbURI={dbURI}
          />
        )}
        {showCredits && <Credits setShowCredits={setShowCredits} />}
        {mapFizzle && (
          <AlertModal
            message="The map fizzled out... These things happen, try to travel again"
            mapFizzle={mapFizzle}
            setMapFizzle={setMapFizzle}
            dbURI={dbURI}
          />
        )}
        {showDeath && (
          <DeathModal
            setShowDeath={setShowDeath}
            setShowBattle={setShowBattle}
            setShowMap={setShowMap}
            setShowStory={setShowStory}
            currentEnemyName={currentEnemyName}
            goldLoss={goldLoss}
            setCurrentIndex={setCurrentIndex}
            fullEnergy={fullEnergy}
            fullHealth={fullHealth}
            currentUser={currentUser}
            selectedCharacterId={selectedCharacterId}
            dbURI={dbURI}
          />
        )}
        {showMap && (
          <InGameMap
            setCharacter={setCharacter}
            setShowMap={setShowMap}
            confirmTravel={confirmTravel}
            isLoading={isLoading}
            setStoryPromptResult={setStoryPromptResult}
            name={character.characterName}
            storyPromptResult={storyPromptResult}
            characterLevel={character.level}
            currentUser={currentUser}
            selectedCharacterId={selectedCharacterId}
            dbURI={dbURI}
          />
        )}
        {showStory && !showMap && (
          <StoryModal
            userStory={userStory}
            setShowMap={setShowMap}
            setShowStory={setShowStory}
            setShowBattle={setShowBattle}
            setArea={setArea}
            setRace={setRace}
            setLevel={setLevel}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            regionBackground={regionBackground}
            setRegionBackground={setRegionBackground}
            characterId={character._id}
            characterRace={character.race}
            inventory={inventory}
            playerHealth={playerHealth}
            currentEnergy={currentEnergy}
            setPlayerHealth={setPlayerHealth}
            setCurrentEnergy={setCurrentEnergy}
            useItem={useItem}
            setUseItem={setUseItem}
            sellItem={sellItem}
            isLoading={isLoading}
            shopItems={shopItems}
            buyItem={buyItem}
            equippedGear={equippedGear}
            enoughGold={enoughGold}
            setEnoughGold={setEnoughGold}
            currentGold={currentGold}
            setCurrentGold={setCurrentGold}
            setShowDeath={setShowDeath}
            setUserStory={setUserStory}
            setShopType={setShopType}
            shopType={shopType}
            setCurrentArenaLevel={setCurrentArenaLevel}
            currentArenaLevel={currentArenaLevel}
            setGetReward={setGetReward}
            getReward={getReward}
            setArenaTracker={setArenaTracker}
            arenaTracker={arenaTracker}
            setFinalStory={setFinalStory}
            finalStory={finalStory}
            setDisplayEndGameModal={setDisplayEndGameModal}
            currentUser={currentUser}
            selectedCharacterId={selectedCharacterId}
            dbURI={dbURI}
          />
        )}

        {showBattle && (
          <BattleScreen
            race={race}
            area={area}
            level={level}
            setArea={setArea}
            setRace={setRace}
            setLevel={setLevel}
            character={character}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            setShowBattle={setShowBattle}
            setShowStory={setShowStory}
            earnedXp={earnedXp}
            setEarnedXp={setEarnedXp}
            showVictory={showVictory}
            setShowVictory={setShowVictory}
            takeHit={takeHit}
            setTakeHit={setTakeHit}
            playerHealth={playerHealth}
            setPlayerHealth={setPlayerHealth}
            currentEnergy={currentEnergy}
            setCurrentEnergy={setCurrentEnergy}
            setPlayerDeath={setPlayerDeath}
            setCurrentGold={setCurrentGold}
            playerDeath={playerDeath}
            setShowMap={setShowMap}
            currentGold={currentGold}
            equippedGear={equippedGear}
            mainHandColor={mainHandColor}
            offHandColor={offHandColor}
            setShowDeath={setShowDeath}
            setCurrentEnemyName={setCurrentEnemyName}
            setGoldLoss={setGoldLoss}
            battleRecovery={battleRecovery}
            setBattleRecovery={setBattleRecovery}
            inArena={inArena}
            arenaTracker={arenaTracker}
            currentUser={currentUser}
            selectedCharacterId={selectedCharacterId}
            dbURI={dbURI}
            regionColor={regionColor}
            currentEnemy={currentEnemy}
            enemyHealth={enemyHealth}
            enemyMaxHealth={enemyMaxHealth}
            timeoutId={timeoutId}
            setRegionColor={setRegionColor}
            setCurrentEnemy={setCurrentEnemy}
            setEnemyHealth={setEnemyHealth}
            setEnemyMaxHealth={setEnemyMaxHealth}
            setTimeoutId={setTimeoutId}
            playerRecoveryDisplayed={playerRecoveryDisplayed}
            setPlayerRecoveryDisplyed={setPlayerRecoveryDisplyed}
          />
        )}
        {showEdit && (
          <CharacterCardEdit
            setShowEdit={setShowEdit}
            showEdit={showEdit}
            currentUser={currentUser}
            selectedCharacterId={selectedCharacterId}
            dbURI={dbURI}
          />
        )}
        {showInventory && (
          <CharacterInventory
            inventory={inventory}
            setShowInventory={setShowInventory}
            playerHealth={playerHealth}
            currentEnergy={currentEnergy}
            setPlayerHealth={setPlayerHealth}
            setCurrentEnergy={setCurrentEnergy}
            _id={character._id}
            useItem={useItem}
            setUseItem={setUseItem}
            setIsLoading={setIsLoading}
            equippedGear={equippedGear}
            currentUser={currentUser}
            selectedCharacterId={selectedCharacterId}
            dbURI={dbURI}
          />
        )}
        {isSkillTreeOpen && (
          <SkillTree
            character={character}
            isSkillTreeOpen={isSkillTreeOpen}
            setIsSkillTreeOpen={setIsSkillTreeOpen}
            ownedAbilities={ownedAbilities}
            setOwnedAbilities={setOwnedAbilities}
            useSkillPoints={useSkillPoints}
            setUseSkillPoints={setUseSkillPoints}
            updateCharacterAbilities={updateCharacterAbilities}
            currentUser={currentUser}
            selectedCharacterId={selectedCharacterId}
            dbURI={dbURI}
          />
        )}
      </div>
    );
  }

  // If character data is not loaded yet, render a loading screen or a blank screen
  return <div>Loading...</div>;
};

export default Game;
