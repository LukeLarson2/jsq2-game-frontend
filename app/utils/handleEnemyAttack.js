"use client";
import React, { useState, useEffect } from "react";
import damageCalc from "../utils/damageCalc";
import axios from "axios";
import dbURI from '../lib/dbURI'

const handleEnemyAttack = async (
  user,
  damageToNum,
  mainHand,
  offHand,
  armor,
  currentEnemy,
  character,
  setCurrentEnemyAttack,
  setEnemyIsAttacking,
  setPlayerHealth,
  setTakeHit,
  takeHit,
  setPlayerDamageTaken,
  handleHit,
  setPlayerDamageDisplayed,
  setDisplayedDamage,
  triggerQuote,
  setGoldLoss,
  updateCharacter,
  setShowDeath,
  setCurrentIndex,
  playerHealth,
  currentGold,
  currentUser,
  selectedCharacterId,
  setPlayerDeath,
  setPlayerIsHit
) => {
  // define the fetch request to get current hp of player
  const getPlayerHealth = async (
    currentUser,
    selectedCharacterId,
    setPlayerHealth
  ) => {
    try {
      const response = await axios.post(
        `${dbURI}/users/characters/health`,
        {
          selectedCharacterId,
          currentUser,
        }
      );
      const playerHealth = response.data;

      if (!playerHealth) {
        console.error("Character not found");
        return null;
      }
      return playerHealth;
    } catch (error) {
      console.error(
        `Error occurred while getting character information: ${error}`
      );
      return null;
    }
  };

  // await the current hp of player and assign it to current value
  const currentHP = await getPlayerHealth(
    currentUser,
    selectedCharacterId,
    setPlayerHealth
  );
  // generate random enemy attack index value
  const randomEnemyAttack = Math.floor(
    Math.random() * currentEnemy.attacks.length
  );

  // generate random enemy attack
  const enemyAttack = currentEnemy.attacks[randomEnemyAttack];
  // set current enemy attack and enemy attacking values
  setCurrentEnemyAttack(enemyAttack);
  setEnemyIsAttacking(true);

  // calculate outgoing damage from enemy
  const outgoingDamage = damageCalc(
    user,
    damageToNum,
    mainHand,
    offHand,
    armor,
    enemyAttack.minDamage,
    enemyAttack.maxDamage,
    enemyAttack.accuracy,
    currentEnemy
  );
  // calculate damage to player and get player Id
  const damageToPlayer = currentHP.health - Number.parseInt(outgoingDamage);
  // update current user hp on server
  try {
    await axios.put(`${dbURI}/users/characters/health`, {
      selectedCharacterId, // Using selectedCharacterId instead of character._id
      health: damageToPlayer,
      currentUser,
    });
  } catch (error) {
    console.error("Error:", error);
  }
  // check for current hp below 0
  if (currentHP < 1) {
    setPlayerDeath(true);
    return;
  }

  // set current hp displayed and invert take hit
  setPlayerHealth(damageToPlayer);
  setTakeHit(!takeHit);

  // set the value to be displayed of damage received
  setPlayerDamageTaken(Number.parseInt(outgoingDamage));

  // handle the hit animation
  handleHit("enemy", Number.parseInt(outgoingDamage));

  // display damage and set its value
  setPlayerDamageDisplayed(true);
  setPlayerIsHit(true);
  setDisplayedDamage(
    Number.parseInt(outgoingDamage) < 1
      ? "Miss"
      : `- ${Number.parseInt(outgoingDamage)}`
  );

  // grab random enemy quote
  triggerQuote(damageToPlayer < 1 ? "failedQuotes" : "attackQuotes");
  setTimeout(() => {
    setPlayerDamageDisplayed(false);
  }, 1800);

  // Additional check for player's health
  if (damageToPlayer <= 0) {
    const goldLoss = Math.floor(currentGold * 0.1);
    setGoldLoss(goldLoss);
    updateCharacter(character._id, {
      wallet: currentGold - goldLoss,
    });
    setShowDeath(true);
    setCurrentIndex(0);
    return;
  }
};

export default handleEnemyAttack;
