"use client";
import React from "react";
import "../stylesheets/CharacterCardEditArmor.css";
import itemQualityCheck from "../utils/itemQualityCheck";
import itemImageCheck from "../utils/itemImageCheck";
import axios from 'axios'
import { GiShield, GiTwoCoins } from "react-icons/gi";
import dbURI from '../lib/dbURI'

const CharacterCardEditArmor = ({
  setShowArmor,
  inventory,
  roleColor,
  _id,
  setCurrentArmor,
  currentArmor,
  role,
  currentUser,
  selectedCharacterId,
}) => {

  const handleCloseModal = () => {
    setShowArmor(false);
  };

  const handleChangeArmor = async (item) => {
    try {
      const response = await axios.put(`${dbURI}/users/characters/armor`, {
          selectedCharacterId,
          item,
          currentUser
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = response.data;
      return setCurrentArmor(item);
    } catch (error) {
      console.error("error", error);
    }
  };



  return (
    <div className="character-card-edit-overlay">
      <div className="character-card-edit-modal">
        <div className="character-card-edit-slot-title">Armor</div>
        <div className="character-card-edit-content">
          {inventory
            .filter(
              (item, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.itemName === item.itemName && t.slot === item.slot
                )
            )
            .map((item, index) => {
              const {
                itemName,
                shielding,
                itemValue,
                quality,
                slot,
                usedByRoles,
              } = item;
              const color = itemQualityCheck(quality);
              const imageUrl = itemImageCheck(itemName);
              const itemEquipped =
                currentArmor.itemName === itemName ? true : false;
              const canUse = usedByRoles.includes(role);
              if (slot === "Armor" && canUse) {
                return (
                  <div
                    key={index}
                    className={`character-card-edit-slot-item ${
                      itemEquipped ? "equipped" : ""
                    }`}
                    onClick={() => handleChangeArmor(item)}
                    style={{
                      backgroundColor: itemEquipped ? roleColor : "#353535",
                      boxShadow: itemEquipped
                        ? `0px 0px 6px 6px ${roleColor}`
                        : "3px 3px 5px #111111",
                      cursor: itemEquipped ? "default" : "pointer",
                    }}
                  >
                    <div
                      className="character-card-edit-slot-item-image"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                        borderColor: color,
                      }}
                    />
                    <div className="character-card-edit-slot-item-info">
                      <div className="character-card-edit-slot-item-name">
                        {itemName}
                        {itemEquipped && <div id="equipped-text">Equipped</div>}
                      </div>
                    </div>
                    <div className="character-card-edit-slot-item-stats-container">
                      <div className="character-card-edit-slot-item-shielding">
                        <GiShield className="character-card-edit-slot-item-shielding-icon" />{" "}
                        {shielding}
                      </div>
                      <div className="character-card-edit-slot-item-itemValue">
                        <GiTwoCoins className="character-card-edit-slot-item-itemValue-icon" />{" "}
                        {itemValue}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className="character-card-edit-close-modal-btn-placement">
          <button
            className="character-card-edit-close-modal-btn"
            type="button"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardEditArmor;
