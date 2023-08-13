const roleIconCheck = (role) => {
  switch (role) {
    case "Mage": {
      return "./mage_icon.png";
    }
    case "Warrior": {
      return "./warrior_icon.png";
    }
    case "Assassin": {
      return "./assassin_icon.png";
    }
    default:
      return null;
  }
};

export default roleIconCheck;
