const itemQualityCheck = (quality) => {
  switch (quality) {
    case "Common": {
      return "#bebebe";
    }
    case "Uncommon": {
      return "#18a705";
    }
    case "Rare": {
      return "#3099fc";
    }
    case "Epic": {
      return "#995aff";
    }
    case "Legendary": {
      return "#ffe15a";
    }
    case "Mythical": {
      return "#ff5a99";
    }
    default:
      return null;
  }
};

export default itemQualityCheck;
