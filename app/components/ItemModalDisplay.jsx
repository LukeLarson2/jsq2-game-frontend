"use client";
import React from "react";
import ItemDetailConsumable from "./ItemDetailConsumable";
import ItemDetailWeapon from "./ItemDetailWeapon";
import ItemDetailMisc from "./ItemDetailMisc";
import ItemDetailArmor from "./ItemDetailArmor";
import "../stylesheets/ItemModalDisplay.css";
import itemIconCheck from "../utils/itemIconCheck";

const ItemModalDisplay = ({
  itemDetails,
  setShowModal,
  playerHealth,
  currentEnergy,
  setPlayerHealth,
  setCurrentEnergy,
  _id,
  useItem,
  setUseItem,
  isShop,
  isSelling,
  sellItem,
  buyItem,
  isLoading,
  setIsLoading,
  setItemHealAmount,
  equippedGear,
  enoughGold,
  setEnoughGold,
  currentGold,
  currentUser,
  selectedCharacterId,
  itemQuantity,
  setItemQuantity,
}) => {
  const { type } = itemDetails;
  const itemIcon = itemIconCheck(type);
  switch (type) {
    case "Potion": {
      return (
        <ItemDetailConsumable
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          playerHealth={playerHealth}
          currentEnergy={currentEnergy}
          setPlayerHealth={setPlayerHealth}
          setCurrentEnergy={setCurrentEnergy}
          _id={_id}
          useItem={useItem}
          setUseItem={setUseItem}
          isShop={isShop}
          isSelling={isSelling}
          sellItem={sellItem}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setItemHealAmount={setItemHealAmount}
          buyItem={buyItem}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
          itemQuantity={itemQuantity}
          setItemQuantity={setItemQuantity}
        />
      );
    }
    case "Food": {
      return (
        <ItemDetailConsumable
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          playerHealth={playerHealth}
          currentEnergy={currentEnergy}
          setPlayerHealth={setPlayerHealth}
          setCurrentEnergy={setCurrentEnergy}
          _id={_id}
          useItem={useItem}
          setUseItem={setUseItem}
          isShop={isShop}
          isSelling={isSelling}
          sellItem={sellItem}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setItemHealAmount={setItemHealAmount}
          buyItem={buyItem}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
          itemQuantity={itemQuantity}
          setItemQuantity={setItemQuantity}
        />
      );
    }
    case "Weapon": {
      return (
        <ItemDetailWeapon
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          isShop={isShop}
          isSelling={isSelling}
          _id={_id}
          sellItem={sellItem}
          isLoading={isLoading}
          equippedGear={equippedGear}
          buyItem={buyItem}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      );
    }
    case "Misc": {
      return (
        <ItemDetailMisc
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          isShop={isShop}
          isSelling={isSelling}
          _id={_id}
          sellItem={sellItem}
          isLoading={isLoading}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      );
    }
    case "Clothing": {
      return (
        <ItemDetailMisc
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          isShop={isShop}
          isSelling={isSelling}
          _id={_id}
          sellItem={sellItem}
          isLoading={isLoading}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      );
    }
    case "Shield": {
      return (
        <ItemDetailArmor
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          isShop={isShop}
          isSelling={isSelling}
          _id={_id}
          sellItem={sellItem}
          isLoading={isLoading}
          equippedGear={equippedGear}
          buyItem={buyItem}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      );
    }
    case "Armor": {
      return (
        <ItemDetailArmor
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          isShop={isShop}
          isSelling={isSelling}
          _id={_id}
          sellItem={sellItem}
          isLoading={isLoading}
          equippedGear={equippedGear}
          buyItem={buyItem}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      );
    }
    case "Book": {
      return (
        <ItemDetailWeapon
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          isShop={isShop}
          isSelling={isSelling}
          _id={_id}
          sellItem={sellItem}
          isLoading={isLoading}
          equippedGear={equippedGear}
          buyItem={buyItem}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      );
    }
    case "Orb": {
      return (
        <ItemDetailWeapon
          itemDetails={itemDetails}
          setShowModal={setShowModal}
          itemIcon={itemIcon}
          isShop={isShop}
          isSelling={isSelling}
          _id={_id}
          sellItem={sellItem}
          isLoading={isLoading}
          equippedGear={equippedGear}
          buyItem={buyItem}
          enoughGold={enoughGold}
          setEnoughGold={setEnoughGold}
          currentGold={currentGold}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      );
    }
    default:
      return null;
  }
};

export default ItemModalDisplay;
