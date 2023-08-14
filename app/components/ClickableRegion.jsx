"use client";
import React, { useState, useEffect } from "react";
import storyGPTPrompt from "../lib/storyGPTPrompt";
import AlertModal from "../components/AlertModal";
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
  setSelectedRegion,
  addStoryDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStory, setNewStory] = useState(true);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const loadingMessages = [
    "Initializing the arcane sequence",
    "Channeling the mystical energies",
    "Conjuring the teleportation circle",
    "Aligning the spatial coordinates",
    "Casting the teleportation spell",
    "Stabilizing the magical flux",
    "Finalizing the ethereal journey",
  ];

  const handleForgetStory = () => {
    setShowConfirmDelete(true);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setStoryPromptResult(storyGPTPrompt(name, regionId));
    setSelectedRegion(regionId);
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
  return (
    <div>
      {showConfirmDelete && (
        <AlertModal
          message={`Are you sure you want to forget the story for ${region}? It will cost you 10 Mythstones.`}
          setShowAlert={setShowConfirmDelete}
          title="Forget Story"
          forgetStory={true}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
          selectedRegion={regionId}
        />
      )}
      {isModalOpen && (
        <div className="player-ingame-map-confirm-travel-overlay">
          <div className="player-ingame-map-confirm-travel-modal">
            {!isLoading ? (
              <div>
                <p className="player-ingame-map-confirm-travel-text">
                  Would you like to travel to {region}?
                </p>
                <p className="player-ingame-map-confirm-travel-text">
                  {`(Recommended level ${regionLevel})`}
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
                  {addStoryDelete && (
                    <button
                      className="player-ingame-map-forget-btn"
                      onClick={() => handleForgetStory()}
                    >
                      Forget Story
                    </button>
                  )}
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
        id={value}
        style={{
          backgroundColor:
            characterLevel >= regionLevel ? "#20e9a65e" : "#e94f205e",
          border:
            characterLevel >= regionLevel
              ? "2px solid #20e9a6ea"
              : "2px solid #e94f20ea",
        }}
      >
        <div className="player-ingame-map-clickable-area" />
        <div
          className="player-ingame-map-area-name"
          onClick={() => handleClick()}
        >
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
