"use client";
import React, { useState, useEffect } from "react";
import { BsLightningFill } from "react-icons/bs";
import { GiMineExplosion } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import getAbilityList from "../utils/getAbilityList";
import getRoleIcon from "../utils/getRoleIcon";
import axios from "axios";
import getSkillIcon from "../utils/getSkillIcon";
import AbilityDetails from "../components/AbilityDetails";
import dbURI from "../lib/dbURI";

import "../stylesheets/SkillTree.css";

const SkillTree = ({
  character,
  setIsSkillTreeOpen,
  isSkillTreeOpen,
  ownedAbilities,
  setOwnedAbilities,
  useSkillPoints,
  updateCharacterAbilities,
  currentUser,
  selectedCharacterId,
}) => {
  const [roleAbilities, setRoleAbilities] = useState([]);
  const [basicAbilities, setBasicAbilities] = useState([]);
  const [topTree, setTopTree] = useState([]);
  const [bottomTree, setBottomTree] = useState([]);
  const [ultimate, setUltimate] = useState({});
  const [topLine1, setTopLine1] = useState(false);
  const [topLine2, setTopLine2] = useState(false);
  const [topLine3, setTopLine3] = useState(false);
  const [topLine4, setTopLine4] = useState(false);
  const [bottomLine1, setBottomLine1] = useState(false);
  const [bottomLine2, setBottomLine2] = useState(false);
  const [bottomLine3, setBottomLine3] = useState(false);
  const [bottomLine4, setBottomLine4] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState({});
  const [topTreePath, setTopTreePath] = useState("");
  const [bottomTreePath, setBottomTreePath] = useState("");
  const [ownTop1, setOwnTop1] = useState(true);
  const [ownTop2, setOwnTop2] = useState(false);
  const [ownTop3, setOwnTop3] = useState(false);
  const [ownTop4, setOwnTop4] = useState(false);
  const [ownBottom1, setOwnBottom1] = useState(true);
  const [ownBottom2, setOwnBottom2] = useState(false);
  const [ownBottom3, setOwnBottom3] = useState(false);
  const [ownBottom4, setOwnBottom4] = useState(false);
  const [ownUltimate, setOwnUltimate] = useState(false);
  const [prerequisiteSkill1, setPrerequisiteSkill1] = useState({});
  const [prerequisiteSkill2, setPrerequisiteSkill2] = useState({});
  const { role, skillPoints, characterName, abilities, roleColor } = character;

  const roleIcon = getRoleIcon(role);

  const topTree1 = topTree[0];
  const topTree2 = topTree[1];
  const topTree3 = topTree[2];
  const topTree4 = topTree[3];
  const bottomTree1 = bottomTree[0];
  const bottomTree2 = bottomTree[1];
  const bottomTree3 = bottomTree[2];
  const bottomTree4 = bottomTree[3];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Fetch data and set state for abilities
      const allAbilities = await getAbilityList(dbURI);
      const roleAbilities = [];
      allAbilities.map((abilityPool, index) => {
        if (abilityPool.role === role) {
          roleAbilities.push(allAbilities[index]);
        }
      });

      setBasicAbilities(roleAbilities[0].basicAbilities);
      setTopTree(roleAbilities[0].specialAbilities.top);
      setBottomTree(roleAbilities[0].specialAbilities.bottom);
      setUltimate(roleAbilities[0].specialAbilities.ultimate);
      setTopTreePath(roleAbilities[0].specialAbilities.top[0].tree);
      setBottomTreePath(roleAbilities[0].specialAbilities.bottom[0].tree);

      const filterAbilities = basicAbilities
        .concat(topTree, bottomTree, ultimate)
        .filter((ability) => {
          const { rolesUsedBy } = ability;
          return rolesUsedBy && rolesUsedBy.includes(role);
        });

      setRoleAbilities(filterAbilities);
      setOwnedAbilities(abilities);

      // Now that the abilities are set, do the checks from the second useEffect hook
      checkAbilities(
        abilities,
        roleAbilities[0].specialAbilities.top,
        roleAbilities[0].specialAbilities.bottom,
        roleAbilities[0].specialAbilities.ultimate
      );

      setIsLoading(false);
    };

    fetchData();
  }, [isSkillTreeOpen, ownedAbilities]);

  const checkAbilities = async (abilities, topTree, bottomTree, ultimate) => {
    const topTree2 = topTree[1];
    const topTree3 = topTree[2];
    const topTree4 = topTree[3];
    const bottomTree2 = bottomTree[1];
    const bottomTree3 = bottomTree[2];
    const bottomTree4 = bottomTree[3];
    // Check each of the skills the player has. If they have a skill, set the corresponding line to true
    if (
      abilities.some((ability) =>
        ability ? ability.name === topTree2.name : ""
      )
    ) {
      setTopLine1(true);
      setOwnTop2(true);
    }
    if (
      abilities.some((ability) =>
        ability ? ability.name === topTree3.name : ""
      )
    ) {
      setTopLine2(true);
      setOwnTop3(true);
    }
    if (
      abilities.some((ability) =>
        ability ? ability.name === topTree4.name : ""
      )
    ) {
      setTopLine3(true);
      setOwnTop4(true);
    }
    if (
      abilities.some((ability) =>
        ability ? ability.name === topTree4.name : ""
      ) &&
      abilities.some((ability) =>
        ability ? ability.name === ultimate.name : ""
      )
    ) {
      setTopLine4(true);
      setOwnUltimate(true);
    }
    if (
      abilities.some((ability) => ability && ability.name === bottomTree2.name)
    ) {
      setBottomLine1(true);
      setOwnBottom2(true);
    }
    if (
      abilities.some((ability) => ability && ability.name === bottomTree3.name)
    ) {
      setBottomLine2(true);
      setOwnBottom3(true);
    }
    if (
      abilities.some((ability) => ability && ability.name === bottomTree4.name)
    ) {
      setBottomLine3(true);
      setOwnBottom4(true);
    }
    if (
      abilities.some(
        (ability) => ability && ability.name === bottomTree4.name
      ) &&
      abilities.some((ability) => ability && ability.name === ultimate.name)
    ) {
      setBottomLine4(true);
      setOwnUltimate(true);
    }
  };

  useEffect(() => {
    const newRoleAbilities = [...roleAbilities];
    newRoleAbilities.forEach((ability) => {
      if (
        ownedAbilities.some(
          (ownedAbility) => ownedAbility.name === ability.name
        )
      ) {
        ability.isOwned = true;
      }
    });
    setRoleAbilities(newRoleAbilities);
  }, [ownedAbilities]);

  useEffect(() => {
    setOwnedAbilities(abilities);
  }, [skillPoints, useSkillPoints, isSkillTreeOpen]);

  const handleCloseSkillTree = () => {
    setIsSkillTreeOpen(!isSkillTreeOpen);
  };

  const handleShowAbility = (ability, preReq1, preReq2) => {
    setPrerequisiteSkill1(preReq1);
    if (preReq2) {
      setPrerequisiteSkill2(preReq2);
    }
    setSelectedAbility(ability);
    setShowDetails(true);
  };

  return (
    <div className="skill-tree-overlay">
      {showDetails && (
        <AbilityDetails
          ability={selectedAbility}
          setShowDetails={setShowDetails}
          prerequisiteSkill1={prerequisiteSkill1}
          prerequisiteSkill2={prerequisiteSkill2}
          characterName={characterName}
          ownedAbilities={ownedAbilities}
          character={character}
          roleColor={roleColor}
          updateCharacterAbilities={updateCharacterAbilities}
          skillPoints={character.skillPoints}
          currentUser={currentUser}
          selectedCharacterId={selectedCharacterId}
        />
      )}
      {topTree && bottomTree && ultimate ? (
        <div
          className="skill-tree-modal"
          style={{ backgroundImage: "url(./skill_tree_background_blue.png)" }}
        >
          <button
            className="close-skill-tree-btn"
            onClick={() => handleCloseSkillTree()}
          >
            Close
          </button>
          <div className="skill-tree-title">{`${characterName}'s Skill Tree`}</div>
          <div className="skill-tree-current-skill-points">
            {skillPoints} Skill Points
          </div>
          <div className="skill-tree-top-path">{topTreePath} Path</div>
          <div className="skill-tree-content">
            <div
              className="skill-tree-skill-role-icon"
              style={{ backgroundImage: `url(${roleIcon})` }}
            ></div>
            <div className="skill-tree-bub-1-2">
              <div
                className="skill-tree-skill bubble-1"
                onClick={() => handleShowAbility(topTree1, topTree1)}
                style={{
                  color: ownTop1 ? "white" : "#5a5a5a",
                  boxShadow: ownTop1 ? "0px 0px 3px 3px #ffffff" : "",
                }}
              >
                <div className="skill-tree-bubble-text">
                  {topTree1 ? getSkillIcon(topTree1.name) : ""}
                  <p>Lvl {topTree1 ? topTree1.level : ""}</p>
                </div>
              </div>
              <div
                className="skill-tree-skill bubble-2"
                onClick={() => handleShowAbility(bottomTree1, bottomTree1)}
                style={{
                  color: ownBottom1 ? "white" : "#5a5a5a",
                  boxShadow: ownBottom1 ? "0px 0px 3px 3px #ffffff" : "",
                }}
              >
                <div className="skill-tree-bubble-text">
                  {bottomTree1 ? getSkillIcon(bottomTree1.name) : ""}
                  <p>Lvl {bottomTree1 ? bottomTree1.level : ""}</p>
                </div>
              </div>
            </div>
            <div className="skill-tree-bub-1-2">
              <div
                className="skill-tree-skill bubble-top"
                onClick={() => handleShowAbility(topTree2, topTree1)}
                style={{
                  color: ownTop2 ? "white" : "#5a5a5a",
                  boxShadow: ownTop2 ? "0px 0px 3px 3px #ffffff" : "",
                }}
              >
                <div className="skill-tree-bubble-text">
                  {topTree2 ? getSkillIcon(topTree2.name) : ""}
                  <p>Lvl {topTree2 ? topTree2.level : ""}</p>
                </div>
              </div>
              <div
                className="skill-tree-skill bubble-bottom"
                onClick={() => handleShowAbility(bottomTree2, bottomTree1)}
                style={{
                  color: ownBottom2 ? "white" : "#5a5a5a",
                  boxShadow: ownBottom2 ? "0px 0px 3px 3px #ffffff" : "",
                }}
              >
                <div className="skill-tree-bubble-text">
                  {bottomTree2 ? getSkillIcon(bottomTree2.name) : ""}
                  <p>Lvl {bottomTree2 ? bottomTree2.level : ""}</p>
                </div>
              </div>
            </div>
            <div className="skill-tree-bub-1-2">
              <div
                className="skill-tree-skill bubble-top"
                onClick={() => handleShowAbility(topTree3, topTree2)}
                style={{
                  color: ownTop3 ? "white" : "#5a5a5a",
                  boxShadow: ownTop3 ? "0px 0px 3px 3px #ffffff" : "",
                }}
              >
                <div className="skill-tree-bubble-text">
                  {topTree3 ? getSkillIcon(topTree3.name) : ""}
                  <p>Lvl {topTree3 ? topTree3.level : ""}</p>
                </div>
              </div>
              <div
                className="skill-tree-skill bubble-bottom"
                onClick={() => handleShowAbility(bottomTree3, bottomTree2)}
                style={{
                  color: ownBottom3 ? "white" : "#5a5a5a",
                  boxShadow: ownBottom3 ? "0px 0px 3px 3px #ffffff" : "",
                }}
              >
                <div className="skill-tree-bubble-text">
                  {bottomTree3 ? getSkillIcon(bottomTree3.name) : ""}
                  <p>Lvl {bottomTree3 ? bottomTree3.level : ""}</p>
                </div>
              </div>
            </div>
            <div className="skill-tree-bub-1-2">
              <div
                className="skill-tree-skill bubble-1"
                onClick={() => handleShowAbility(topTree4, topTree3)}
                style={{
                  color: ownTop4 ? "white" : "#5a5a5a",
                  boxShadow: ownTop4 ? "0px 0px 3px 3px #ffffff" : "",
                }}
              >
                <div className="skill-tree-bubble-text">
                  {topTree4 ? getSkillIcon(topTree4.name) : ""}
                  <p>Lvl {topTree4 ? topTree4.level : ""}</p>
                </div>
              </div>
              <div
                className="skill-tree-skill bubble-2"
                onClick={() => handleShowAbility(bottomTree4, bottomTree3)}
                style={{
                  color: ownBottom4 ? "white" : "#5a5a5a",
                  boxShadow: ownBottom4 ? "0px 0px 3px 3px #ffffff" : "",
                }}
              >
                <div className="skill-tree-bubble-text">
                  {bottomTree4 ? getSkillIcon(bottomTree4.name) : ""}
                  <p>Lvl {bottomTree4 ? bottomTree4.level : ""}</p>
                </div>
              </div>
            </div>
            <div
              className="skill-tree-skill bubble-9"
              onClick={() => handleShowAbility(ultimate, bottomTree4, topTree4)}
              style={{
                color: ownUltimate ? "white" : "#5a5a5a",
                boxShadow: ownUltimate ? "0px 0px 3px 3px #ffffff" : "",
              }}
            >
              <div className="skill-tree-bubble-text">
                {ultimate ? getSkillIcon(ultimate.name) : ""}
                <p>Lvl {ultimate ? ultimate.level : ""}</p>
              </div>
            </div>
            <div className="skill-tree-skill-large-line top-tree-0-1 solid" />
            <div className="skill-tree-skill-large-line bottom-tree-0-1 solid" />
            <div
              className={`skill-tree-skill-large-line top-tree-1-2 ${
                topLine1 ? "solid" : "dashed"
              }`}
            />
            <div
              className={`skill-tree-skill-large-line top-tree-2-3 ${
                topLine2 ? "solid" : "dashed"
              }`}
            />
            <div
              className={`skill-tree-skill-large-line top-tree-3-4 ${
                topLine3 ? "solid" : "dashed"
              }`}
            />
            <div
              className={`skill-tree-skill-large-line top-tree-4-5 ${
                topLine4 ? "solid" : "dashed"
              }`}
            />
            <div
              className={`skill-tree-skill-large-line bottom-tree-1-2 ${
                bottomLine1 ? "solid" : "dashed"
              }`}
            />
            <div
              className={`skill-tree-skill-large-line bottom-tree-2-3 ${
                bottomLine2 ? "solid" : "dashed"
              }`}
            />
            <div
              className={`skill-tree-skill-large-line bottom-tree-3-4 ${
                bottomLine3 ? "solid" : "dashed"
              }`}
            />
            <div
              className={`skill-tree-skill-large-line bottom-tree-4-5 ${
                bottomLine4 ? "solid" : "dashed"
              }`}
            />
          </div>
          <div className="skill-tree-bottom-path">{bottomTreePath} Path</div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default SkillTree;
