"use client";
import React, { useRef, useState, useEffect } from "react";
import Game from "./containers/Game";

export default function Page() {
  const [currentUser, setCurrentUser] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function getCookie(name) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const pulledUser = getCookie("currentUser");
    const pulledCharacter = getCookie("selectedCharacterId");

    setCurrentUser(pulledUser);
    setSelectedCharacterId(pulledCharacter);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (selectedCharacterId) {
        localStorage.setItem(
          "characterData",
          JSON.stringify(selectedCharacterId)
        );
      } else {
        const validCharacter = localStorage.getItem("characterData")
          ? JSON.parse(localStorage.getItem("characterData"))
          : "";
        if (validCharacter) {
          setSelectedCharacterId(validCharacter);
        }
      }
    }
  }, [selectedCharacterId]);

64

  if (isLoading) {
    let divCounter = 0
    for (let i = 0; i < 64; i++){

    }
    return <>
<div>Loading...</div>
    </>
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="">
        <Game
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          selectedCharacterId={selectedCharacterId}
          setSelectedCharacterId={setSelectedCharacterId}
        />
      </div>
    </div>
  );
}
