const enemyRaceIcon = (race) => {
  switch (race) {
    case "bug": {
      return "./bug_race_icon.png";
    }
    case "darkDwarf": {
      return "./dark_dwarf_race_icon.png";
    }
    case "darkElf": {
      return "./dark_elf_race_icon.png";
    }
    case "dragon": {
      return "./dragon_race_icon.png";
    }
    case "fish": {
      return "./fish_race.png";
    }
    case "golem": {
      return "./golem_race_icon.png";
    }
    case "lakeCreature": {
      return "./lake_creature_race.png";
    }
    case "riverCreature": {
      return "./lake_creature_race.png";
    }
    case "lizard": {
      return "./lizard_race_icon.png";
    }
    case "orc": {
      return "./orc_icon.png";
    }
    case "serpent": {
      return "./serpent_race_icon.png";
    }
    case "skeleton": {
      return "./skeleton_race_icon.png";
    }
    case "spirit": {
      return "./spirit_race_icon.png";
    }
    case "wolf": {
      return "./wolf_race_icon.png";
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

export default enemyRaceIcon;
