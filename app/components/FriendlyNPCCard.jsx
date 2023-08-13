"use client";
import React, { useState, useEffect } from "react";
import getShopKeeperImage from "../utils/getShopKeeperImage";
import "../stylesheets/FriendlyNPCCard.css";
import enemyRaceIcon from "../utils/enemyRaceIcon";

const FriendlyNPCCard = ({ characterRace, shopKeeper }) => {
  const { name, group, level, race } = shopKeeper;
  const shopKeeperCardImage = getShopKeeperImage(characterRace, race);
  const raceIcon = enemyRaceIcon(race);
  return (
    <div className="friendly-card-container">
      <div
        className="friendly-card-image"
        style={{
          backgroundImage: `url(${shopKeeperCardImage})`,
        }}
      >
        <div className="friendly-card-name-role-container">
          <h1 className="friendly-name">
            {name}
            <span className="friendly-level">Lvl: {level}</span>
          </h1>
          <div
            className="friendly-role-icon"
            style={{ backgroundImage: `url(${raceIcon})` }}
          />
        </div>
        <div className="friendly-image-footer-container">
          <h1 className="friendly-card-footer">{group}</h1>
        </div>
      </div>
    </div>
  );
};

export default FriendlyNPCCard;
