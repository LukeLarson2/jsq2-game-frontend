"use client";
import React from "react";
import "../stylesheets/AlertModal.css";
import axios from "axios";
import dbURI from "../lib/dbURI";
const AlertModal = ({
  pageUrl,
  title,
  message,
  setShowAlert,
  mapFizzle,
  setMapFizzle,
  travelHome,
  setCurrentPage,
  confirmDelete,
  character,
  setIsLoading,
  setCharacters,
  setUser,
  setUsedSlots,
  setMaxSlots,
  currentUser,
  needMoreStones,
  setNeedMoreStones,
  setSelectedCharacterId,
  selectedRegion,
  forgetStory,
}) => {
  const handleCloseAlert = () => {
    if (needMoreStones) {
      setNeedMoreStones(false);
    }
    if (mapFizzle === true) {
      setMapFizzle(false);
    } else {
      setShowAlert(false);
      if (pageUrl) {
        setCurrentPage(pageUrl);
      }
    }
  };

  const handleGoHome = () => {
    setShowAlert(false);
    setSelectedCharacterId("");
    localStorage.removeItem("characterData");
    window.close();
  };

  const handleDeleteCharacter = async (character) => {
    const id = character._id;
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${dbURI}/users/delete-characters/${id}`,
        {
          headers: { Authorization: `Bearer ${currentUser}` },
        }
      );

      if (response.status === 200) {
        setCharacters(response.data.characters);
        setUser(response.data);
        setUsedSlots(response.data.characters.length);
        setMaxSlots(response.data.maxSlots);
      }
    } catch (error) {
      console.log(error);
    }
    setShowAlert(false);
    setIsLoading(false);
  };

  const handleGetStones = () => {
    setCurrentPage("Mythstones");
  };

  const formatContentDetails = () => {
    const formattedContent = message.replace(/\.\s+/g, ".<br><br>");
    return { __html: formattedContent };
  };

  const handleForgetRegion = async () => {

    try {
      const response = await axios.put(`${dbURI}/users/characters/forget-region`, {
        selectedCharacterId,
        selectedRegion,
        currentUser,
      });

      if (response.status !== 200) {
        console.error("An error occurred", response.data.message);
        return;
      }

      setShowAlert(false); // Close the alert modal
    } catch (err) {
      console.error("An error occurred", err);
    }
    setShowAlert(false)
  };



  return (
    <div className="alert-modal-overlay">
      <div className="alert-modal">
        <div className="alert-modal-content">
          <div className="alert-modal-header">{title ? title : "Alert!"}</div>
          <div
            className="alert-modal-message"
            dangerouslySetInnerHTML={formatContentDetails()}
          />
          {travelHome || confirmDelete || needMoreStones || forgetStory ? (
            <div className="alert-modal-confirm-travel">
              {confirmDelete && (
                <button
                  type="button"
                  className="alert-modal-btn-yes"
                  onClick={() => handleDeleteCharacter(character)}
                >
                  Yes
                </button>
              )}
              {travelHome && (
                <button
                  type="button"
                  className="alert-modal-btn-yes"
                  onClick={() => handleGoHome()}
                >
                  Yes
                </button>
              )}
              {needMoreStones && (
                <button
                  type="button"
                  className="alert-modal-btn-yes"
                  onClick={() => handleGetStones()}
                >
                  Yes
                </button>
              )}
              {forgetStory && (
                <button
                  type="button"
                  className="alert-modal-btn-yes"
                  onClick={() => handleForgetRegion()}
                >
                  Yes
                </button>
              )}
              <button
                type="button"
                className="alert-modal-btn-no"
                onClick={() => handleCloseAlert()}
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="alert-modal-btn"
              onClick={() => handleCloseAlert()}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
