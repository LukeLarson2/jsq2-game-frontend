"use client";
import React, { useState, useEffect } from "react";

import CharacterCardEditEquipment from "./CharacterCardEditEquipment";
import CharacterCardEditAbilities from "./CharacterCardEditAbilities";
import CharacterCardEditCurrent from "./CharacterCardEditCurrent";
import getCharacterInfo from "../utils/getCharacterInfo";
import CharacterCardEditArmor from "./CharacterCardEditArmor";
import CharacterCardEditMainHand from "./CharacterCardEditMainHand";
import CharacterCardEditOffHand from "./CharacterCardEditOffHand";
import "../stylesheets/CharacterCardEdit.css";

const CharacterCardEdit = ({ setShowEdit, showEdit, currentUser, selectedCharacterId }) => {
  const [currentTab, setCurrentTab] = useState("Equipment");
  const [character, setCharacter] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const [activeBasic, setActiveBasic] = useState({});
  const [activePrimary, setActivePrimary] = useState({});
  const [activeSecondary, setActiveSecondary] = useState({});
  const [equippedGear, setEquippedGear] = useState({});
  const [inventory, setInventory] = useState([]);
  const [showTabContent, setShowTabContent] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [showArmor, setShowArmor] = useState(false);
  const [showMainHand, setShowMainHand] = useState(false);
  const [showOffHand, setShowOffHand] = useState(false);
  const [currentArmor, setCurrentArmor] = useState({});
  const [currentMainHand, setCurrentMainHand] = useState({});
  const [currentOffHand, setCurrentOffHand] = useState({});

  const handleOpenArmor = () => {
    setShowArmor(true);
  };
  const handleOpenMainHand = () => {
    setShowMainHand(true);
  };
  const handleOpenOffHand = () => {
    setShowOffHand(true);
  };

  useEffect(() => {
    const fetchItems = async () => {
      const characterInfo = await getCharacterInfo(currentUser, selectedCharacterId);
      setCharacter(characterInfo);
      setAbilities(characterInfo.abilities);
      setEquippedGear(characterInfo.equippedGear);
      setActiveBasic(characterInfo.activeAbilities.basic);
      setActivePrimary(characterInfo.activeAbilities.primary);
      setActiveSecondary(characterInfo.activeAbilities.secondary);
      setInventory(characterInfo.inventory);
      setCurrentArmor(characterInfo.equippedGear.armor);
      setCurrentMainHand(characterInfo.equippedGear.mainHand);
      setCurrentOffHand(characterInfo.equippedGear.offHand);
    };
    fetchItems();
  }, [showEdit]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!character) return <div>Loading...</div>;
  const mobileBreakpoint = 750;
  const betweenBreakpoint = 1000;
  const tabletBreakpoint = 1250;
  const desktopBreakpoint = 1600;

  const handleTabSelect = (option) => {
    if (currentTab === option) {
      setShowTabContent(!showTabContent); // Toggle the tab content visibility if the same tab is clicked
    } else {
      setShowTabContent(false); // Hide the tab content immediately
      setCurrentTab(option);
      setShowTabContent(true); // After a delay, switch the tab and show the tab content // Delay should match the transition duration in CSS
    }
  };

  const leftValueInactive = "100px";
  const leftValueActive = "780px";

  const handleCloseCharacterEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="character-card-edit-container">
      <div className="character-card-current">
        <CharacterCardEditCurrent
          character={character}
          setCharacter={setCharacter}
          activeBasic={activeBasic}
          activePrimary={activePrimary}
          activeSecondary={activeSecondary}
          currentArmor={currentArmor}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
        <CharacterCardEditAbilities
          leftValueActive={leftValueActive}
          leftValueInactive={leftValueInactive}
          handleTabSelect={handleTabSelect}
          abilities={abilities}
          activeBasic={activeBasic}
          setActiveBasic={setActiveBasic}
          activePrimary={activePrimary}
          setActivePrimary={setActivePrimary}
          activeSecondary={activeSecondary}
          setActiveSecondary={setActiveSecondary}
          currentTab={currentTab}
          character={character}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
        <CharacterCardEditEquipment
          leftValueActive={leftValueActive}
          leftValueInactive={leftValueInactive}
          handleTabSelect={handleTabSelect}
          currentTab={currentTab}
          character={character}
          handleOpenArmor={handleOpenArmor}
          handleOpenMainHand={handleOpenMainHand}
          handleOpenOffHand={handleOpenOffHand}
          equippedGear={equippedGear}
          currentArmor={currentArmor}
          setCurrentArmor={setCurrentArmor}
          setCurrentMainHand={setCurrentMainHand}
          currentMainHand={currentMainHand}
          setCurrentOffHand={setCurrentOffHand}
          currentOffHand={currentOffHand}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      </div>
      <button
        type="button"
        className="character-card-edit-btn"
        onClick={() => handleCloseCharacterEdit()}
      >
        Close
      </button>
      {showArmor && (
        <CharacterCardEditArmor
          setShowArmor={setShowArmor}
          inventory={inventory}
          roleColor={character.roleColor}
          _id={character._id}
          setCurrentArmor={setCurrentArmor}
          currentArmor={currentArmor}
          role={character.role}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      )}
      {showMainHand && (
        <CharacterCardEditMainHand
          setShowMainHand={setShowMainHand}
          inventory={inventory}
          roleColor={character.roleColor}
          _id={character._id}
          setCurrentMainHand={setCurrentMainHand}
          currentMainHand={currentMainHand}
          role={character.role}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      )}
      {showOffHand && (
        <CharacterCardEditOffHand
          setShowOffHand={setShowOffHand}
          inventory={inventory}
          roleColor={character.roleColor}
          _id={character._id}
          setCurrentOffHand={setCurrentOffHand}
          currentOffHand={currentOffHand}
          role={character.role}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      )}
    </div>
  );
};

export default CharacterCardEdit;
