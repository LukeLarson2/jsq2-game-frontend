"use client";
import React, { useEffect, useState } from "react";
import getBagItems from "../utils/getBagItems";
import itemQualityCheck from "../utils/itemQualityCheck";
import itemIconCheck from "../utils/itemIconCheck";
import itemImageCheck from "../utils/itemImageCheck";
import ItemModalDisplay from "./ItemModalDisplay";
import "../stylesheets/Bag.css";

const Bag = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  useEffect(() => {
    const fetchItems = async () => {
      const items = await getBagItems();
      setItems(items);
    };

    fetchItems();
  }, []);

  const handleClick = (item) => {
    setShowModal(true);
    setItemDetails(item);
  };
  return (
    <div className="player-bag-overlay">
      <div className="player-bag-modal">
        <div className="player-bag-content">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => {
              const { itemName, quality, _id, type } = item;
              const icon = itemIconCheck(type);
              const color = itemQualityCheck(quality);
              const image = itemImageCheck(itemName);
              return (
                <div
                  key={_id}
                  className="player-bag-item-info"
                  onClick={() => handleClick(item)}
                  style={{ backgroundColor: color }}
                >
                  <div
                    className="player-bag-item-image"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <span className="player-bag-item-icon">{icon}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      {showModal && (
        <ItemModalDisplay
          itemDetails={itemDetails}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Bag;
