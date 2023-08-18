"use client";
import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import EnemyNPCCard from "./EnemyNPCCard";
import getEnemyInfo from "../utils/getEnemyInfo";
import damageCalc from "../utils/damageCalc";
import VictoryModal from "./VictoryModal";
import AlertModal from "./AlertModal";
import handleRecovery from "../utils/handleRecovery";
import handleHealing from "../utils/handleHealing";
import handleStandardDamage from "../utils/handleStandardDamage";
import handleEnemyAttack from "../utils/handleEnemyAttack";
import getPlayerHealth from "../utils/getPlayerHealth";
import dbURI from "../lib/dbURI";

import regionColorCheck from "../utils/regionColorCheck";

import "../stylesheets/BattleScreen.css";

const BattleScreen = ({
  race,
  area,
  level,
  setArea,
  setRace,
  setLevel,
  character,
  setCurrentIndex,
  currentIndex,
  setShowBattle,
  setShowStory,
  earnedXp,
  setEarnedXp,
  showVictory,
  setShowVictory,
  takeHit,
  setTakeHit,
  playerHealth,
  setPlayerHealth,
  currentEnergy,
  setCurrentEnergy,
  setPlayerDeath,
  setCurrentGold,
  playerDeath,
  setShowMap,
  currentGold,
  equippedGear,
  mainHandColor,
  offHandColor,
  setShowDeath,
  setCurrentEnemyName,
  setGoldLoss,
  battleRecovery,
  setBattleRecovery,
  inArena,
  arenaTracker,
  currentUser,
  selectedCharacterId,
  dbURI,
  regionColor,
  currentEnemy,
  enemyHealth,
  enemyMaxHealth,
  timeoutId,
  setRegionColor,
  setCurrentEnemy,
  setEnemyHealth,
  setEnemyMaxHealth,
  setTimeoutId,
  playerRecoveryDisplayed,
  setPlayerRecoveryDisplayed,
}) => {
  const [playerDamageTaken, setPlayerDamageTaken] = useState(0);
  const [enemyDamageTaken, setEnemyDamageTaken] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [enemyIsAttacking, setEnemyIsAttacking] = useState(false);
  const [playerIsHit, setPlayerIsHit] = useState(false);
  const [enemyIsHit, setEnemyIsHit] = useState(false);
  const [playerDamageDisplayed, setPlayerDamageDisplayed] = useState(false);
  const [enemyDamageDisplayed, setEnemyDamageDisplayed] = useState(false);
  const [displayedDamage, setDisplayedDamage] = useState("");
  const [currentEnemyAttack, setCurrentEnemyAttack] = useState("");
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [displayedRecovery, setDisplayedRecovery] = useState(0);
  const [isHealingDone, setIsHealingDone] = useState(false);

  // True is player, False is enemy
  const [turn, setTurn] = useState(true);

  if (!character) return <div>Loading...</div>;

  const updateCharacter = (characterId, updates) => {
    fetch(`${dbURI}/users/characters`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`, // Adding the authorization header
      },
      body: JSON.stringify({
        selectedCharacterId, // Using selectedCharacterId instead of characterId
        updates,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const { armor, mainHand, offHand } = equippedGear;
  const generateEnemyCard = (race, area, level) => {
    const fetchEnemy = async () => {
      const allEnemyInfo = await getEnemyInfo();
      if (allEnemyInfo) {
        const possibleEnemies = allEnemyInfo.filter(
          (enemy) =>
            enemy.race === race &&
            enemy.level === level &&
            enemy.area === area &&
            enemy.health > 0 // Ensure that the health is positive
        );

        if (possibleEnemies.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * possibleEnemies.length
          );
          const selectedEnemy = possibleEnemies[randomIndex];

          // Additional check to ensure health is positive
          const enemyHealth = Math.max(0, selectedEnemy.health);

          setRegionColor(regionColorCheck(selectedEnemy.area.toLowerCase()));
          setCurrentEnemy(selectedEnemy);
          setCurrentEnemyName(selectedEnemy.name);
          setEnemyHealth(enemyHealth);
          setEnemyMaxHealth(enemyHealth);
        }
      }
    };
    fetchEnemy();
  };

  const handleHit = (user, damageAmount) => {
    if (user === "player") {
      if (damageAmount < 1) {
        setEnemyDamageDisplayed(true);
        setTimeout(() => {
          setEnemyDamageDisplayed(false);
        }, 1500);
        return;
      }
      setEnemyIsHit(true);
      setEnemyDamageDisplayed(true);

      setTimeout(() => {
        setEnemyIsHit(false);
      }, 400);
      setTimeout(() => {
        setEnemyDamageDisplayed(false);
      }, 1500);
    } else {
      if (damageAmount < 1 && currentEnemy.health > 0) {
        setTimeout(() => setPlayerDamageDisplayed(true), 100);
        return;
      }
      setTimeout(() => setPlayerDamageDisplayed(true), 100);

      setTimeout(() => {
        setPlayerIsHit(false);
      }, 800);
      setTimeout(() => {
        setPlayerDamageDisplayed(false);
      }, 1500);
    }
  };

  const handleAttack = (
    user,
    skillDamage,
    armor,
    currentEnemy,
    skillEnergy,
    skillHealing,
    skillRecovery
  ) => {
    if (playerHealth > 0) {
      setShowDeath(false);
    }
    if (currentEnergy < skillEnergy) {
      setMessage("Not enough energy!");
      setShowAlert(true);
      return;
    }
    const triggerQuote = (quoteType) => {
      const quoteLengths = quoteType.length;
      const randomIndex = Math.floor(Math.random() * quoteLengths);
      setRandomQuote(currentEnemy[quoteType][randomIndex]);
      setIsQuoteVisible(true);
      // delay the start of the fading effect
    };
    const damageToNum = Number.parseInt(skillDamage);
    const healingToNum = Number.parseInt(skillHealing);
    const recoveryToNum = Number.parseInt(skillRecovery);

    const isDamage = damageToNum > 0 && healingToNum <= 0;
    const isHealing = damageToNum <= 0 && healingToNum > 0;
    const isRecovery = recoveryToNum > 0;
    const isLifeSteal = damageToNum > 0 && healingToNum > 0;

    if (user === "player") {
      /* -- RECOVERY SKILL -- */
      if (isRecovery) {
        handleRecovery(
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
        );

        /* -- HEALING SKILL -- */
      } else if (isHealing) {
        handleHealing(
          healingToNum,
          character,
          playerHealth,
          currentEnergy,
          skillEnergy,
          setBattleRecovery,
          battleRecovery,
          setIsRecovering,
          setTurn,
          setIsAttacking,
          setDisplayedRecovery,
          setCurrentEnergy,
          setPlayerHealth,
          getPlayerHealth,
          setPlayerRecoveryDisplyed,
          currentUser,
          selectedCharacterId
        );
        setIsHealingDone(true);

        /* -- STANDARD DAMAGE SKILL -- */
      } else if (isDamage) {
        handleStandardDamage(
          "player",
          damageToNum,
          mainHand,
          offHand,
          armor,
          currentEnemy,
          character,
          enemyHealth,
          currentEnergy,
          skillEnergy,
          setIsAttacking,
          setTurn,
          setEnemyHealth,
          setEnemyDamageTaken,
          handleHit,
          setEnemyDamageDisplayed,
          setDisplayedDamage,
          triggerQuote,
          setCurrentEnergy,
          currentUser,
          selectedCharacterId
        );

        /* -- STANDARD LIFE STEAL SKILL -- */
      } else if (isLifeSteal) {
        handleHealing(
          healingToNum,
          character,
          playerHealth,
          currentEnergy,
          skillEnergy,
          setBattleRecovery,
          battleRecovery,
          setIsRecovering,
          setTurn,
          setIsAttacking,
          setDisplayedRecovery,
          setCurrentEnergy,
          setPlayerHealth,
          getPlayerHealth,
          setPlayerRecoveryDisplyed,
          currentUser,
          selectedCharacterId
        );
        setIsHealingDone(true);
        handleStandardDamage(
          "player",
          damageToNum,
          mainHand,
          offHand,
          armor,
          currentEnemy,
          character,
          enemyHealth,
          currentEnergy,
          skillEnergy,
          setIsAttacking,
          setTurn,
          setEnemyHealth,
          setEnemyDamageTaken,
          handleHit,
          setEnemyDamageDisplayed,
          setDisplayedDamage,
          triggerQuote,
          setCurrentEnergy,
          currentUser,
          selectedCharacterId
        );
      }

      /* --ENEMY ATTACKING SEQUENCE -- */
      setTimeoutId(
        setTimeout(() => {
          if (isHealing) {
            const healingCheckInterval = setInterval(() => {
              if (isHealingDone) {
                clearInterval(healingCheckInterval);
                proceedWithEnemyAttack();
              }
            }, 100);
          }
          proceedWithEnemyAttack();
        }, 1800)
      );

      const proceedWithEnemyAttack = () => {
        handleEnemyAttack(
          "enemy",
          damageToNum,
          mainHand,
          offHand,
          armor,
          currentEnemy,
          character,
          setCurrentEnemyAttack,
          setEnemyIsAttacking,
          setPlayerHealth,
          setTakeHit,
          takeHit,
          setPlayerDamageTaken,
          handleHit,
          setPlayerDamageDisplayed,
          setDisplayedDamage,
          triggerQuote,
          setGoldLoss,
          updateCharacter,
          setShowDeath,
          setCurrentIndex,
          playerHealth,
          currentGold,
          currentUser,
          selectedCharacterId,
          setPlayerDeath,
          setPlayerIsHit
        );
        setIsHealingDone(false); // Reset the flag for the next turn
      };
    }

    setTimeout(() => setEnemyIsAttacking(false), 300);

    setTimeout(() => {
      if (enemyHealth <= 0) return;
      setTurn(true);
      setCurrentEnemyAttack("");
    }, 3000);
  };

  return (
    <div
      className="battle-screen-main-container"
      style={{ backgroundImage: `url("background_battle_board.png")` }}
    >
      {showAlert && (
        <AlertModal message={message} setShowAlert={setShowAlert} />
      )}
      {showVictory && (
        <VictoryModal
          currentEnemy={currentEnemy}
          setShowBattle={setShowBattle}
          character={character}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          setShowStory={setShowStory}
          setShowVictory={setShowVictory}
          showVictory={showVictory}
          setArea={setArea}
          setRace={setRace}
          setLevel={setLevel}
          earnedXp={earnedXp}
          setEarnedXp={setEarnedXp}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      )}
      <div className="battle-screen-player-area">
        <CharacterCard
          setPlayerHealth={setPlayerHealth}
          handleAttack={handleAttack}
          turn={turn}
          playerDamageTaken={playerDamageTaken}
          isAttacking={isAttacking}
          playerDamageDisplayed={playerDamageDisplayed}
          playerIsHit={playerIsHit}
          handleHit={handleHit}
          armor={armor}
          currentEnemy={currentEnemy}
          displayedDamage={displayedDamage}
          playerHealth={playerHealth}
          currentEnergy={currentEnergy}
          character={character}
          setCurrentEnergy={setCurrentEnergy}
          equippedGear={equippedGear}
          mainHandColor={mainHandColor}
          offHandColor={offHandColor}
          displayedRecovery={displayedRecovery}
          playerRecoveryDisplayed={playerRecoveryDisplayed}
          isRecovering={isRecovering}
        />
      </div>
      <div
        className="battle-screen-vrs-container"
        style={{ position: "relative" }}
      >
        {inArena && (
          <div className="battle-screen-arena-level">
            Arena Level {arenaTracker}
          </div>
        )}
        <div className="battle-screen-backglow" />
        <div
          className="battle-screen-vrs-logo"
          style={{ backgroundImage: `url("./vrs_logo_crop.png")` }}
        />
      </div>

      <div className="battle-screen-enemy-area">
        {currentEnemy.name ? (
          <EnemyNPCCard
            currentEnemy={currentEnemy}
            handleAttack={handleAttack}
            handleHit={handleHit}
            enemyDamageDisplayed={enemyDamageDisplayed}
            enemyIsHit={enemyIsHit}
            displayedDamage={displayedDamage}
            enemyIsAttacking={enemyIsAttacking}
            currentEnemyAttack={currentEnemyAttack}
            isQuoteVisible={isQuoteVisible}
            randomQuote={randomQuote}
            enemyHealth={enemyHealth}
            enemyMaxHealth={enemyMaxHealth}
            regionColor={regionColor}
          />
        ) : (
          <div className="main-spinner-container-position">
            <div className="main-spinner-container">
              <div className="main-spinner a">
                <div className="main-spinner b">
                  <div className="main-spinner c">
                    <div className="main-spinner d">
                      <div className="main-spinner e">
                        <div className="main-spinner f"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleScreen;
