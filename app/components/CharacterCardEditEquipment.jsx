"use client";
import React, { useEffect } from "react";
import itemImageCheck from "../utils/itemImageCheck";

const CharacterCardEditEquipment = ({
  handleTabSelect,
  currentTab,
  leftValueInactive,
  leftValueActive,
  character,
  handleOpenArmor,
  handleOpenMainHand,
  handleOpenOffHand,
  equippedGear,
  setCurrentArmor,
  currentArmor,
  setCurrentMainHand,
  currentMainHand,
  setCurrentOffHand,
  currentOffHand,
}) => {
  const { roleColor } = character;
  const { armor, mainHand, offHand } = equippedGear;

  // Create a piece of state to track the armor

  // Update the armor state whenever equippedGear.armor changes
  useEffect(() => {
    setCurrentArmor(equippedGear.armor);
  }, [equippedGear.armor]);
  useEffect(() => {
    setCurrentMainHand(equippedGear.mainHand);
  }, [equippedGear.mainHand]);
  useEffect(() => {
    setCurrentOffHand(equippedGear.offHand);
  }, [equippedGear.offHand]);

  return (
    <div
      className="character-card-edit-equipment-placement"
      onClick={() => handleTabSelect("Abilities")}
      style={{
        marginLeft:
          currentTab === "Equipment" ? leftValueInactive : leftValueActive,
      }}
    >
      <div className="character-card-edit-equipment">Equipment</div>
      <div
        className="character-card-edit-abilities-content-container"
        style={{ overflow: currentTab === "Abiltiies" ? "auto" : "hidden" }}
      >
        <div className="character-card-edit-equipment-current-gear">
          <div
            className="character-card-edit-equipment-armor"
            style={{
              backgroundImage: currentArmor
                ? `url(${itemImageCheck(currentArmor.itemName)})`
                : `url('')`,
              borderColor: roleColor,
            }}
            onClick={handleOpenArmor}
          >
            <div className="character-card-edit-equipment-armor-text">
              Armor
            </div>
          </div>
          <div className="character-card-edit-equipment-main-off-container">
            <div
              className="character-card-edit-equipment-mainhand"
              style={{
                backgroundImage: currentMainHand
                  ? `url(${itemImageCheck(currentMainHand.itemName)})`
                  : `url('')`,
                borderColor: roleColor,
              }}
              onClick={handleOpenMainHand}
            >
              <div className="character-card-edit-equipment-mainhand-text">
                Main Hand
              </div>
            </div>
            <div
              className="character-card-edit-equipment-offhand"
              style={{
                backgroundImage: currentOffHand
                  ? `url(${itemImageCheck(currentOffHand.itemName)})`
                  : `url('')`,
                borderColor: roleColor,
              }}
              onClick={handleOpenOffHand}
            >
              <div className="character-card-edit-equipment-offhand-text">
                Off
                <br />
                Hand
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardEditEquipment;
