"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import itemQualityCheck from "../utils/itemQualityCheck";
import itemImageCheck from "../utils/itemImageCheck";
import NotEnoughGoldModal from "../components/NotEnoughGoldModal";
import { GiTwoCoins } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { BsLightning } from "react-icons/bs";
import dbURI from "../lib/dbURI";
import { GoTriangleDown } from "react-icons/go";

const ItemDetailConsumable = ({
  itemDetails,
  setShowModal,
  itemIcon,
  playerHealth,
  currentEnergy,
  setPlayerHealth,
  setCurrentEnergy,
  _id,
  useItem,
  setUseItem,
  isShop,
  isSelling,
  setIsLoading,
  setItemHealAmount,
  sellItem,
  buyItem,
  enoughGold,
  setEnoughGold,
  currentGold,
  currentUser,
  selectedCharacterId,
  itemQuantity,
  setItemQuantity,
}) => {
  const [hasEnough, setHasEnough] = useState(true);
  const [checkHasEnough, setCheckHasEnough] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const {
    itemName,
    type,
    description,
    healAmount,
    recoverAmount,
    itemValue,
    quality,
    key,
  } = itemDetails;
  const imageUrl = itemImageCheck(itemName);
  const color = itemQualityCheck(quality);
  const handleClose = () => {
    setShowModal(false);
  };

  const handleUseItem = async (
    playerHealth,
    currentEnergy,
    healAmount,
    recoverAmount
  ) => {
    setDisabled(true);
    setItemHealAmount(healAmount);
    setIsLoading(true);

    /* --HEALTH POTION-- */
    if (healAmount && !recoverAmount) {
      const maxHealthCheck = playerHealth + healAmount > 100 ? 100 : healAmount;
      const newHealth =
        maxHealthCheck === 100 ? 100 : playerHealth + healAmount;
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
          `${dbURI}/users/characters/inventory?selectedCharacterId=${selectedCharacterId}&key=${key}&currentUser=${currentUser}`
        );
      } catch (err) {
        console.error(err);
      }

      setUseItem(!useItem);

      /* --ENERGY POTION-- */
    } else if (!healAmount && recoverAmount) {
      const maxEnergyCheck =
        currentEnergy + recoverAmount > 100 ? 100 : recoverAmount;
      const newEnergy =
        maxEnergyCheck === 100 ? 100 : currentEnergy + recoverAmount;
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
          `${dbURI}/users/characters/inventory?selectedCharacterId=${selectedCharacterId}&key=${key}&currentUser=${currentUser}`
        );
      } catch (err) {
        console.error(err);
      }
      setUseItem(!useItem);

      /* --RESTORE POTION-- */
    } else if (healAmount && recoverAmount) {
      const maxEnergyCheck =
        currentEnergy + recoverAmount > 100 ? 100 : recoverAmount;
      const newEnergy =
        maxEnergyCheck === 100 ? 100 : currentEnergy + recoverAmount;
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
          `${dbURI}/users/characters/inventory?selectedCharacterId=${selectedCharacterId}&key=${key}&currentUser=${currentUser}`
        );
      } catch (err) {
        console.error(err);
      }
      const maxHealthCheck = playerHealth + healAmount > 100 ? 100 : healAmount;
      const newHealth =
        maxHealthCheck === 100 ? 100 : playerHealth + healAmount;
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
          `${dbURI}/users/characters/inventory?selectedCharacterId=${selectedCharacterId}&key=${key}&currentUser=${currentUser}`
        );
      } catch (err) {
        console.error(err);
      }
      setUseItem(!useItem);
    }
    setIsLoading(false);
    setTimeout(() => setShowModal(false), 200);
  };

  const checkGold = () => {
    if (currentGold < itemDetails.itemValue * quality) {
      setHasEnough(false);
    } else {
      setHasEnough(true);
    }
  };

  useEffect(() => {
    checkGold();
  }, [checkHasEnough]);

  useEffect(() => {
    setItemQuantity(1);
  }, []);

  const handleBuyItem = () => {
    setCheckHasEnough(!checkHasEnough);
    if (hasEnough) {
      buyItem(itemDetails);
      setEnoughGold(true);
      setShowModal(false);
    } else {
      setEnoughGold(false);
      // Show NotEnoughGoldModal
      setShowModal(true);
    }
  };
  const handleSellItem = () => {
    sellItem(itemDetails);
    setShowModal(false);
  };

  const handleAdjustQuanity = (value) => {
    if (itemQuantity + value > 0) {
      setItemQuantity(itemQuantity + value);
    }
  };

  return (
    <div className="item-detail-overlay">
      {!enoughGold && isSelling && (
        <NotEnoughGoldModal
          message={"Not enough gold"}
          setEnoughGold={setEnoughGold}
        />
      )}
      <div className="item-detail-modal">
        <div className="item-detail-header">
          <div className="item-detail-type-icon-container">
            <div className="item-detail-type">
              {type}
              <span>{`(${quality})`}</span>
            </div>
            <div className="item-detail-value">
              <div className="item-detail-value-icon-info-container">
                <GiTwoCoins className="item-detail-value-icon" />
                {`${itemValue * itemQuantity}`}
              </div>
            </div>
          </div>
        </div>
        <div className="item-detail-name" style={{ color: color }}>
          {itemName}
        </div>
        <div
          className="item-detail-content"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="item-detail-stats-container">
            {healAmount > 0 && (
              <div className="item-detail-stats-armor">
                {healAmount}
                <FaHeart className="item-detail-stats-icon" />
              </div>
            )}
            {recoverAmount > 0 && (
              <div className="item-detail-stats-dodge">
                {recoverAmount}
                <BsLightning className="item-detail-stats-icon" />
              </div>
            )}
          </div>
          <div className="item-detail-text-container">
            <div className="item-detail-info-container">
              <div className="item-detail-heal-amount">{description}</div>
            </div>
            <div className="item-detail-btn-placement" style={{flexDirection: isSelling ? 'flex' : 'column'}}>
              {!isSelling && (
                <div className="item-detail-quantity-container">
                  <GoTriangleDown
                    className="item-detail-quantity-up-btn"
                    style={{ transform: `rotate(90deg)` }}
                    onMouseDown={() => handleAdjustQuanity(-1)}
                  />
                  <div className="item-detail-current-quanitity">
                    {itemQuantity}
                  </div>
                  <GoTriangleDown
                    className="item-detail-quantity-up-btn"
                    style={{ transform: `rotate(-90deg)` }}
                    onMouseDown={() => handleAdjustQuanity(1)}
                  />
                </div>
              )}
              {isShop ? (
                <div className="item-detail-buy-sell-main-container">
                  {isSelling ? (
                    <div>
                      <button
                        className="item-detail-close-modal"
                        type="button"
                        onClick={() => handleSellItem()}
                      >
                        Sell
                      </button>
                    </div>
                  ) : (
                    <div className="item-detail-buy-container">
                      <button
                        className="item-detail-buy-modal"
                        type="button"
                        onClick={() => handleBuyItem()}
                      >
                        Buy
                      </button>
                    </div>
                  )}
                  <button
                    className="item-detail-close-modal"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                <button
                  className="item-detail-use-item"
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    handleUseItem(
                      playerHealth,
                      currentEnergy,
                      healAmount,
                      recoverAmount
                    )
                  }
                >
                  Use
                </button>
                <button
                  className="item-detail-close-modal"
                  type="button"
                  onClick={() => handleClose()}
                >
                  Close
                </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailConsumable;
