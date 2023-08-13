"use client";
import React from "react";
import { BsLightningFill, BsLightning } from "react-icons/bs";
import { GiMineExplosion } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import itemImageCheck from "../utils/itemImageCheck";
import "../stylesheets/CharacterCard.css";

const CharacterCardEditCurrent = ({
  character,
  activeBasic,
  activePrimary,
  activeSecondary,
  currentArmor,
}) => {
  const { characterName, roleIconUrl, roleColor, level } = character;

  const basicAbility = activeBasic;
  const primaryAbility = activePrimary;
  const secondaryAbility = activeSecondary;

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

  return (
    <div className="current-card-container">
      <div className="character-card-container">
        <div
          className="character-card-image"
          style={{
            backgroundImage: `url(${itemImageCheck(currentArmor.itemName)})`,
          }}
        >
          <div className="character-card-name-role-container">
            <h1 className="character-name">
              {characterName}
              <span className="character-level"> Lvl. {level}</span>
            </h1>
            <div
              className="character-role-icon"
              style={{ backgroundImage: `url(${roleIconUrl})` }}
            />
          </div>
          <div className="character-image-footer-container">
            <h1 className="character-card-footer">{currentArmor.itemName}</h1>
          </div>
          <div className="character-card-abilities-container">
            <div
              className="character-card-single-ability-container"
              style={{
                transition: "box-shadow .3s ease, background-color .3s ease",
              }} // Add transition for background-color as well
              onMouseEnter={(e) => {
                const rgb = hexToRgb(roleColor);
                e.currentTarget.style.boxShadow = `0px 0px 10px 8px rgba(${rgb.r},${rgb.g},${rgb.b},.75)`;
                e.currentTarget.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0.75)`; // Change background color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.backgroundColor = ""; // Reset background color when not hovering
              }}
            >
              <div className="character-card-ability-energy">
                {basicAbility ? basicAbility.energy : "Loading..."}

                <BsLightningFill className="character-card-ability-energy-icon" />
              </div>
              <div className="character-card-name-discription-container">
                <div className="character-card-ability-name">
                  {basicAbility ? basicAbility.name : "Loading..."}
                </div>
                <div className="character-card-ability-description">
                  {basicAbility ? basicAbility.description : "Loading..."}
                </div>
              </div>
              <div className="character-card-ability-damage">
                {basicAbility ? basicAbility.damage : "Loading..."}
                <GiMineExplosion className="character-card-ability-damage-icon" />
              </div>
            </div>
            <div
              className="character-card-single-ability-container"
              style={{
                transition: "box-shadow .3s ease, background-color .3s ease",
              }} // Add transition for background-color as well
              onMouseEnter={(e) => {
                const rgb = hexToRgb(roleColor);
                e.currentTarget.style.boxShadow = `0px 0px 10px 8px rgba(${rgb.r},${rgb.g},${rgb.b},.75)`;
                e.currentTarget.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0.75)`; // Change background color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.backgroundColor = ""; // Reset background color when not hovering
              }}
            >
              <div className="character-card-ability-energy">
                {primaryAbility.energy}
                <BsLightningFill className="character-card-ability-energy-icon" />
              </div>
              <div className="character-card-name-discription-container">
                <div className="character-card-ability-name">
                  {primaryAbility.name}
                </div>
                <div className="character-card-ability-description">
                  {primaryAbility.description}
                </div>
              </div>
              <div className="character-card-ability-effects-container">
            {primaryAbility.damage > 0 && (
              <div className="character-card-ability-damage">
                {primaryAbility.damage}
                <GiMineExplosion className="character-card-ability-damage-icon" />
              </div>
            )}
            {primaryAbility.healing > 0 && (
              <div className="character-card-ability-damage">
                {primaryAbility.healing}
                <FaHeart className="character-card-ability-damage-icon" />
              </div>
            )}
            {primaryAbility.recovery > 0 && (
              <div className="character-card-ability-damage">
                {primaryAbility.recovery}
                <BsLightning className="character-card-ability-damage-icon" />
              </div>
            )}
          </div>
            </div>
            <div
              className="character-card-single-ability-container"
              style={{
                transition: "box-shadow .3s ease, background-color .3s ease",
              }} // Add transition for background-color as well
              onMouseEnter={(e) => {
                const rgb = hexToRgb(roleColor);
                e.currentTarget.style.boxShadow = `0px 0px 10px 8px rgba(${rgb.r},${rgb.g},${rgb.b},.75)`;
                e.currentTarget.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0.75)`; // Change background color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.backgroundColor = ""; // Reset background color when not hovering
              }}
            >
              <div className="character-card-ability-energy">
                {secondaryAbility.energy}
                <BsLightningFill className="character-card-ability-energy-icon" />
              </div>
              <div className="character-card-name-discription-container">
                <div className="character-card-ability-name">
                  {secondaryAbility.name}
                </div>
                <div className="character-card-ability-description">
                  {secondaryAbility.description}
                </div>
              </div>
              <div className="character-card-ability-effects-container">
            {secondaryAbility.damage > 0 && (
              <div className="character-card-ability-damage">
                {secondaryAbility.damage}
                <GiMineExplosion className="character-card-ability-damage-icon" />
              </div>
            )}
            {secondaryAbility.healing > 0 && (
              <div className="character-card-ability-damage">
                {secondaryAbility.healing}
                <FaHeart className="character-card-ability-damage-icon" />
              </div>
            )}
            {secondaryAbility.recovery > 0 && (
              <div className="character-card-ability-damage">
                {secondaryAbility.recovery}
                <BsLightning className="character-card-ability-damage-icon" />
              </div>
            )}
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardEditCurrent;
