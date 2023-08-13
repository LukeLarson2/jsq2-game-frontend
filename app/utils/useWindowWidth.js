'use client';
import { useState, useEffect } from 'react';

const useWindowWidth = ({setMenuOpen}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 390);

  useEffect(() => {
    if(!isSmallScreen){
      setMenuOpen(true)
    }
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 390);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isSmallScreen;
};

export default useWindowWidth
