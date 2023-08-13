"use client";
import React from "react";
import "../stylesheets/AlertModal.css";
const NotEnoughGoldModal = ({ message, setEnoughGold }) => {
  const handleCloseAlert = () => {
    setEnoughGold(true);
  };
  return (
    <div className="alert-modal-overlay">
      <div className="alert-modal">
        <div className="alert-modal-content">
          <div className="alert-modal-header">Alert!</div>
          <div className="alert-modal-message">{message}</div>
          <button
            type="button"
            className="alert-modal-btn"
            onClick={() => handleCloseAlert()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotEnoughGoldModal;
