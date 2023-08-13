'use client';
import React, { useRef, useState, useEffect } from "react";
import Game from "./containers/Game";

export default function Page() {
  const [currentUser, setCurrentUser] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentUser) {
        localStorage.setItem("userData", JSON.stringify(currentUser))
      } else {
        const validUser = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData"))
        : '';
        if (validUser) {
          setCurrentUser(validUser)
        }
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedCharacterId) {
        localStorage.setItem("characterData", JSON.stringify(selectedCharacterId))
      } else {
        const validCharacter = localStorage.getItem("characterData") ? JSON.parse(localStorage.getItem("characterData"))
        : '';
        if (validCharacter) {
          setSelectedCharacterId(validCharacter)
        }
      }
    }
  }, [selectedCharacterId]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="">
        <Game currentUser={currentUser} setCurrentUser={setCurrentUser} selectedCharacterId={selectedCharacterId} setSelectedCharacterId={setSelectedCharacterId}/>
      </div>
    </div>
  );
}
