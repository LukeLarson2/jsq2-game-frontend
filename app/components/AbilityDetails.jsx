"use client";
import React, { useState, useEffect } from "react";
import { BsLightningFill, BsLightning } from "react-icons/bs";
import { GiMineExplosion } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import AlertModal from "./AlertModal";
import axios from "axios";
import dbURI from '../lib/dbURI'

import "../stylesheets/AbilityDetails.css";

const AbilityDetails = ({
  ability,
  setShowDetails,
  prerequisiteSkill1,
  prerequisiteSkill2,
  characterName,
  ownedAbilities,
  character,
  roleColor,
  updateCharacterAbilities,
  skillPoints,
  currentUser,
  selectedCharacterId,
}) => {
  const [notEnoughSkillPoints, setNotEnoughSkillPoints] = useState(false);
  const [needPreReqSkill, setNeedPreReqSkill] = useState(false);
  const [notHighEnoughLevel, setnotHighEnoughLevel] = useState(false);
  const [hasAbility, setHasAbility] = useState(false);
  const {
    name,
    damage,
    healing,
    energy,
    recovery,
    detailedDescription,
    level,
    tree,
  } = ability;

  const handleBuySkill = async (skill, skillPointsRequired, requiredLevel) => {
    // Check if character has enough skill points to learn this ability
    if (skillPoints >= skillPointsRequired) {
      // Check if character's level is high enough
      if (character.level < requiredLevel) {
        setnotHighEnoughLevel(true);
        return;
      }
      // Check if prerequisite skill is owned
      // Check if prerequisite skill is owned
      let needsPreReq = false;
      let ownedAbilityNames = ownedAbilities.map((a) => a.name);

      if (skill.tree === "Ultimate") {
        if (
          (prerequisiteSkill1.name &&
          !ownedAbilityNames.includes(prerequisiteSkill1.name)) && (          prerequisiteSkill2.name &&
            !ownedAbilityNames.includes(prerequisiteSkill2.name))
        ) {
          needsPreReq = true;
        }
      } else {
        if (
          prerequisiteSkill1.name &&
          !ownedAbilityNames.includes(prerequisiteSkill1.name)
        ) {
          needsPreReq = true;
        }
      }

      if (needsPreReq) {
        setNeedPreReqSkill(true);
        return;
      }

      try {
        const updatedAbilities = [...ownedAbilities, skill];
        const updatedSkillPoints = skillPoints - skillPointsRequired;
        const response = await axios.patch(
          `${dbURI}/users/characters/buy-skill`,
          {
            selectedCharacterId,
            abilities: updatedAbilities,
            skillPoints: updatedSkillPoints,
            currentUser
          }
        );

        if (response.status === 200) {
          updateCharacterAbilities(updatedAbilities, updatedSkillPoints);
        } else {
          console.error("Unable to update character abilities.");
        }
      } catch (error) {
        console.error("Error while buying skill:", error);
      }

    } else {
      setNotEnoughSkillPoints(true);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    const abilityOwned = ownedAbilities.some(
      (ownedAbility) => ownedAbility.name === ability.name
    );
    setHasAbility(abilityOwned);
  }, [ownedAbilities, ability]);

  return (
    <div className="skill-tree-ability-details-overlay">
      <div
        className="skill-tree-ability-details-modal"
        style={{ backgroundImage: "url(./skill_tree_background_blue.png)" }}
      >
        {notEnoughSkillPoints && (
          <AlertModal
            message="Not enough skill points for that skill!"
            setShowAlert={setNotEnoughSkillPoints}
          />
        )}
        {notHighEnoughLevel && (
          <AlertModal
            message="You need to be higher level to learn this skill!"
            setShowAlert={setnotHighEnoughLevel}
          />
        )}
        {needPreReqSkill && (
          <AlertModal
            message="Previous skill not learned!"
            setShowAlert={setNeedPreReqSkill}
          />
        )}
        <div className="skill-tree-ability-details-content">
          <div className="skill-tree-ability-details-name-level">
            <div className="skill-tree-ability-details-name">{name}</div>
            <div className="skill-tree-ability-details-level">
              Level {level}
            </div>
            <div className="skill-tree-ability-details-info">
              {detailedDescription}
            </div>
            <div className="skill-tree-ability-details-stats-container">
              <div className="skill-tree-ability-details-stats">
                {damage}{" "}
                <GiMineExplosion className="skill-tree-ability-details-stats-icon" />
              </div>
              <div className="skill-tree-ability-details-stats">
                {energy}{" "}
                <BsLightningFill className="skill-tree-ability-details-stats-icon" />
              </div>
              <div className="skill-tree-ability-details-stats">
                {healing}{" "}
                <FaHeart className="skill-tree-ability-details-stats-icon" />
              </div>
              <div className="skill-tree-ability-details-stats">
                {recovery}{" "}
                <BsLightning className="skill-tree-ability-details-stats-icon" />
              </div>
            </div>
          </div>
        </div>
        {!hasAbility ? (
          <div>
            <div className="skill-points-required">
              Requires {ability.skillPoints} Skill Points
            </div>
            <button
              type="button"
              className="skill-tree-details-learn-btn"
              onClick={() =>
                handleBuySkill(ability, ability.skillPoints, ability.level)
              }
            >
              Learn Skill
            </button>
          </div>
        ) : (
          <div
            className="skill-tree-skill-known"
            style={{
              backgroundColor: roleColor,
              boxShadow: `0px 0px 5px 5px ${roleColor}`,
            }}
          >
            Known
          </div>
        )}

        <button
          type="button"
          className="skill-tree-details-close-btn"
          onClick={() => handleCloseDetails()}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AbilityDetails;
