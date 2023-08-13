"use client";
import React from "react";
import { BsLightningFill, BsLightning } from "react-icons/bs";
import { GiMineExplosion } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import dbURI from '../lib/dbURI'

const CharacterCardEditAbilities = ({
  handleTabSelect,
  leftValueInactive,
  leftValueActive,
  abilities,
  activeBasic,
  setActiveBasic,
  activePrimary,
  setActivePrimary,
  activeSecondary,
  setActiveSecondary,
  currentTab,
  character,
  currentUser,
  selectedCharacterId
}) => {

  // Set basic ability functionality
  const handleSetActiveAbility = async (ability, type) => {
    const { success, error } = await updateActiveAbilities(ability, type);
    if (success) {
      switch (type) {
        case "basic":
          setActiveBasic(ability);
          break;
        case "primary":
          setActivePrimary(ability);
          break;
        case "secondary":
          setActiveSecondary(ability);
          break;
        default:
          console.error("Invalid type specified");
      }
    } else {
      console.error(error);
    }
  };

  async function updateActiveAbilities(ability, type) {
    const updateObject = { ability, type };

    try {
      const response = await axios.put(`${dbURI}/users/characters/activeAbilities`, {
        selectedCharacterId,
        update: updateObject,
        currentUser,
      });

      if (response.status !== 200) {
        throw new Error("Server responded with an error");
      }

      const updatedCharacter = response.data;
      return { success: true, updatedCharacter };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


  return (
    <div
      className="character-card-edit-abilities-placement"
      onClick={() => handleTabSelect("Equipment")}
      style={{
        marginLeft:
          currentTab === "Abilities" ? leftValueInactive : leftValueActive,
      }}
    >
      <div className="character-card-edit-abilities">Abilities</div>
      <div
        className="character-card-edit-abilities-content-container"
        style={{ overflow: currentTab === "Equipment" ? "auto" : "hidden" }}
      >
        {abilities.map((ability) => {
          const { name, damage, energy, healing, recovery, detailedDescription, level, type } =
            ability;
          return (
            <div
              className="character-card-edit-ability"
              key={name}
              style={
                activeBasic.name === name ||
                activePrimary.name === name ||
                activeSecondary.name === name
                  ? {
                      backgroundColor: `${character.roleColor}`,
                      boxShadow: `0px 0px 6px 6px ${character.roleColor}`,
                    }
                  : { backgroundColor: "rgb(27, 27, 27)" }
              }
            >
              <div className="character-card-edit-ability-name-damage-energy">
                <div className="character-card-edit-ability-name">{name}</div>
                <div className="character-card-edit-ability-damage-energy-container">
                  <div className="character-card-edit-ability-energy">
                    <BsLightningFill className="character-card-edit-ability-energy-icon" />
                    : {energy}
                  </div>
            {damage > 0 && (
              <div className="character-card-edit-ability-energy">
                <GiMineExplosion className="character-card-edit-ability-energy-icon" />
                : {damage}
              </div>
            )}
            {healing > 0 && (
              <div className="character-card-edit-ability-energy">
                <FaHeart className="character-card-edit-ability-energy-icon" />
                : {healing}
              </div>
            )}
            {recovery > 0 && (
              <div className="character-card-edit-ability-energy">
                <BsLightning className="character-card-edit-ability-energy-icon" />
                : {recovery}
              </div>
            )}
                </div>
              </div>
              <div className="character-card-edit-ability-level">
                Level: {level}
              </div>
              <div className="character-card-edit-ability-detailedDescription">
                {detailedDescription}
              </div>
              {type === "basic" ? (
                activeBasic.name === name ? (
                  <div className="character-card-edit-ability-equipped">
                    Equipped
                  </div>
                ) : (
                  <button
                    className="character-card-edit-ability-basic-btn"
                    type="button"
                    onClick={() => handleSetActiveAbility(ability, "basic")}
                  >
                    Set as Basic
                  </button>
                )
              ) : activePrimary.name === name ||
                activeSecondary.name === name ? (
                <div className="character-card-edit-ability-equipped">
                  Equipped
                </div>
              ) : (
                <div>
                  <div className="character-card-edit-pri-sec-placement">
                    <button
                      className="character-card-edit-ability-pri-btn"
                      type="button"
                      onClick={() => handleSetActiveAbility(ability, "primary")}
                    >
                      Set as Primary
                    </button>
                    <button
                      className="character-card-edit-ability-sec-btn"
                      type="button"
                      onClick={() =>
                        handleSetActiveAbility(ability, "secondary")
                      }
                    >
                      Set as Secondary
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterCardEditAbilities;
