const getRoleColor = (role) => {
  switch (role) {
    case "Mage": {
      return "#00bbbb";
    }
    case "Warrior": {
      return "#990303";
    }
    case "Assassin": {
      return "#3c0c8a";
    }
    case "Human": {
      return "#502400";
    }
    case "Dwarf": {
      return "#00314d";
    }
    case "Elf": {
      return "#067a40";
    }
    default:
      return null;
  }
};

export default getRoleColor;
