const regionColorCheck = (area) => {
  switch (area) {
    case "grassy": {
      return "#57ba0cbe";
    }
    case "desert": {
      return "#b68706be";
    }
    case "forest": {
      return "#123a06";
    }
    case "temple": {
      return "#f3d83ecb";
    }
    case "ruins": {
      return "#f3d83ecb";
    }
    case "cemetery": {
      return "#57390da6";
    }
    case "lake": {
      return "#11305fa6";
    }
    case "river": {
      return "#14516da6";
    }
    case "mountain": {
      return "#acacaca6";
    }
    case "swamp": {
      return "#527019a6";
    }
    default:
      return null;
  }
};

export default regionColorCheck;
