"use client";
import React from "react";
import "../stylesheets/EndGameModal.css";
const Credits = ({ setShowCredits }) => {
  const handleCloseCredits = () => {
    setShowCredits(false);
  };

  const javascriptURL = './javascript-logo.png'
  const cssURL = './css-logo.png'
  const nodeURL = './nodejs-logo.png'
  const nextJsURL = './next-logo.png'
  const reactURL = './react-logo.png'
  const mongoURL = './mongodb-logo.png'
  const stripeURL = './stripe-logo.png'
  const axiosURL = './axios.png'
  const expressURL = './express-logo.png'
  const vscodeURL = './visual-studio-code-logo.png'
  const githubURL = './github-logo.png'
  const linkedinURL = './linkedin-logo.png'

  return (
    <div className="end-game-modal-overlay">
      <div className="end-game-modal-credits">
        <div className="end-game-modal-content">
          <div className="end-game-modal-header">Credits</div>
          <div className="end-game-modal-message-a">
            Lead Developer/Production Lead
          </div>
          <div className="end-game-modal-message-c">
            Luke Larson
          </div>
          <div className="end-game-modal-message-a">
            Story
          </div>
          <div className="end-game-modal-message-c">
            OpenAI (chatgpt-3.5-turbo)
          </div>
          <div className="end-game-modal-message-a">
            Art
          </div>
          <div className="end-game-modal-message-c">
            Midjourney AI Art
          </div>
          <div className="end-game-modal-message-champion">
            <div className="end-game-modal-message-d">
              Libraries and Frameworks
            </div>
            <div className="end-game-logo-group">
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${vscodeURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${nextJsURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${reactURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${javascriptURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${cssURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${nodeURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${expressURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${axiosURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${mongoURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${stripeURL})`}}/>
            <div className="end-game-modal-message-logo" style={{backgroundImage: `url(${githubURL})`}}/>
            </div>
          </div>
          <div className="end-game-link-group">
            <div className="end-game-modal-message-d">
              Developer Links
            </div>
          <a className="link-to-linkedin" href="https://www.linkedin.com/in/lucas-larson-6a4bb799/" target="_blank" rel="noopener noreferrer" style={{backgroundImage: `url(${linkedinURL})`}} />
          <a className="end-game-modal-message-logo" href="https://github.com/LukeLarson2" target="_blank" rel="noopener noreferrer" style={{backgroundImage: `url(${githubURL})`}} />
          </div>
          <button
            type="button"
            className="end-game-modal-btn"
            onClick={() => handleCloseCredits()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Credits;
