"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsLightningFill, BsLightning } from "react-icons/bs";
import { GiMineExplosion } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import itemImageCheck from "../utils/itemImageCheck";
import itemQualityCheck from "../utils/itemQualityCheck";
import getRoleIcon from "../utils/getRoleIcon";
import "../stylesheets/CharacterCard.css";

const CharacterCard = ({
  setPlayerHealth,
  character,
  handleAttack,
  turn,
  playerDamageTaken,
  isAttacking,
  playerDamageDisplayed,
  playerIsHit,
  armor,
  currentEnemy,
  displayedDamage,
  playerHealth,
  currentEnergy,
  setCurrentEnergy,
  equippedGear,
  displayedRecovery,
  playerRecoveryDisplayed,
  isRecovering,
  currentUser,
  selectedCharacterId,
  setUseItem,
  setDisabled,
  useItem,
  dbURI,
  healthPotionColor,
  healthPotionImage,
  totalHealthPotions,
  energyPotionColor,
  energyPotionImage,
  totalEnergyPotions,
  battlePotionHealAmount,
  battlePotionRecoverAmount,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  if (!character) return <div>Loading...</div>;

  const { mainHand, offHand } = equippedGear;

  const mainItem = mainHand.itemName;
  const mainQuality = mainHand.quality;
  const offItem = offHand.itemName;
  const offQuality = offHand.quality;

  const mainColor = itemQualityCheck(mainQuality);
  const offColor = itemQualityCheck(offQuality);
  const armorColor = itemQualityCheck(armor.quality);

  const mainImage = itemImageCheck(mainItem);
  const offImage = itemImageCheck(offItem);

  const { characterName, level, activeAbilities, role, inventory } = character;

  const handleUseFirstPotion = async (type) => {
    setIsLoading(true);
    if (type === "health") {
      const potionQualities = [
        "Common",
        "Uncommon",
        "Rare",
        "Epic",
        "Legendary",
        "Mythical",
      ];

      // Locate the lowest quality health potion
      let lowestQualityPotion;
      for (const quality of potionQualities) {
        const potion = inventory.find(
          (item) =>
            item.type === "Potion" &&
            item.healAmount > 0 &&
            item.recoverAmount <= 0 &&
            item.quality === quality
        );
        if (potion) {
          lowestQualityPotion = potion;
          break;
        }
      }
      if (lowestQualityPotion) {
        const maxHealthCheck =
          playerHealth + lowestQualityPotion.healAmount > 100
            ? 100
            : lowestQualityPotion.healAmount;
        const newHealth =
          maxHealthCheck === 100
            ? 100
            : playerHealth + lowestQualityPotion.healAmount;
        await fetch(`${dbURI}/users/characters/health`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser}`, // Assuming currentUser is the loginToken
          },
          body: JSON.stringify({
            selectedCharacterId, // Use selectedCharacterId instead of _id
            health: newHealth,
            currentUser,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            setPlayerHealth(newHealth);
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        try {
          await axios.delete(
            `${dbURI}/users/characters/inventory?selectedCharacterId=${selectedCharacterId}&key=${lowestQualityPotion.key}&currentUser=${currentUser}`
          );
        } catch (err) {
          console.error(err);
        }

        setUseItem(!useItem);
        // Remove the potion from the character's inventory
        // Handle the response data if needed
      }
    } else if (type === "energy") {
      const potionQualities = [
        "Common",
        "Uncommon",
        "Rare",
        "Epic",
        "Legendary",
        "Mythical",
      ];

      // Locate the lowest quality health potion
      let lowestQualityPotion;
      for (const quality of potionQualities) {
        const potion = inventory.find(
          (item) =>
            item.type === "Potion" &&
            item.healAmount <= 0 &&
            item.recoverAmount > 0 &&
            item.quality === quality
        );
        if (potion) {
          lowestQualityPotion = potion;
          break;
        }
      }
      if (lowestQualityPotion) {
        const maxEnergyCheck =
          currentEnergy + lowestQualityPotion.recoverAmount > 100
            ? 100
            : lowestQualityPotion.recoverAmount;
        const newEnergy =
          maxEnergyCheck === 100
            ? 100
            : currentEnergy + lowestQualityPotion.recoverAmount;
        await fetch(`${dbURI}/users/characters/energy`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser}`, // Assuming currentUser is the loginToken
          },
          body: JSON.stringify({
            selectedCharacterId, // Use selectedCharacterId instead of _id
            energy: newEnergy,
            currentUser,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            setCurrentEnergy(newEnergy);
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        try {
          await axios.delete(
            `${dbURI}/users/characters/inventory?selectedCharacterId=${selectedCharacterId}&key=${lowestQualityPotion.key}&currentUser=${currentUser}`
          );
        } catch (err) {
          console.error(err);
        }

        setUseItem(!useItem);
        // Remove the potion from the character's inventory
        // Handle the response data if needed
      }
    }
    setIsLoading(false);
  };
  const iconUrl = getRoleIcon(role);

  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const renderAbility = (ability, roleColor) => (
    <div key={ability.name}>
      {ability.name ? (
        <div
          className={`character-card-single-ability-container ${
            isAttacking || isRecovering ? "disabled" : ""
          } ${!turn ? "disabled" : ""}`}
          style={{
            transition: "box-shadow .3s ease, background-color .3s ease",
            cursor: isAttacking || isRecovering ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => {
            const rgb = hexToRgb(roleColor);
            e.currentTarget.style.boxShadow = `0px 0px 10px 8px rgba(${rgb.r},${rgb.g},${rgb.b},.75)`;
            e.currentTarget.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0.75)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "";
            e.currentTarget.style.backgroundColor = "";
          }}
          onClick={() =>
            handleAttack(
              "player",
              ability.damage,
              armor,
              currentEnemy,
              ability.energy,
              ability.healing,
              ability.recovery
            )
          }
        >
          <div className="character-card-ability-energy">
            {ability.energy}
            <BsLightningFill className="character-card-ability-energy-icon" />
          </div>
          <div className="character-card-name-discription-container">
            <div className="character-card-ability-name">{ability.name}</div>
            <div className="character-card-ability-description">
              {ability.description}
            </div>
          </div>
          <div className="character-card-ability-effects-container">
            {ability.damage > 0 && (
              <div className="character-card-ability-damage">
                {ability.damage}
                <GiMineExplosion className="character-card-ability-damage-icon" />
              </div>
            )}
            {ability.healing > 0 && (
              <div className="character-card-ability-damage">
                {ability.healing}
                <FaHeart className="character-card-ability-damage-icon" />
              </div>
            )}
            {ability.recovery > 0 && (
              <div className="character-card-ability-damage">
                {ability.recovery}
                <BsLightning className="character-card-ability-damage-icon" />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <div
        className={`character-card-container ${
          isAttacking || isRecovering ? "attacking" : ""
        } ${playerIsHit ? "hit" : ""} ${
          playerDamageDisplayed ? "damaged" : ""
        }`}
      >
        {playerDamageDisplayed && (
          <div
            className={`character-card-damage-number ${
              playerDamageDisplayed ? "animate" : ""
            }`}
          >
            {displayedDamage}
          </div>
        )}
        {playerRecoveryDisplayed && (
          <div
            className={`character-card-recovery-number ${
              playerRecoveryDisplayed ? "animate" : ""
            }`}
          >
            + {displayedRecovery}
          </div>
        )}
        <div
          className="character-card-image"
          style={{ backgroundImage: `url(${itemImageCheck(armor.itemName)})` }}
        >
          <div
            className="character-card-main-hand"
            style={{
              backgroundColor: mainColor,
            }}
          >
            <div
              className="character-card-item-image"
              style={{ backgroundImage: `url("${mainImage}")` }}
            />
          </div>
          <div
            className="character-card-off-hand"
            style={{
              backgroundColor: offColor,
            }}
          >
            <div
              className="character-card-item-image"
              style={{ backgroundImage: `url("${offImage}")` }}
            />
          </div>
          <div
            className="character-card-health-potion"
            style={{
              backgroundColor: healthPotionColor,
            }}
          >
            <button
              className="character-card-health-potion-image"
              style={{
                backgroundImage: `url("${healthPotionImage}")`,
                opacity: isLoading ? ".75" : "1",
              }}
              onClick={() => handleUseFirstPotion("health")}
              disabled={isLoading}
            >
              {healthPotionImage && (
                <div
                  className="character-card-battle-potion-amount"
                  style={{ color: "#911909" }}
                >{`+${battlePotionHealAmount}`}</div>
              )}
              {!healthPotionImage ? "No Potions" : `${totalHealthPotions}`}
            </button>
          </div>
          <div
            className="character-card-energy-potion"
            style={{
              backgroundColor: energyPotionColor,
            }}
          >
            <button
              className="character-card-energy-potion-image"
              style={{
                backgroundImage: `url("${energyPotionImage}")`,
                opacity: isLoading ? ".75" : "1",
              }}
              onClick={() => handleUseFirstPotion("energy")}
              disabled={isLoading}
            >
              {energyPotionImage && (
                <div
                  className="character-card-battle-potion-amount"
                  style={{ color: "#229b22" }}
                >{`+${battlePotionRecoverAmount}`}</div>
              )}
              {!energyPotionImage ? "No Potions" : `${totalEnergyPotions}`}
            </button>
          </div>
          <div className="character-card-health-energy-container">
            <div className="character-card-bar">
              <div className="character-card-health-text">
                <FaHeart className="health-icon" />
                {`${playerHealth} / 100`}
              </div>
              <div
                className="character-card-bar-fill-hp"
                style={{ width: `${playerHealth}%` }}
              ></div>
            </div>
            <div className="character-card-bar">
              <div className="character-card-energy-text">
                <BsLightningFill className="health-icon" />
                {`${currentEnergy} / 100`}
              </div>
              <div
                className="character-card-bar-fill-energy"
                style={{ width: `${currentEnergy}%` }}
              ></div>
            </div>
          </div>
          <div className="character-card-name-role-container">
            <h1 className="character-name">
              {characterName}
              <span className="character-level"> Lvl. {level}</span>
            </h1>
            <div
              className="character-role-icon"
              style={{ backgroundImage: `url(${iconUrl})` }}
            />
          </div>
          <div className="character-image-footer-container">
            <h1 className="character-card-footer">{armor.itemName}</h1>
          </div>
          <div className="character-card-abilities-container">
            {Object.entries(activeAbilities)
              .filter(([key, ability]) => ability && ability.name)
              .map(([key, ability]) =>
                renderAbility(ability, character.roleColor)
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterCard;
