"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import itemLootGenerator from "../utils/itemLootGenerator";
import itemQualityCheck from "../utils/itemQualityCheck";
import "../stylesheets/OpenContainer.css";
import { v4 as uuidv4 } from "uuid";
import dbURI from '../lib/dbURI'

const OpenContainer = ({
  choices,
  containerType,
  setIsContainer,
  setCurrentIndex,
  currentIndex,
  containerImage,
  characterId,
  currentUser,
  selectedCharacterId,
}) => {
  const [choice, setChoice] = useState("");
  const [itemsFound, setItemsFound] = useState([]);
  const [openValue, setOpenValue] = useState("");




  const formatContainerType = (type) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  let containerTypeName = formatContainerType(containerType);

  const handleCloseContainer = () => {
    setCurrentIndex(currentIndex + 3);
    setIsContainer(false);
  };
  const handleChoice = async (value) => {
    setOpenValue(value);
    setChoice(choices[value]);
    const items = await itemLootGenerator(containerType);
    const itemsWithKeys = items.map((item) => ({ ...item, key: uuidv4() })); // Add a UUID to each item as the 'key'
    setItemsFound(itemsWithKeys);
    try {
      await axios.put(
        `${dbURI}/users/characters/inventory`,
        {
            selectedCharacterId, // Using selectedCharacterId instead of characterId
            newItems: itemsWithKeys,
            currentUser
          },
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-type-modal-overlay">
      <div className="container-type-modal">
        <div
          className="container-type-image"
          style={{ backgroundImage: `url(${containerImage})` }}
        >
          {openValue === "yes" && (
            <div className="container-type-total-items-title">
              Items added to bag
            </div>
          )}
          {openValue === "yes" &&
            itemsFound.map((item) => {
              const { itemName, quality, key } = item; // Destructure key from item
              const color = itemQualityCheck(quality);
              return (
                <div className="container-type-item-found" key={key}>
                  <div
                    className="container-type-item-name"
                    style={{ color: color }}
                  >
                    {itemName}
                  </div>
                </div>
              );
            })}
        </div>
        {!choice ? (
          <div className="container-type-content">
            <div className="container-type-text">
              Open the {containerTypeName}?
            </div>
            <div className="container-type-btn-placement">
              <button
                type="button"
                className="container-type-btn"
                onClick={() => handleChoice("yes")}
              >
                Yes
              </button>
              <button
                type="button"
                className="container-type-btn"
                onClick={() => handleChoice("no")}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="container-type-content">
            <div className="container-type-text">{choice}</div>
            <div className="container-type-btn-placement">
              <button
                type="button"
                className="container-type-btn"
                onClick={handleCloseContainer}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenContainer;
