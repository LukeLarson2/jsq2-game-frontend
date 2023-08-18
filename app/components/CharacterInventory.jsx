"use client";
import React, { useState, useEffect } from "react";
import itemQualityCheck from "../utils/itemQualityCheck";
import itemIconCheck from "../utils/itemIconCheck";
import itemImageCheck from "../utils/itemImageCheck";
import ItemModalDisplay from "./ItemModalDisplay";
import "../stylesheets/CharacterInventory.css";
import {
  GiSpiralBottle,
  GiBroadsword,
  GiSwapBag,
  GiShoulderArmor,
} from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { AiFillAppstore } from "react-icons/ai";
import { BsLightningFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

const CharacterInventory = ({
  inventory,
  setShowInventory,
  playerHealth,
  currentEnergy,
  setPlayerHealth,
  setCurrentEnergy,
  _id,
  useItem,
  setUseItem,
  equippedGear,
  currentUser,
  selectedCharacterId,
  itemQuantity,
  setItemQuantity,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const [filterValue, setFilterValue] = useState([
    "Weapon",
    "Armor",
    "Book",
    "Shield",
    "Misc",
    "Food",
    "Orb",
    "Potion",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemHealAmount, setItemHealAmount] = useState(0);
  const handleClick = (item) => {
    setShowModal(true);
    setItemDetails(item);
  };

  const handleCloseIntentory = () => {
    setShowInventory(false);
  };

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const equippedItems = inventory.filter((item) =>
    [
      equippedGear.armor.key,
      equippedGear.mainHand.key,
      equippedGear.offHand.key,
    ].includes(item.key)
  );

  const otherItems = inventory.filter(
    (item) =>
      ![
        equippedGear.armor.key,
        equippedGear.mainHand.key,
        equippedGear.offHand.key,
      ].includes(item.key)
  );

  const allItems = [...equippedItems, ...otherItems];

  const displayItems = allItems.map((item) => {
    const { itemName, quality, key, type } = item;
    const icon = itemIconCheck(type);
    const color = itemQualityCheck(quality);
    const image = itemImageCheck(itemName);
    if (filterValue.includes(type)) {
      return (
        <div
          key={key}
          className="player-bag-item-info"
          onClick={() => handleClick(item)}
          style={{ backgroundColor: color }}
        >
          <div
            className="player-bag-item-image"
            style={{ backgroundImage: `url(${image})` }}
          >
            <span className="player-bag-item-icon">{icon}</span>
            {equippedGear.armor.key === key && (
              <div className="player-bag-item-equipped">Equipped</div>
            )}
            {equippedGear.mainHand.key === key && (
              <div className="player-bag-item-equipped">Equipped</div>
            )}
            {equippedGear.offHand.key === key && (
              <div className="player-bag-item-equipped">Equipped</div>
            )}
          </div>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="player-bag-overlay">
      <div
        className="player-bag-modal"
        style={{ backgroundImage: `url('./inventory_background.png')` }}
      >
        <div className="player-inventory-title">Inventory</div>
        <div className="player-inventory-filter-select">
          <div className="player-inventory-filter-btn-container">
            <button
              type="button"
              className="player-inventory-filter"
              onClick={() =>
                handleFilter([
                  "Weapon",
                  "Armor",
                  "Book",
                  "Shield",
                  "Misc",
                  "Food",
                  "Orb",
                  "Potion",
                ])
              }
            >
              <AiFillAppstore />
            </button>
            <button
              type="button"
              className="player-inventory-filter"
              onClick={() => handleFilter(["Weapon", "Book", "Shield", "Orb"])}
            >
              <GiBroadsword />
            </button>
            <button
              type="button"
              className="player-inventory-filter"
              onClick={() => handleFilter(["Armor"])}
            >
              <GiShoulderArmor />
            </button>
            <button
              type="button"
              className="player-inventory-filter"
              onClick={() => handleFilter(["Potion"])}
            >
              <GiSpiralBottle />
            </button>
            <button
              type="button"
              className="player-inventory-filter"
              onClick={() => handleFilter(["Food"])}
            >
              <FaHamburger />
            </button>
            <button
              type="button"
              className="player-inventory-filter"
              onClick={() => handleFilter("Misc")}
            >
              <GiSwapBag />
            </button>
          </div>
          <div
            className="player-bag-content-window"
            style={{
              backgroundImage: `url('./inventory_window_background.png')`,
            }}
          >
            {!isLoading ? (
              <div className="player-bag-content">{displayItems}</div>
            ) : (
              <div>
                {itemHealAmount > 0 ? (
                  <div className="using-item-loader-health"></div>
                ) : (
                  <div className="using-item-loader-energy"></div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="character-inventory-health-energy-container">
          <div className="character-inventory-bar">
            <div className="character-inventory-health-text">
              <FaHeart className="health-icon" />
              {`${playerHealth} / 100`}
            </div>
            <div
              className="character-inventory-bar-fill-hp"
              style={{ width: `${playerHealth}%` }}
            ></div>
          </div>
          <div className="character-inventory-bar">
            <div className="character-inventory-energy-text">
              <BsLightningFill className="health-icon" />
              {`${currentEnergy} / 100`}
            </div>
            <div
              className="character-inventory-bar-fill-energy"
              style={{ width: `${currentEnergy}%` }}
            ></div>
          </div>
        </div>
        <div className="character-inventory-close-btn-container">
          <div
            className="character-inventory-close-btn"
            onClick={() => handleCloseIntentory()}
          >
            Close
          </div>
        </div>
      </div>
      {showModal && (
        <ItemModalDisplay
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          playerHealth={playerHealth}
          currentEnergy={currentEnergy}
          setPlayerHealth={setPlayerHealth}
          setCurrentEnergy={setCurrentEnergy}
          _id={_id}
          useItem={useItem}
          setUseItem={setUseItem}
          setIsLoading={setIsLoading}
          setItemHealAmount={setItemHealAmount}
          equippedGear={equippedGear}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
          itemQuantity={itemQuantity}
          setItemQuantity={setItemQuantity}
        />
      )}
    </div>
  );
};

export default CharacterInventory;
