"use client";
import React, { useEffect } from "react";
import axios from "axios";
import "../stylesheets/VictoryModal.css";
import Confetti from "react-dom-confetti";
import dbURI from '../lib/dbURI'

const VictoryModal = ({
  currentEnemy,
  character,
  setShowVictory,
  showVictory,
  setShowStory,
  setShowBattle,
  currentIndex,
  setCurrentIndex,
  setArea,
  setRace,
  setLevel,
  earnedXp,
  setEarnedXp,
  currentUser,
  selectedCharacterId
}) => {
  const { name, xpEarned, goldEarned } = currentEnemy;

  const config = {
    angle: "90",
    spread: "360",
    startVelocity: "26",
    elementCount: "77",
    dragFriction: "0.17",
    duration: "1560",
    stagger: 3,
    width: "6px",
    height: "6px",
    perspective: "360px",
    colors: ["#eede00", "#ffffff"],
  };

  useEffect(() => {
    setEarnedXp(!earnedXp);
  }, []);

  const handleConfirm = async (exp, gold) => {

    try {
      const responseXp = await axios.put(`${dbURI}/users/characters/exp`, {
        selectedCharacterId,
        exp,
        currentUser
      });
      character.exp = responseXp.data.exp;
      const responseGold = await axios.put(`${dbURI}/users/characters/gold`, {
        selectedCharacterId,
        gold,
        currentUser
      });
      character.wallet = responseGold.data.gold; // Update as per your client-side structure
    } catch (err) {
      console.error(err);
    }
    setArea("");
    setRace("");
    setLevel(0);
    setCurrentIndex(currentIndex + 2);
    setShowBattle(false);
    setShowVictory(false);
    setShowStory(true);
}
  return (
    <div className="battle-victory-overlay">
      <div className="battle-victory-modal">
        <div className="battle-victory-content">
          <Confetti active={earnedXp} config={config} className="confetti" />
          <div className="battle-victory-title">VICTORY!</div>
          <div className="battle-victory-enemy-name-message">
            You defeated the {name}!
          </div>
          <div className="battle-victory-enemy-xp-message">
            You earned {xpEarned} experience and {goldEarned} gold!
          </div>
          <button
            type="button"
            className="battle-victory-btn"
            onClick={() => handleConfirm(xpEarned, goldEarned)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
