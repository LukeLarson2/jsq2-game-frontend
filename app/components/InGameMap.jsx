'use client';
import React, { useState } from "react";
import ClickableRegion from "./ClickableRegion";

import "../stylesheets/InGameMap.css";

const InGameMap = ({
  confirmTravel,
  isLoading,
  setStoryPromptResult,
  name,
  characterLevel,
}) => {
  return (
    <div
      className="player-ingame-map-overlay"
      style={{ backgroundImage: "url(./map_modal_overlay.png)" }}
    >
      <div className="player-ingame-map-content">
        <div className="player-ingame-map">
          <ClickableRegion
            value="beach"
            region="Desolate Beach"
            regionId="desolateBeach"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={1}
          />
          <ClickableRegion
            value="southern-gateway"
            region="Southern Gateway"
            regionId="southernGateway"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={1}
          />
          <ClickableRegion
            value="traders-crossroads"
            region="Trader's Crossroads"
            regionId="tradersCrossroads"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={1}
          />
          <ClickableRegion
            value="golden-ruins"
            region="Golden Ruins"
            regionId="goldenRuins"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={1}
          />
          <ClickableRegion
            value="southern-forest"
            region="Southern Forest"
            regionId="southernForest"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={5}
          />
          <ClickableRegion
            value="eastern-desert"
            region="Eastern Desert"
            regionId="easternDesert"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={5}
          />
          <ClickableRegion
            value="bartus-village"
            region="Bartus Village"
            regionId="bartusVillage"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={12}
          />
          <ClickableRegion
            value="tellet-lake"
            region="Tellet Lake"
            regionId="telletLake"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={13}
          />
          <ClickableRegion
            value="blackspine-peaks"
            region="Blackspine Peaks"
            regionId="blackspinePeaks"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={15}
          />
          <ClickableRegion
            value="shrouded-hollow"
            region="Shrouded Hollow"
            regionId="shroudedHollow"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={13}
          />
          <ClickableRegion
            value="dragons-tear-river"
            region="Dragon's Tear River"
            regionId="dragonsTearRiver"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={17}
          />
          <ClickableRegion
            value="murkwood-marsh"
            region="Murkwood Marsh"
            regionId="murkwoodMarsh"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={17}
          />
          <ClickableRegion
            value="dragons-descent-temple"
            region="Dragon's Descent Temple"
            regionId="dragonsDescentTemple"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={1}
          />
          <ClickableRegion
            value="dunes-of-the-damned"
            region="Dunes of the Damned"
            regionId="dunesOfTheDamned"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={20}
          />
          <ClickableRegion
            value="forgotten-forest"
            region="Forgotten Forest"
            regionId="forgottenForest"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={18}
          />
          <ClickableRegion
            value="verdantis"
            region="Verdantis"
            regionId="verdantis"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={1}
          />
          <ClickableRegion
            value="anvilorn"
            region="Anvilorn"
            regionId="anvilorn"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={1}
          />
          <ClickableRegion
            value="eldoria"
            region="Eldoria"
            regionId="eldoria"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={25}
          />
          <ClickableRegion
            value="northrend-ascent"
            region="Northrend Ascent"
            regionId="northrendAscent"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={15}
          />
          <ClickableRegion
            value="pan-strane-arena"
            region="Pan Strane Arena"
            regionId="panStraneArena"
            isLoading={isLoading}
            confirmTravel={confirmTravel}
            setStoryPromptResult={setStoryPromptResult}
            name={name}
            characterLevel={characterLevel}
            regionLevel={1}
          />
        </div>
      </div>
    </div>
  );
};

export default InGameMap;
