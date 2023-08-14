'use client';
import React, { useRef, useState, useEffect } from "react";
import Game from "./containers/Game";

export default function Page() {
  const [currentUser, setCurrentUser] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState('')

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Check for fullscreen support and request fullscreen
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        await document.documentElement.mozRequestFullScreen(); // Firefox
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen(); // Chrome, Safari and Opera
      } else if (document.documentElement.msRequestFullscreen) {
        await document.documentElement.msRequestFullscreen(); // IE/Edge
      }

      // Change orientation to landscape if available
      if (screen.orientation && screen.orientation.lock) {
        try {
          await screen.orientation.lock('landscape');
        } catch (err) {
        return
      }
    }
  }
},[])

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
