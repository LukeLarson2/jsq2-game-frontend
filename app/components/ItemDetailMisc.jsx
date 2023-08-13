"use client";
import axios from "axios";
import React from "react";
import itemQualityCheck from "../utils/itemQualityCheck";
import itemImageCheck from "../utils/itemImageCheck";
import { GiTwoCoins } from "react-icons/gi";

const ItemDetailMisc = ({
  itemDetails,
  setShowModal,
  isShop,
  isSelling,
  _id,
  sellItem,
  isLoading,
}) => {
  const { itemName, type, description, itemValue, quality } = itemDetails;

  const imageUrl = itemImageCheck(itemName);
  const color = itemQualityCheck(quality);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleSellItem = () => {
    sellItem(itemDetails);
    setShowModal(false);
  };

  return (
    <div className="item-detail-overlay">
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
          <div className="item-detail-text-container">
            <div className="item-detail-info-container">
              <div className="item-detail-heal-amount">{description}</div>
            </div>
            <div className="item-detail-btn-placement">
              {isShop && isSelling && (
                <button
                  className="item-detail-close-modal"
                  type="button"
                  onClick={() => handleSellItem()} // try replacing onClick with onMouseDown
                >
                  Sell
                </button>
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

export default ItemDetailMisc;
