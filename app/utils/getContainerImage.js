const getContainerImage = (container) => {
  switch (container) {
    case "common-barrel": {
      return "./wood_barrel.png";
    }
    case "rusty-iron-chest": {
      return "./rusty_iron_chest.png";
    }
    case "iron-chest": {
      return "./iron_chest.png";
    }
    case "steel-chest": {
      return "./steel_chest.png";
    }
    case "decorated-steel-chest": {
      return "./decorated_steel_chest.png";
    }
    case "mithril-chest": {
      return "./mithril_chest.png";
    }
    case "enchanted-mithril-chest": {
      return "./enchanted_mithril_chest.png";
    }
    case "transcendent-mithril-chest": {
      return "./transcendent_mithril_chest.png";
    }
    default:
      return null;
  }
};

export default getContainerImage;
