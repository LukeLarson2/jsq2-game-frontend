"use client";
import React, { useState, useEffect } from "react";
import roleIconCheck from "../utils/roleIconCheck";
import AlertModal from "../components/AlertModal";

import {
  GiChest,
  GiBarbute,
  GiTwoCoins,
  GiFamilyTree,
  GiTreasureMap,
} from "react-icons/gi";

import { FaHome } from "react-icons/fa";

import "../stylesheets/CharacterBanner.css";

const CharacterBanner = ({
  character,
  currentLevel,
  xpPercentage,
  setShowEdit,
  showEdit,
  showInventory,
  setShowInventory,
  showBattle,
  isSkillTreeOpen,
  setIsSkillTreeOpen,
  setShowMap,
  setShowBattle,
  setCurrentIndex,
  currentArenaLevel,
  setInArena,
  lowRank,
  highRank,
  masterRank,
  championRank,
  setCurrentPage,
  currentUser,
  selectedCharacterId,
  setSelectedCharacterId,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [travelHome, setTravelHome] = useState(false);
  const [playerNameColor, setPlayerNameColor] = useState("");
  const {
    characterName,
    race,
    role,
    level,
    skillpoints,
    health,
    energy,
    wallet,
    arenaCount,
  } = character;

  const getNameColor = () => {
    let color = "white";
    if (lowRank) {
      color = "#cd7f32";
    }
    if (highRank) {
      color = "#808080";
    }
    if (masterRank) {
      color = "#d4af37";
    }
    if (championRank) {
      color = "#9d52ff";
    }
    return color;
  };

  useEffect(() => {
    setPlayerNameColor(getNameColor());
  }, [lowRank, highRank, masterRank, championRank]);

  const roleIcon = roleIconCheck(role);

  const handleOpenInventory = () => {
    setShowEdit(false);
    setIsSkillTreeOpen(false);
    setShowInventory(!showInventory);
  };
  const handleOpenSkillTree = () => {
    if (!showBattle) {
      setShowEdit(false);
      setShowInventory(false);
      setIsSkillTreeOpen(!isSkillTreeOpen);
    }
  };
  const handleOpenMap = () => {
    setShowEdit(false);
    setShowInventory(false);
    setIsSkillTreeOpen(false);
    setShowBattle(false);
    setShowMap(true);
    setCurrentIndex(0);
    setInArena(false);
  };
  const handleOpenCharacter = () => {
    if (!showBattle) {
      setShowInventory(false);
      setIsSkillTreeOpen(false);
      setShowEdit(!showEdit);
    }
  };
  const handleGoHome = () => {
    setShowAlert(true);
    setTravelHome(true)
  };

  return (
    <div className="character-banner-main-container">
      {showAlert && (
        <AlertModal
          message={"Are you sure you want to exit?"}
          setShowAlert={setShowAlert}
          mapFizzle={false}
          travelHome={travelHome}
          setCurrentPage={setCurrentPage}
          setSelectedCharacterId={setSelectedCharacterId}
        />
      )}
      <div className="character-banner-content">
        <div className="character-details-container">
          <div className="character-banner-role-icon-container">
            <div
              className="character-banner-role-icon"
              style={{
                backgroundImage: `url(${roleIcon})`,
                boxShadow:
                  playerNameColor !== "white"
                    ? `0px 0px 5px 5px ${playerNameColor}`
                    : "",
              }}
            />
          </div>
          <div className="character-banner-name-race-role-container">
            <div
              className="character-banner-name"
              style={{ color: playerNameColor }}
            >
              {characterName}
            </div>
            <div className="character-banner-role-race-container">
              {`${race} / ${role}`}
            </div>
            <div className="character-banner-level">{`Level ${currentLevel}`}</div>
            <div className="character-banner-level">{`Arena Rank ${currentArenaLevel}`}</div>
          </div>
        </div>
        <div className="character-banner-inventory-container">
          <div
            className="character-banner-inventory-icon"
            onClick={() => handleOpenInventory()}
          >
            <GiChest />
          </div>
          <div
            className="character-banner-inventory-icon"
            style={{ color: showBattle ? "#555" : "white" }}
            onClick={() => handleOpenCharacter()}
          >
            <GiBarbute />
          </div>
          <div
            className="character-banner-inventory-icon tree"
            style={{ color: showBattle ? "#555" : "white" }}
            onClick={() => handleOpenSkillTree()}
          >
            <GiFamilyTree />
          </div>
          <div
            className="character-banner-inventory-icon"
            onClick={() => handleOpenMap()}
          >
            <GiTreasureMap />
          </div>
          <div
            className="character-banner-inventory-icon"
            onClick={() => handleGoHome()}
          >
            <FaHome />
          </div>
        </div>
        <div className="character-banner-wallet-inventory-container">
          <div className="character-banner-wallet">
            <GiTwoCoins className="item-detail-value-icon" />
            {wallet}
          </div>
        </div>
      </div>
      <div className="character-banner-current-exp">
        <div className="xp-bar-container">
          <div className="xp-bar-text">
            <div className="xp-bar-current-level">{`Level ${level}`}</div>
            <div className="xp-bar-current-xp">{`${xpPercentage}%`}</div>
            <div className="xp-bar-next-level">{`Level ${level + 1}`}</div>
          </div>
          <div className="xp-bar" style={{ width: `${xpPercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default CharacterBanner;
