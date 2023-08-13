import {
  GiSpiralBottle,
  GiBroadsword,
  GiSwapBag,
  GiShield,
  GiShoulderArmor,
  GiSpellBook,
  GiUnstableOrb,
} from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";

const itemIconCheck = (type) => {
  switch (type) {
    case "Potion": {
      return <GiSpiralBottle />;
    }
    case "Weapon": {
      return <GiBroadsword />;
    }
    case "Food": {
      return <FaHamburger />;
    }
    case "Misc": {
      return <GiSwapBag />;
    }
    case "Shield": {
      return <GiShield />;
    }
    case "Armor": {
      return <GiShoulderArmor />;
    }
    case "Book": {
      return <GiSpellBook />;
    }
    case "Orb": {
      return <GiUnstableOrb />;
    }
    default:
      return null;
  }
};

export default itemIconCheck;
