"use client";
import React, { useState, useEffect } from "react";
import storyGPTPrompt from "../lib/storyGPTPrompt";
import "../stylesheets/ClickableRegion.css";

const ClickableRegion = ({
  value,
  region,
  regionId,
  isLoading,
  confirmTravel,
  setStoryPromptResult,
  name,
  characterLevel,
  regionLevel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStory, setNewStory] = useState(true);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const loadingMessages = [
    "Initializing the arcane sequence",
    "Channeling the mystical energies",
    "Conjuring the teleportation circle",
    "Aligning the spatial coordinates",
    "Casting the teleportation spell",
    "Stabilizing the magical flux",
    "Finalizing the ethereal journey",
  ];

  useEffect(() => {
    setStoryPromptResult(storyGPTPrompt(name, regionId));
  }, [isModalOpen, newStory]);

  useEffect(() => {
    setNewStory(!newStory);
    setStoryPromptResult(storyGPTPrompt(name, regionId));
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessageIndex(
          (prevIndex) => (prevIndex + 1) % loadingMessages.length
        );
      }, 4500);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleClick = () => {
    setStoryPromptResult(storyGPTPrompt(name, regionId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let backgroundColor, borderColor;

  if (characterLevel >= regionLevel) {
    backgroundColor = "#20e9a65e";
    borderColor = "2px solid #20e9a6ea";
  } else if (characterLevel >= regionLevel - 5) {
    backgroundColor = "#fffc685e"; // Yellow tint
    borderColor = "2px solid #fffc68ea"; // Yellow tint
  } else {
    backgroundColor = "#e94f205e";
    borderColor = "2px solid #e94f20ea";
  }
  return (
    <div>
      {isModalOpen && (
        <div className="player-ingame-map-confirm-travel-overlay">
          <div className="player-ingame-map-confirm-travel-modal">
            {!isLoading ? (
              <div>
                <p className="player-ingame-map-confirm-travel-text">
                  Would you like to travel to {region}?
                </p>
                <div className="player-ingame-map-confirm-btn-placement">
                  <button
                    className="player-ingame-map-confirm-btn"
                    onClick={() => {
                      confirmTravel(regionId);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="player-ingame-map-cancel-btn"
                    onClick={() => closeModal()}
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <div className="player-ingame-map-traveling">
                <p className="player-ingame-map-confirm-travel-text">
                  {loadingMessages[loadingMessageIndex]}
                </p>
                {isLoading && (
                  <div className="spinner-container">
                    <div className="spinner a">
                      <div className="spinner b">
                        <div className="spinner c">
                          <div className="spinner d">
                            <div className="spinner e">
                              <div className="spinner f"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div
        className="player-ingame-map-area"
        onClick={() => handleClick()}
        id={value}
        style={{
          backgroundColor: backgroundColor,
          border: borderColor,
        }}
      >
        <div className="player-ingame-map-clickable-area" />
        <div className="player-ingame-map-area-name">
          <div className="region-info-text">
            <div className="region-info-name">{region}</div>
            <div className="region-info-level">Level {regionLevel}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickableRegion;
