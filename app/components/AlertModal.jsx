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
  setConfirmedDelete,
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
  confirmedSellAll,
  sellAllQuality,
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
    document.cookie = `currentUser=; domain=.up.railway.app; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `selectedCharacterId=; domain=.up.railway.app; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
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

  const handleConfirmedSellAll = () => {
    setShowAlert(false)
    confirmedSellAll(sellAllQuality)
  }

  return (
    <div className="alert-modal-overlay">
      <div className="alert-modal">
        <div className="alert-modal-content">
          <div className="alert-modal-header">{title ? title : "Alert!"}</div>
          <div
            className="alert-modal-message"
            dangerouslySetInnerHTML={formatContentDetails()}
          />
          {travelHome || confirmDelete || needMoreStones || sellAllQuality ? (
            <div className="alert-modal-confirm-travel">
              {sellAllQuality && (
                <button
                  type="button"
                  className="alert-modal-btn-yes"
                  onClick={() => handleConfirmedSellAll()}
                >
                  Yes
                </button>
              )}
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
