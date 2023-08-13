"use client";
import React from "react";
import { GiTwoCoins } from "react-icons/gi";
import "../stylesheets/DeathModal.css";

const DeathModal = ({
  currentEnemyName,
  setShowMap,
  setShowDeath,
  setShowStory,
  setShowBattle,
  setCurrentIndex,
  goldLoss,
  fullHealth,
  fullEnergy,
  currentUser,
  selectedCharacterId
}) => {
  const handleCloseDeath = () => {
    setCurrentIndex(0);
    setShowDeath(false);
    setShowStory(false);
    setShowBattle(false);
    fullEnergy(currentUser, selectedCharacterId);
    fullHealth(currentUser, selectedCharacterId);
    setShowMap(true);
  };
  return (
    <div className="death-modal-overlay">
      <div
        className="death-modal"
        style={{ backgroundImage: `url("./death_image.png")` }}
      >
        <div className="death-modal-header">Defeat!</div>
        <div className="death-modal-content">
          <div className="death-modal-message-1">{`You have been defeated by the ${currentEnemyName}`}</div>
          <div className="death-modal-message-2">
            The map takes you to a safe location and heals your wounds
          </div>
          <div className="death-modal-message-3">
            The {currentEnemyName} stole {goldLoss}
            <GiTwoCoins className="death-gold-loss-value-icon" /> before your
            escape!
          </div>
        </div>
        <button
          type="button"
          className="death-modal-btn"
          onClick={() => handleCloseDeath()}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeathModal;
