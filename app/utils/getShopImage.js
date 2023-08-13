function getShopImage(shopType) {
  switch (shopType) {
    case "general-shop": {
      return "./general_store_1.png";
    }
    case "weapon-shop": {
      return "./weapon_shop_interior.png";
    }
    case "armor-shop": {
      return "./armor_shop_interior.png";
    }
    default: {
      return null;
    }
  }
}

export default getShopImage;
