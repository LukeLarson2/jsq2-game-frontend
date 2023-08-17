"use client";
import React, { useState, useEffect } from "react";
import itemQualityCheck from "../utils/itemQualityCheck";
import itemImageCheck from "../utils/itemImageCheck";
import NotEnoughGoldModal from "../components/NotEnoughGoldModal";
import {
  GiShield,
  GiTwoCoins,
  GiOverhead,
  GiShieldReflect,
  GiMineExplosion,
} from "react-icons/gi";
import { SiTarget } from "react-icons/si";

const ItemDetailWeapon = ({
  itemDetails,
  setShowModal,
  equippedGear,
  isShop,
  isSelling,
  sellItem,
  buyItem,
  enoughGold,
  setEnoughGold,
  currentGold,
}) => {
  const [hasEnough, setHasEnough] = useState(true);
  const [checkHasEnough, setCheckHasEnough] = useState(true);
  const {
    itemName,
    type,
    description,
    itemValue,
    quality,
    key,
    usedByRoles,
    damage,
    accuracy,
    slot,
    shielding,
  } = itemDetails;
  const usedBy = usedByRoles[0];
  const imageUrl = itemImageCheck(itemName);
  const color = itemQualityCheck(quality);
  const handleClose = () => {
    setShowModal(false);
  };

  const handleSellItem = () => {
    sellItem(itemDetails);
    setShowModal(false);
  };

  const checkGold = () => {
    if (currentGold < itemDetails.itemValue) {
      setHasEnough(false);
    } else {
      setHasEnough(true);
    }
  };
  useEffect(() => {
    checkGold();
  }, [checkHasEnough]);

  const handleBuyItem = () => {
    setCheckHasEnough(!checkHasEnough);
    checkGold();
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
  const isNotEquipped =
    equippedGear.mainHand.key !== key && equippedGear.offHand.key !== key;
  return (
    <div className="item-detail-overlay">
      {!enoughGold && isShop && (
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
              <span>{`(${usedBy})`}</span>
            </div>
            <div className="item-detail-value">
              <div className="item-detail-value-icon-info-container">
                <GiTwoCoins className="item-detail-value-icon" />
                {itemValue}
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
            {damage ? (
              <>
                <div className="item-detail-stats-armor">
                  {damage}
                  <GiMineExplosion className="item-detail-stats-icon"/>
                </div>
                {slot !== "Off Hand" && (
                  <div className="item-detail-stats-dodge">
                    {accuracy}
                    <SiTarget className="item-detail-stats-icon"/>
                  </div>
                )}
              </>
            ) : (
              <div className="item-detail-stats-armor">
                {shielding}
                <GiShield />
              </div>
            )}
          </div>
          <div className="item-detail-text-container">
            <div className="item-detail-info-container">
              <div className="item-detail-heal-amount">{description}</div>
            </div>
            <div className="item-detail-btn-placement">
              {isShop && isNotEquipped && (
                <div>
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
                    <div>
                      <button
                        className="item-detail-buy-modal"
                        type="button"
                        onClick={() => handleBuyItem()}
                      >
                        Buy
                      </button>
                    </div>
                  )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailWeapon;
