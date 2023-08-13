"use client";
import React from "react";
import "../stylesheets/EndGameModal.css";
const EndGameModal = ({ character, setDisplayEndGameModal, setShowCredits }) => {
  const { characterName, level, arenaCount, role, race, roleColor } = character;

  const handleCloseEndGameModal = () => {
    setDisplayEndGameModal(false);
    setShowCredits(true)
  };

  return (
    <div className="end-game-modal-overlay">
      <div className="end-game-modal">
        <div className="end-game-modal-content">
          <div className="end-game-modal-header">{`Glorious Victory ${characterName}!`}</div>
          <div className="end-game-modal-message-a">
            You have triumphed over the treacherous paths and conquered
          </div>
          <div className="end-game-modal-message-game-name">
          JS Quest
            2 - The Next Level!
          </div>
          <div className="end-game-modal-message-b">
            {`Your bravery and skill have brought you to this monumental
            achievement. We salute you, gallant ${role}!`}
          </div>
          {arenaCount < 33 ? (
            <div className="end-game-modal-message-champion">
              <div className="end-game-modal-message-c">
                Yet the saga of Pan Strane is far from over. Endless unique
                adventures still beckon in the uncharted realms!
              </div>
              <div className="end-game-modal-message-c"><b>{`Your current Arena Rank is ${arenaCount}`}</b></div>
              <div className="end-game-modal-message-c">
                The challenge is laid before you. Will you rise to face it and
                etch your name in the annals of history and become champion?
              </div>
            </div>
          ) : (
            <div className="end-game-modal-message-champion">
              <div className="end-game-modal-message-c"><b>{`Your current Arena Rank is ${arenaCount}`}</b></div>
              <div className="end-game-modal-message-c">
                Congratulations Champion! The land of Pan Strane is finally at
                peace thanks to you!
              </div>
            </div>
          )}

          <button
            type="button"
            className="end-game-modal-btn"
            onClick={() => handleCloseEndGameModal()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndGameModal;
