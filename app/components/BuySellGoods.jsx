"use state";

import React, { useState, useEffect } from "react";
import itemQualityCheck from "../utils/itemQualityCheck";
import itemIconCheck from "../utils/itemIconCheck";
import itemImageCheck from "../utils/itemImageCheck";
import { GiSellCard, GiBuyCard } from "react-icons/gi";
import ItemModalDisplay from "./ItemModalDisplay";
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
import "../stylesheets/BuySellGoods.css";

const BuySellGoods = ({
  setShowShopGoods,
  setShopIndex,
  shopIndex,
  inventory,
  _id,
  playerHealth,
  currentEnergy,
  setPlayerHealth,
  setCurrentEnergy,
  useItem,
  setUseItem,
  isShop,
  sellItem,
  isLoading,
  shopItems,
  buyItem,
  equippedGear,
  enoughGold,
  setEnoughGold,
  currentGold,
  shopType,
  currentUser,
  selectedCharacterId,
  sellAllItemsOfQuality,
}) => {
  const handleCloseShop = () => {
    setShowShopGoods(false);
    setShopIndex(shopIndex + 2);
  };

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
    "Clothing",
  ]);
  const [isSelling, setIsSelling] = useState(true);

  const handleClick = (item) => {
    setShowModal(true);
    setItemDetails(item);
  };

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const handleToggleShop = (value) => {
    if (value === "sell") {
      setIsSelling(true);
    } else {
      setIsSelling(false);
    }
  };
  return (
    <div className="player-bag-overlay">
      <div
        className="goods-modal"
        style={{ backgroundImage: `url('./shop_inventory_background.png')` }}
      >
        <div className="goods-title">{shopType} Shop</div>
        <div className="buy-sell-icon-placement">
          <div
            className="sell-goods-icon"
            onClick={() => handleToggleShop("sell")}
            style={{
              backgroundColor: isSelling ? "black" : "white",
              color: isSelling ? "white" : "black",
            }}
          >
            Sell
          </div>
          <div
            className="buy-goods-icon"
            onClick={() => handleToggleShop("buy")}
            style={{
              backgroundColor: !isSelling ? "black" : "white",
              color: !isSelling ? "white" : "black",
            }}
          >
            Buy
          </div>
        </div>
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
                  "Clothing",
                ])
              }
            >
              <AiFillAppstore />
            </button>
            <button
              type="button"
              className="player-inventory-filter-shop"
              onClick={() => handleFilter(["Weapon", "Book", "Shield", "Orb"])}
            >
              <GiBroadsword />
            </button>
            <button
              type="button"
              className="player-inventory-filter-shop"
              onClick={() => handleFilter(["Armor"])}
            >
              <GiShoulderArmor />
            </button>
            <button
              type="button"
              className="player-inventory-filter-shop"
              onClick={() => handleFilter(["Potion"])}
            >
              <GiSpiralBottle />
            </button>
            <button
              type="button"
              className="player-inventory-filter-shop"
              onClick={() => handleFilter(["Food"])}
            >
              <FaHamburger />
            </button>
            <button
              type="button"
              className="player-inventory-filter-shop"
              onClick={() => handleFilter(["Misc", "Clothing"])}
            >
              <GiSwapBag />
            </button>
          </div>
          {isSelling && (
            <div className="player-inventory-sell-all-container">
              <button className='player-inventory-sell-all-btn' style={{backgroundColor: '#bebebe'}} onClick={() => sellAllItemsOfQuality("Common")}>
                Sell All
              </button>
              <button className='player-inventory-sell-all-btn' style={{backgroundColor: '#18a705'}} onClick={() => sellAllItemsOfQuality("Uncommon")}>
                Sell All
              </button>
              <button className='player-inventory-sell-all-btn' style={{backgroundColor: '#3099fc'}} onClick={() => sellAllItemsOfQuality("Rare")}>
                Sell All
              </button>
              <button className='player-inventory-sell-all-btn' style={{backgroundColor: '#995aff'}} onClick={() => sellAllItemsOfQuality("Epic")}>
                Sell All
              </button>
            </div>
          )}
          {isSelling ? (
            <div className="player-bag-content-window-shop">
              {!isLoading ? (
                <div className="player-bag-content-shop">
                  {Array.isArray(inventory) &&
                  inventory.some((item) => filterValue.includes(item.type)) ? (
                    inventory.map((item) => {
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
                              <span className="player-bag-item-icon">
                                {icon}
                              </span>
                              {equippedGear.armor.key === key && (
                                <div className="player-bag-item-equipped">
                                  Equipped
                                </div>
                              )}
                              {equippedGear.mainHand.key === key && (
                                <div className="player-bag-item-equipped">
                                  Equipped
                                </div>
                              )}
                              {equippedGear.offHand.key === key && (
                                <div className="player-bag-item-equipped">
                                  Equipped
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <div className="character-inventory-no-items">
                      No items to display
                    </div>
                  )}
                </div>
              ) : (
                <div className="selling-load"></div>
              )}
            </div>
          ) : (
            <div className="player-bag-content-window-shop">
              {!isLoading ? (
                <div className="player-bag-content-shop">
                  {Array.isArray(shopItems) &&
                  shopItems.some((item) => filterValue.includes(item.type)) ? (
                    shopItems.map((item, index) => {
                      const { itemName, quality, type } = item;
                      const icon = itemIconCheck(type);
                      const color = itemQualityCheck(quality);
                      const image = itemImageCheck(itemName);
                      if (filterValue.includes(type)) {
                        return (
                          <div
                            key={index}
                            className="player-bag-item-info"
                            onClick={() => handleClick(item)}
                            style={{ backgroundColor: color }}
                          >
                            <div
                              className="player-bag-item-image"
                              style={{ backgroundImage: `url(${image})` }}
                            >
                              <span className="player-bag-item-icon">
                                {icon}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <div className="character-inventory-no-items">
                      No items to display
                    </div>
                  )}
                </div>
              ) : (
                <div className="selling-load"></div>
              )}
            </div>
          )}
        </div>
        <div className="character-inventory-close-btn-container">
          <div className="goods-close-btn" onClick={() => handleCloseShop()}>
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
          isShop={isShop}
          isSelling={isSelling}
          sellItem={sellItem}
          isLoading={isLoading}
          buyItem={buyItem}
          equippedGear={equippedGear}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      )}
    </div>
  );
};

export default BuySellGoods;
