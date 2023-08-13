const storyGPTPrompt = (userName, regionId) => {
  if (regionId === "desolateBeach") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts on a desolate beach that will eventually lead to a large grassy field.
         4. The user arrived on this beach due to teleporting there after interacting with the 'Dream Stone'. The stone no longer has any energy left to return the user from where they came.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         6. The user should encounter at least two small Orcs at different points. These encounters should have the following:
         a. When encountering an Orc, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries exactly without any variation: {"race": "orc", "level": 1, area: "grassy"}.
      c. Encountering these Orcs should not impact the story and should be a random encounter.
      d. The amount of Orcs defeated is not important and should not drive the story.
      e. Each encounter will be with a single Orc at a time.
      f. All encounters will be with an Orc.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than two different "common barrel" and one "rusty iron chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "common barrel" or "rusty iron chest" a string should read 'Should you open the (common barrel or rusty iron chest)?'
      e. The index that follows 'Should you open the (common barrel or rusty iron chest)?' should be either "common-barrel" or "rusty-iron-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the (barrel or chest) and remove it's contents". The second key value should be 'no': 'You decide to not open the (barrel or chest) and move on'. The contents of these containers should not be referenced in the story.
      8. The ending of the story should result in the user finding a magic map that has words on the back that indicate it having a magic ability to teleport it's bearer to any of its locations.
      9. The second to last index should read "You look at the map and pick your next location to travel to."
      10. The last index should read "end".
      11. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      12. The response to this prompt should not include any additional text other than the story array.
      13. Do not incude any text after the index with the value of "end".
      14. Do not leave indexes empty`;
  } else if (regionId === "southernGateway") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Southern Gateway" which is a stone archway that has decade over many years and is located in a grassy field and has a dirt road.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least one medium Orc and 2 small Orcs at different points. These encounters should have the following:
         a. When encountering an Orc, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a small Orc exactly without any variation: {"race": "orc", "level": 1, area: "grassy"}. For a medium Orc exactly without any variation: {"race": "orc", "level": 2, area: "grassy"}.
      c. Encountering these Orcs should not impact the story and should be a random encounter.
      d. The amount of Orcs defeated is not important and should not drive the story.
      e. Each encounter will be with a single Orc at a time.
      f. All encounters will be with an Orc.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than two different "common barrels" and one "rusty iron chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "common barrel" or "rusty iron chest" a string should read 'Should you open the (common barrel or rusty iron chest)?'
      e. The index that follows 'Should you open the (common barrel or rusty iron chest)?' should be either "common-barrel" or "rusty-iron-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the (barrel or chest) and remove it's contents". The second key value should be 'no': 'You decide to not open the (barrel or chest) and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;
  } else if (regionId === "easternDesert") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Eastern Desert" which is a desert that is hot, has sand everywhere with rock formations.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least 2 desert lizards and 1 large sand golem at different points. These encounters should have the following:
         a. When encountering a lizard or sand golem, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a desert lizard exactly without any variation: {"race": "lizard", "level": 6, area: "desert"}. For the sand golem exactly without any variation: {"race": "golem", "level": 9, area: "desert"}.
      c. Encountering these lizards or golems should not impact the story and should be a random encounter.
      d. The amount of lizards or golems defeated is not important and should not drive the story.
      e. Each encounter will be with a single lizard or golem at a time.
      f. All encounters will be with an lizard or golem.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than one "common barrel" and one "iron chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "common barrel" or "iron chest" a string should read 'Should you open the (common barrel or iron chest)?'
      e. The index that follows 'Should you open the (common barrel or iron chest)?' should be either "common-barrel" or "iron-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the (barrel or chest) and remove it's contents". The second key value should be 'no': 'You decide to not open the (barrel or chest) and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;
  } else if (regionId === "southernForest") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Southern Forest" which is overgrown and the light gets blocked by the large trees.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least 3 dark elves and 1 orc. These encounters should have the following:
         a. When encountering a dark elf or orc, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a dark elf the key value must equaly exactly without any variation: {"race": "darkElf", "level": 8, area: "forest"}. for the orc the key value must equaly exactly without any variation: {"race": "orc", "level": 7, area: "forest"}.
      c. Encountering these lizards or golems should not impact the story and should be a random encounter.
      d. The amount of dark elves or orcs defeated is not important and should not drive the story.
      e. Each encounter will be with a single dark elf or orc at a time.
      f. All encounters will be with an dark elf or orc.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than one "rusty iron chest" and one "iron chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "rusty iron chest" or "iron chest" a string should read 'Should you open the chest?'
      e. The index that follows 'Should you open the chest?' should be either "rusty-iron-chest" or "iron-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;
  } else if (regionId === "forgottenForest") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

      1. Be greater than or equal to 30 indexes in length.
      2. It should follow a user called "${userName}"
      3. The story starts at a location called "Forgotten Forest" which is overgrown and the light gets blocked by the large trees.
      4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
      5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
      6. The user should encounter at least 1 wolf. This encounter should have the following:
        a. When encountering a wolf, the index prompting the encounter should be "You prepare to fight".
        b. The index following "You prepare to fight" will be an object with following entries. For a wolf the key value must equaly exactly without any variation: {"race": "wolf", "level": 20, area: "forest"}.
        c. Encountering a wolf should not impact the story and should be a random encounter.
        d. Any encounter will be with an wolf.
        e. The encounter shouldnt happen for at least 3 indexes.
      7. At some point the user should come accross a hidden cave.
      8. The second index after the encounter will what the value of "forest-cave" without any variation.
      9. When the user enters the cave the index following will have the exact value of "You enter the cave..." without any variation.
      10. Upon entering the cave the user will find an iron door that is locked.
      11. The index following an index describing the user trying to open the door will have the exact value of "iron-key-check" without any variation.
      12. The indexes after "iron-key-check" will describe the user looking around the area for a key but not finding any.
      13. After not finding key the user will the make their way out of the cave.
      14. The second to last index should read "You look at the map and pick your next location to travel to."
      15. The last index should read "end".
      16. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      17. The response to this prompt should not include any additional text other than the story array.
      18. Do not incude any text after the index with the value of "end".
      19. Do not leave indexes empty`;
  } else if (regionId === "northrendAscent") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

      1. Be greater than or equal to 50 indexes in length.
      2. It should follow a user called "${userName}"
      3. The story starts at a location called "Northrend Ascent" which is a dangerous path leading through the mountains in the north.
      4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
      5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
      6. The user should encounter at least 1 dark dwarf. These encounters should have the following:
        a. When encountering a dark dwarf, the index prompting the encounter should be "You prepare to fight".
        b. The index following "You prepare to fight" will be an object with following entries. For a dark dwarf the key value must equaly exactly without any variation: {"race": "darkDwarf", "level": 17, area: "mountain"}.
        c. Encountering a dark dwarf should not impact the story and should be a random encounter.
        d. The first encounter shouldnt happen for at least 3 indexes.
      7. At some point the user should come accross a hidden cave.
      8. The second index after the encounter will what the value of "mountain-cave" without any variation.
      9. When the user enters the cave the index following will have the exact value of "You enter the cave..." without any variation.
      10. Upon entering the cave the user will find an mithril door that is locked.
      11. The index following an index describing the user trying to open the door will have the exact value of "mithril-key-check" without any variation.
      12. The indexes after "mithril-key-check" will describe the user looking around the area for a key but not finding any.
      13. After not finding key the user will the make their way out of the cave.
      14. The second to last index should read "You look at the map and pick your next location to travel to."
      15. The last index should read "end".
      16. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      17. The response to this prompt should not include any additional text other than the story array.
      18. Do not incude any text after the index with the value of "end".
      19. Do not leave indexes empty`;
  } else if (regionId === "tradersCrossroads") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

    1. Be greater than or equal to 20 indexes in length.
    2. It should follow a user called "${userName}"
    3. The story starts at a location called "Trader's CrossRoads" which is a bustling town full of traders and shops.
    4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
    5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
    6. The user will have the option to go into a general goods shop and the following should happen:
    a. Entering the shop should not impact the story.
    b. The index leading to going into the shop will be "You enter the shop".
    c. The index after "You enter the shop" will have the exact value "general-shop".
    d. The index following "general-shop" will have the value "You exit the shop".
      7. The second to last index should read "You look at the map and pick your next location to travel to."
      8. The last index should read "end".
      9. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      10. The response to this prompt should not include any additional text other than the story array.
      11. Do not incude any text after the index with the value of "end".
      12. Do not leave indexes empty`;
  } else if (regionId === "verdantis") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

    1. Be greater than or equal to 20 indexes in length.
    2. It should follow a user called "${userName}"
    3. The story starts at a location called "Verdantis" which is a forest elf city.
    4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
    5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
    6. The user will have the option to go into a weapons shop and the following should happen:
    a. Entering the shop should not impact the story.
    b. The index leading to going into the shop will be "You enter the shop".
    c. The index after "You enter the shop" will have the exact value "weapon-shop".
    d. The index following "weapon-shop" will have the value "You exit the shop".
      7. The second to last index should read "You look at the map and pick your next location to travel to."
      8. The last index should read "end".
      9. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      10. The response to this prompt should not include any additional text other than the story array.
      11. Do not incude any text after the index with the value of "end".
      12. Do not leave indexes empty`;
  } else if (regionId === "anvilorn") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

    1. Be greater than or equal to 20 indexes in length.
    2. It should follow a user called "${userName}"
    3. The story starts at a location called "Anvilorn" which is a dwarven city at the base of a large mountain.
    4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
    5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
    6. The user will have the option to go into an armor shop and the following should happen:
    a. Entering the shop should not impact the story.
    b. The index leading to the user going into the shop will be "You enter the shop".
    c. The index after "You enter the shop" will have the exact value "armor-shop".
    d. The index following "armor-shop" will have the value "You exit the shop".
      7. The second to last index should read "You look at the map and pick your next location to travel to."
      8. The last index should read "end".
      9. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      10. The response to this prompt should not include any additional text other than the story array.
      11. Do not incude any text after the index with the value of "end".
      12. Do not leave indexes empty`;
  } else if (regionId === "bartusVillage") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Bartus Village" which is an abandoned village with a erie low rolling fog.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least 2 skeletons and 2 dark spirits. These encounters should have the following:
         a. When encountering a skeleton or dark Spirit, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a skeleton exactly without any variation: {"race": "skeleton", "level": 11, area: "village"}. for a dark spirit exactly without any variation: {"race": "spirit", "level": 15, area: "village"}.
      c. Encountering these skeletons or dark spirits should not impact the story and should be a random encounter.
      d. The amount of skeletons or dark spirits defeated is not important and should not drive the story.
      e. Each encounter will be with a single skeleton or dark spirit at a time.
      f. All encounters will be with an skeleton or dark spirit.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than 1 "rusty iron chest" and 2 "iron chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "rusty iron chest" or "iron chest" a string should read 'Should you open the chest?'
      e. The index that follows 'Should you open the chest?' should be either "rusty-iron-chest" or "iron-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;

  } else if (regionId === "shroudedHollow") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Shrouded Hollow" which is an spooky cemetery with a erie low rolling fog.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least 1 skeleton and 2 spirits. These encounters should have the following:
         a. When encountering a skeleton or Spirit, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a skeleton exactly without any variation: {"race": "skeleton", "level": 12, area: "cemetery"}. for a spirit exactly without any variation: {"race": "spirit", "level": 18, area: "cemetery"}.
      c. Encountering these skeleton or spirits should not impact the story and should be a random encounter.
      d. The amount of skeleton or spirits defeated is not important and should not drive the story.
      e. Each encounter will be with a single skeleton or spirit at a time.
      f. All encounters will be with an skeleton or spirit.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than 1 "iron chest" and 1 "steel chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "iron chest" or "steel chest" a string should read 'Should you open the chest?'
      e. The index that follows 'Should you open the chest?' should be either "iron-chest" or "steel-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;

  } else if (regionId === "telletLake") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Tellet Lake" which is a large lake surrounded by a lush forest.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least 2 large piranhas and 2 large lake creatures. These encounters should have the following:
         a. When encountering a piranha or lake creature, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a piranha exactly without any variation: {"race": "fish", "level": 19, area: "lake"}. for a lake creature exactly without any variation: {"race": "lakeCreature", "level": 22, area: "lake"}.
      c. Encountering these piranhas or lake creatures should not impact the story and should be a random encounter.
      d. The amount of piranhas or lake creatures defeated is not important and should not drive the story.
      e. Each encounter will be with a single piranha or lake creature at a time.
      f. All encounters will be with an piranha or lake creature.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than 1 "iron chest" and 2 "steel chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "iron chest" or "steel chest" a string should read 'Should you open the chest?'
      e. The index that follows 'Should you open the chest?' should be either "iron-chest" or "steel-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;
  } else if (regionId === "murkwoodMarsh") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Murkwood Marsh" which is a large swamp with a rotten odor.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least 2 small mud golems and 1 large mud golem. These encounters should have the following:
         a. When encountering a small mud golem or large mud golem, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a small mud golem exactly without any variation: {"race": "golem", "level": 15, area: "swamp"}. for a large mud golem exactly without any variation: {"race": "golem", "level": 18, area: "swamp"}.
      c. Encountering these small mud golems or large mud golems should not impact the story and should be a random encounter.
      d. The amount of small mud golems or large mud golems defeated is not important and should not drive the story.
      e. Each encounter will be with a single small mud golem or large mud golem at a time.
      f. All encounters will be with an small mud golem or large mud golem.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than 1 "steel chest" and 1 "decorated steel chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "steel chest" or "decorated steel chest" a string should read 'Should you open the chest?'
      e. The index that follows 'Should you open the chest?' should be either "steel-chest" or "decorated-steel-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;
  } else if (regionId === "blackspinePeaks") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Blackspine Peaks" which is a treacherous terrain of razor sharp rocks and tall mountains.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least 1 large orc, 1 stone golem, and 1 mountain wolf. These encounters should have the following:
         a. When encountering a large orc, stone golem or a mountain wolf, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a large orc exactly without any variation: {"race": "orc", "level": 10, area: "mountain"}. for a stone golem exactly without any variation: {"race": "golem", "level": 15, area: "mountain"}. for a mountain wolf exactly without any variation: {"race": "wolf", "level": 13, area: "mountain"}.
      c. Encountering these large orc, stone golem or a mountain wolf should not impact the story and should be a random encounter.
      d. The amount of large orc, stone golem or a mountain wolf defeated is not important and should not drive the story.
      e. Each encounter will be with a single large orc, stone golem or a mountain wolf at a time.
      f. All encounters will be with an large orc, stone golem or a mountain wolf.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than 1 "decorated steel chest" and 1 "mithril chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "decorated steel chest" or "mithril chest" a string should read 'Should you open the chest?'
      e. The index that follows 'Should you open the chest?' should be either "decorated-steel-chest" or "mithril-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;
  } else if (regionId === "dunesOfTheDamned") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

         1. Be greater than or equal to 50 indexes in length.
         2. It should follow a user called "${userName}"
         3. The story starts at a location called "Dunes of the Damned" which is a baren wasteland filled of harsh grey sand and tall rock spires.
         4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
         5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
         a. Before any encounters happen, provide a brief context to the user's location.
         6. The user should encounter at least 4 small flying insects and 1 giant sand serpent. These encounters should have the following:
         a. When encountering a small flying insects or a giant sand serpent, the index prompting the encounter should be "You prepare to fight".
         b. The index following "You prepare to fight" will be an object with following entries. For a small flying insects exactly without any variation: {"race": "bug", "level": 10, area: "desert"}. for a giant sand serpent exactly without any variation: {"race": "serpent", "level": 30, area: "desert"}.
      c. Encountering these small flying insects or a giant sand serpent should not impact the story and should be a random encounter.
      d. The amount of small flying insects or a giant sand serpent defeated is not important and should not drive the story.
      e. Each encounter will be with a single small flying insects or a giant sand serpent at a time.
      f. All encounters will be with an small flying insects or a giant sand serpent.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than 1 "enchanted mithril chest" and 1 "transcendent mithril chest" after encountering the enemies. These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "enchanted mithril chest" or "transcendent mithril chest" chest a string should read 'Should you open the chest?'
      e. The index that follows 'Should you open the chest?' should be either "enchanted-mithril" or "transcendent-mithril-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;
  } else if (regionId === "dragonsDescentTemple") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

      1. Be greater than or equal to 50 indexes in length.
      2. It should follow a user called "${userName}"
      3. The story starts at a location called "Dragon's Descent Temple" which is a beautiful mountain temple with waterfalls. The temple has been abandoned for many years.
      4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
      5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
      6. The story will lead the user up a trail into the temple.
      7. When the user enters the temple, the index will have the value "You enter the temple".
      8. The index following "You enter the temple" will have a value of "enter-dragon-temple".
      9. After entering the temple the user should approach a round platform on the ground covered in engravings.
      10. After an index with the value of "You look closer at the engravings" will have the value of "check-dragon".
      11. In this story nothing should happen to the user other than the user making note of the engravings and the shrine with the intent to return in the future.
      12. The second to last index should read "You look at the map and pick your next location to travel to."
      13. The last index should read "end".
      14. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      15. The response to this prompt should not include any additional text other than the story array.
      16. Do not incude any text after the index with the value of "end".
      17. Do not leave indexes empty`;
  } else if (regionId === "dragonsTearRiver") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

    1. Be greater than or equal to 50 indexes in length.
    2. It should follow a user called "${userName}"
    3. The story starts at a location called "Dragon's Tear River" winding river abundent of life, some of which is agressive.
    4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
    5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
      a. Before any encounters happen, provide a brief context to the user's location.
    6. The user should encounter at least 3 small flying insects and 2 large river creatures. These encounters should have the following:
    a. When encountering a small flying insects or a large river creatures, the index prompting the encounter should be "You prepare to fight".
    b. The index following "You prepare to fight" will be an object with following entries. For a small flying insects exactly without any variation: {"race": "bug", "level": 10, area: "river"}. for a large river creatures exactly without any variation: {"race": "riverCreature", "level": 20, area: "river"}.
    c. Encountering these small flying insects or a large river creatures should not impact the story and should be a random encounter.
      d. The amount of small flying insects or a large river creatures defeated is not important and should not drive the story.
      e. Each encounter will be with a single small flying insects or a large river creatures at a time.
      f. All encounters will be with an small flying insects or a large river creatures.
      g. The first encounter shouldnt happen for at least 3 indexes.
      7. The user should also find no more than 1 "mithril chest" and 1 "enchanted mithril chest". These discoveries should meet the following criteria:
      a. These containers should not drive the story and should just be randomly discovered during the journey.
      b. The contents of the containers should not depict or impact the story in any way.
      c. The amount of containers found is of no importance in driving the story.
      d. Before opening the "mithril chest" or "enchanted mithril chest" a string should read 'Should you open the chest?'
      e. The index that follows 'Should you open the chest?' should be either "mithril-chest" or "enchanted-mithril-chest".
      f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
      8. The second to last index should read "You look at the map and pick your next location to travel to."
      9. The last index should read "end".
      10. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      11. The response to this prompt should not include any additional text other than the story array.
      12. Do not incude any text after the index with the value of "end".
      13. Do not leave indexes empty`;
  } else if (regionId === "goldenRuins") {
    return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

      1. Be greater than or equal to 50 indexes in length.
      2. It should follow a user called "${userName}"
      3. The story starts at a location called "Golden Ruins" which is golden light glowing deteriated anchient stone structure that radiate a warm magical feeling.
      4. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
      5. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
      6. The story will lead the user through exploring through the ruins eventually finding a small alter with a missing square shapped idol.
      7. When the user inspects the alter, the index will have the value "You look closly at the engravings in the stone".
      8. The index following "You look closly at the engravings in the stone" will have a value of "stone-idol".
      9. Though the user searches the ruins for such an idol, they will have no luck and eventually leave after taking note of their findings.
      10. The user will not take anything from the ruins.
      11. The second to last index should read "You look at the map and pick your next location to travel to."
      12. The last index should read "end".
      13. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
      14. The response to this prompt should not include any additional text other than the story array.
      15. Do not incude any text after the index with the value of "end".
      16. Do not leave indexes empty`;
    } else if (regionId === "eldoria") {
      return `Create an interactive adventure story formatted as a JavaScript Array that not assined a variable name and is just an array where each index is a sentence. The story should meet the following requirements:

      1. Without variation, the array will contain 50 indexes no less.
      2. It should follow a user called "${userName}"
      3. The story starts at a location called "Eldoria", a medieval city with a large castle in teh center, once grand, now under siege by an Orc Army.
      4. The story should lead the user through the destroyed city where they will encounter orcs and wolves before entering the castle and finding the orc leader.
        a. when the user enters the city, the index that follows will have the exact value without variation of "enter-eldoria".
        b. when the user enters into the throne room the index that follows will have the exact value without variation of "enter-eldoria-throne".
      5. When the orc leader is defeated, the king should thank the user for saving the kingdom once again.
      6. The user arrived here by teleporting via the magic map, at the start of the story just state the user appeared.
      7. The story should refer to the user as 'you' or 'You' when narrating and only reference the users name if the story involves any dialog.
        a. Before any encounters happen, provide a brief context to the user's location.
      8. The user should encounter 1 orc, 1 wolf and 1 orc leader. the orc leader should be the final encounter. These encounters should have the following:
      a. When encountering a orc, wolf or orc leader, the index prompting the encounter should be "You prepare to fight".
      b. The index following "You prepare to fight" will be an object with following entries. For a orc exactly without any variation: {"race": "orc", "level": 23, area: "city"}. For the wolf exactly without any variation: {"race": "wolf", "level": 25, area: "city"}. For the orc leader exactly without any variation: {"race": "orc", "level": 27, area: "throne"}.
      c. Encountering these orc or wolf should not impact the story and should be a random encounter.
        d. The amount of orcs or a wolves defeated is not important and should not drive the story.
        e. Each encounter will be with a single orc, a single wolf, or a single orc leader at a time.
        f. All encounters will be with an orc, wolf or orc leader.
        g. The first encounter shouldnt happen for at least 3 indexes.
        9. The user should also find no more than 1 "mithril chest" and 1 "enchanted mithril chest". These discoveries should meet the following criteria:
        a. These containers should not drive the story and should just be randomly discovered during the journey.
        b. The contents of the containers should not depict or impact the story in any way.
        c. The amount of containers found is of no importance in driving the story.
        d. Before opening the "mithril chest" or "enchanted mithril chest" a string should read 'Should you open the chest?'
        e. The index that follows 'Should you open the chest?' should be either "mithril-chest" or "enchanted-mithril-chest".
        f. After the "container-open" index should be an object with two key value pairs. The first key value should be 'yes': "You open the chest and remove it's contents". The second key value should be 'no': 'You decide to not open the chest and move on'. The contents of these containers should not be referenced in the story.
        10. The second to last index should read "You look at the map and pick your next location to travel to."
        11. The last index should read "end".
        12. Each string in the array should be built with wrapping double "" and any name reference within the string should be wrapped with single quotes ''
        13. The response to this prompt should not include any additional text other than the story array.
        14. Do not incude any text after the index with the value of "end".
        15. Do not leave indexes empty`;
    }
};
export default storyGPTPrompt;
