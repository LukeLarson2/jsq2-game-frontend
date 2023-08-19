"use client";
import React, { useState, useEffect } from "react";
import { GiMineExplosion } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import enemyImageCheck from "../utils/enemyImageCheck";
import enemyRaceIcon from "../utils/enemyRaceIcon";
import "../stylesheets/EnemyNPCCard.css";

const EnemyNPCCard = ({
  currentEnemy,
  enemyDamageDisplayed,
  enemyIsHit,
  displayedDamage,
  enemyIsAttacking,
  currentEnemyAttack,
  randomQuote,
  isQuoteVisible,
  enemyMaxHealth,
  enemyHealth,
  regionColor,
}) => {
  const [currentEnemyImage, setCurrentEnemyImage] = useState("");
  const [currentEnemyIcon, setCurrentEnemyIcon] = useState("");
  const [enemyHealthPercent, setEnemyHealthPercent] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    if (currentEnemy) {
      setCurrentEnemyIcon(enemyRaceIcon(currentEnemy.race));
      setCurrentEnemyImage(
        enemyImageCheck(
          currentEnemy.race,
          currentEnemy.area,
          currentEnemy.level
        )
      );
      setEnemyHealthPercent((enemyHealth / enemyMaxHealth) * 100);
    }
  }, [currentEnemy]);
  useEffect(() => {
    setEnemyHealthPercent((enemyHealth / enemyMaxHealth) * 100);
  }, [enemyHealth]);

  return (
    <>
      {currentEnemy ? (
        <div
          className={`character-card-container ${
            enemyIsAttacking ? "attacking" : ""
          } ${enemyIsHit ? "hit" : ""} ${
            enemyDamageDisplayed ? "damaged" : ""
          }`}
        >
          {enemyDamageDisplayed && (
            <div
              className={`character-card-damage-number ${
                enemyDamageDisplayed ? "animate" : ""
              }`}
            >
              {displayedDamage === "Miss"
                ? displayedDamage
                : `${displayedDamage}`}
            </div>
          )}

          <div
            className="enemy-card-image"
            style={{ backgroundImage: `url(${currentEnemyImage})` }}
          >
            {" "}
            <div className="enemy-card-health-container">
              <div className="enemy-card-bar">
                <div className="enemy-card-health-text">
                  <FaHeart className="health-icon" />
                  {`${enemyHealth} / ${enemyMaxHealth}`}
                </div>
                <div
                  className="enemy-card-bar-fill-hp"
                  style={{ width: `${enemyHealthPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="enemy-card-name-role-container">
              <h1 className="enemy-name">
                {currentEnemy.name}
              </h1>
                <h1 className="enemy-level">Lvl: {currentEnemy.level}</h1>
              <div
                className="enemy-role-icon"
                style={{ backgroundImage: `url(${currentEnemyIcon})` }}
              />
            </div>
            <div className="enemy-image-footer-container">
              <h1 className="enemy-card-footer">{currentEnemy.group}</h1>
            </div>
            {isQuoteVisible && (
              <div className="enemy-quotes">{randomQuote}</div>
            )}
            <div className="enemy-card-abilities-container">
              {currentEnemy.attacks.map((attack, index) => {
                const { attackName, maxDamage, description } = attack;
                return (
                  <div
                    className="enemy-card-single-ability-container"
                    key={attackName}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={{
                      backgroundColor:
                        currentEnemyAttack.attackName === attackName ||
                        hoverIndex === index
                          ? `${regionColor}`
                          : "",
                      boxShadow:
                        currentEnemyAttack.attackName === attackName ||
                        hoverIndex === index
                          ? `0px 0px 10px 2px ${regionColor}`
                          : "",
                      backdropFilter:
                        currentEnemyAttack.attackName === attackName ||
                        hoverIndex === index
                          ? "blur(1px)"
                          : "",
                    }}
                  >
                    <div className="enemy-card-name-discription-container">
                      <div className="enemy-card-ability-name">
                        {attackName}
                      </div>
                      <div className="enemy-card-ability-description">
                        {description}
                      </div>
                    </div>
                    <div className="enemy-card-ability-damage">
                      {maxDamage}
                      <GiMineExplosion className="enemy-card-ability-damage-icon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>No enemy</div>
      )}
    </>
  );
};

export default EnemyNPCCard;
