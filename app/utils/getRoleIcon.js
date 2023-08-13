const getRoleIcon = (role) => {
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
    case "Human": {
      return "./human_icon.png";
    }
    case "Elf": {
      return "./elf_icon.png";
    }
    case "Dwarf": {
      return "./dwarf_icon.png";
    }
    default:
      return null;
  }
};

export default getRoleIcon;
