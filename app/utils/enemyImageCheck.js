const enemyImageCheck = (type, area, level) => {
  const imageUrls = {
    orc: {
      grassy: {
        1: [
          "./small_orc_1_grassy.png",
          "./small_orc_2_grassy.png",
          "./small_orc_3_grassy.png",
        ],
        2: ["./medium_orc_1_grassy.png"],
        3: [
          "./orc_large_grassy_1.png",
          "./orc_large_grassy_2.png",
          "./orc_large_grassy_3.png",
        ],
        4: ["./orc_large_grassy_4.png"],
      },
      forest: { 7: ["./orc_large_forest_1.png", "./orc_large_forest_2.png"] },
      mountain: {
        10: ["./orc_large_mountain_1.png", "./orc_large_mountain_2.png"],
      },
      city: {
        23: ["./orc_city_image_1.png", "./orc_city_image_2.png"]
      },
      throne: {
        27: ["./orc_leader_image_1.png"]
      }
    },
    dragon: {
      temple: { 30: ["./green_dragon_large_shrine_1.png"] },
      ruins: { 30: ["./golden_ruins_dragon.png"] },
    },
    darkElf: {
      forest: { 8: ["./dark_elf_forest_1.png", "./dark_elf_forest_2.png"] },
    },
    darkDwarf: {
      mountain: {
        17: ["./dark_dwarf_mountain_1.png", "./dark_dwarf_mountain_2.png"],
      },
    },
    golem: {
      mountain: {
        15: [
          "./golem_stone_large_mountain_1.png",
          "./golem_stone_large_mountain_2.png",
          "./golem_stone_large_mountain_3.png",
        ],
      },
      swamp: {
        15: ["./golem_mud_small_swamp_1.png", "./golem_mud_small_swamp_2.png"],
        18: ["./golem_mud_large_swamp_1.png"],
      },
      desert: {
        9: [
          "./golem_sand_large_desert_1.png",
          "./golem_sand_large_desert_2.png",
          "./golem_sand_large_desert_3.png",
        ],
      },
    },
    lizard: {
      desert: {
        6: [
          "./small_lizard_desert_1.png",
          "./small_lizard_desert_2.png",
          "./small_lizard_desert_3.png",
        ],
      },
    },
    wolf: {
      grassy: {
        8: ["./wolf_medium_grassy_1.png", "./wolf_medium_grassy_2.png"],
      },
      forest: {
        15: ["./wolf_medium_forest_1.png", "./wolf_medium_forest_2.png"],
        20: [
          "./dark_wolf_medium_forest_1.png",
          "./dark_wolf_medium_forest_2.png",
        ],
      },
      mountain: {
        13: ["./wolf_medium_mountain_1.png", "./wolf_medium_mountain_2.png"],
      },
      city: {
        25: ["./wolf_city_image_1.png", "./wolf_city_image_2.png", "./wolf_city_image_3.png", "./wolf_city_image_4.png"]
      }
    },
    skeleton: {
      cemetery: {
        12: [
          "./skeleton_cemetary_1.png",
          "./skeleton_cemetary_2.png",
          "./skeleton_cemetary_3.png",
        ],
      },
      village: { 11: ["skeleton_village_1.png", "skeleton_village_2.png"] },
    },
    spirit: {
      cemetery: {
        18: ["./spirit_cemetary_1.png", "./spirit_cemetary_2.png"],
      },
      village: { 15: ["spirit_village_1.png", "spirit_village_2.png"] },
    },
    bug: {
      desert: {
        10: ["./sand_bug_desert_1.png", "./sand_bug_desert_2.png"],
      },
      river: { 10: ["./bug_river_1.png", "./bug_river_2.png"] },
    },
    serpent: {
      desert: {
        30: ["./sand_serpent_desert_1.png", "./sand_serpent_desert_2.png"],
      },
    },
    fish: {
      lake: {
        19: ["./piranha_lake_small_1.png", "./piranha_lake_small_2.png"],
      },
    },
    lakeCreature: {
      lake: {
        22: [
          "./lake_creature_medium_lake_1.png",
          "./lake_creature_medium_lake_1.png",
        ],
      },
    },
    riverCreature: {
      river: {
        20: ["./river_creature_river_1.png", "./river_creature_river_2.png"],
      },
    },
  };
  const enemyArray = imageUrls[type][area][level];
  const randomImageIndex = Math.floor(Math.random() * enemyArray.length);
  const enemyImage = enemyArray[randomImageIndex];
  return enemyImage;
};

export default enemyImageCheck;
