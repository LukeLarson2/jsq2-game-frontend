function getShopKeeperImage(characterRace, shopKeeperRace) {
  const shopKeeperUrls = {
    Human: {
      Human: "./shop_owner_happy.png",
      Dwarf: "./dwarf_armor_smith_grumpy.png",
      Elf: "./elf_weapon_smith_happy.png",
    },
    Dwarf: {
      Human: "./shop_owner_happy.png",
      Dwarf: "./dwarf_armor_smith_happy.png",
      Elf: "./elf_weapon_smith_grumpy.png",
    },
    Elf: {
      Human: "./shop_owner_grumpy.png",
      Dwarf: "./dwarf_armor_smith_grumpy.png",
      Elf: "./elf_weapon_smith_happy.png",
    },
  };
  const shopKeeperImage = shopKeeperUrls[characterRace][shopKeeperRace];
  return shopKeeperImage;
}

export default getShopKeeperImage;
