"use client";
import React from "react";
import axios from "axios";
import "../stylesheets/CharacterCardEditArmor.css";
import itemQualityCheck from "../utils/itemQualityCheck";
import itemImageCheck from "../utils/itemImageCheck";
import { GiTwoCoins, GiMineExplosion, GiShield } from "react-icons/gi";
import { GoTriangleDown } from "react-icons/go";
import { SiTarget } from "react-icons/si";
import dbURI from "../lib/dbURI";

const CharacterCardEditOffHand = ({
  setShowOffHand,
  inventory,
  roleColor,
  _id,
  setCurrentOffHand,
  currentOffHand,
  role,
  currentUser,
  selectedCharacterId,
}) => {
  const handleCloseModal = () => {
    setShowOffHand(false);
  };

  const handleChangeOffHand = async (item) => {
    try {
      const response = await axios.put(`${dbURI}/users/characters/offHand`, {
        selectedCharacterId,
        item,
        currentUser,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = response.data;
      return setCurrentOffHand(item);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="character-card-edit-overlay">
      <div className="character-card-edit-modal">
        <div className="character-card-edit-slot-title">Off Hand</div>
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
                damage,
                itemValue,
                quality,
                slot,
                usedByRoles,
                shielding,
              } = item;
              const color = itemQualityCheck(quality);
              const imageUrl = itemImageCheck(itemName);
              const itemEquipped =
                currentOffHand.itemName === itemName ? true : false;
              const canUse = usedByRoles.includes(role);
              let arrowColor = "#b11717";
              let arrowDirection = "0";
              const differenceValue = damage
                ? damage - currentOffHand.damage
                : shielding - currentOffHand.shielding;
              if (currentOffHand.damage < damage) {
                arrowColor = "#03b438";
                arrowDirection = "180";
              }
              if (slot === "Off Hand" && canUse) {
                return (
                  <div
                    key={index}
                    className={`character-card-edit-slot-item ${
                      itemEquipped ? "equipped" : ""
                    }`}
                    onClick={() => handleChangeOffHand(item)}
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
                      <div className="character-card-edit-slot-item-damage">
                        {!itemEquipped && (
                          <div
                            className="character-card-edit-slot-difference"
                            style={{ color: arrowColor }}
                          >
                            {differenceValue !== 0 && (
                              <GoTriangleDown
                                style={{
                                  transform: `rotate(${arrowDirection}deg)`,
                                }}
                              />
                            )}
                          </div>
                        )}
                        {damage ? (
                          <>
                            {damage}
                            <GiMineExplosion className="character-card-edit-slot-item-damage-icon" />{" "}
                          </>
                        ) : (
                          <>
                            {shielding}
                            <GiShield className="character-card-edit-slot-item-damage-icon" />{" "}
                          </>
                        )}
                      </div>
                      <div className="character-card-edit-slot-item-itemValue">
                        {itemValue}
                        <GiTwoCoins className="character-card-edit-slot-item-itemValue-icon" />{" "}
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

export default CharacterCardEditOffHand;
