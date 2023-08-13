const keyStory = (keyCheck) => {
  const keyCheckStoryLibrary = {
    "iron-key-check":
    [
      "You pull out an iron key that you found through your journeys.",
      "With a knowing glance, you insert the key into the ancient door. A series of gears, pulleys, and locks start clicking and rolling, as if awoken from a long slumber.",
      "After a moment that feels an eternity, you hear a click, and a plume of dust shoots out from the door's seal, heralding secrets long hidden.",
      "As this happens, you see the key disintegrate before your very eyes, the magic spent, but the door remains open, inviting you into the unknown.",
      "trash-iron-key",
      "With a deep breath, you pull the heavy door open and enter the room, the scent of antiquity filling your nostrils.",
      "The room itself is dark, yet just enough light finds its way in to illuminate a steel chest resting in the middle of the room, a sentinel of forgotten treasures.",
      "You approach the chest, heart pounding, and open it to reveal its contents.",
      "steel-chest",
      {
         "yes": "You open the chest with a creak, and reveal its mysterious contents, a bounty only fate knows.",
         "no": "You decide not to open the chest and proceed onwards, leaving the secrets undisturbed."
      },
      "You turn your back towards the chest and leave the dark room, the decision made.",
      "As you do, the chest closes on its own, and the large iron door slams shut and locks quickly, as if chastising your departure.",
      "With your iron key gone, you're unable to re-open the door, the cave's secret safe once more.",
      "If you wish to enter the room again, you must find another key, a quest in itself.",
      "You exit the cave, hidden within the forest's embrace, and look at your map to find your next location to travel to.",
      "end"
   ]
   ,
    "mithril-key-check": [
      "Deep in the frozen crags of the northern mountains, you pull out a mithril key, gleaming in the dim light.",
      "Approaching a hidden door, wrought from pure mithril and etched with runes of a forgotten age, you insert the key.",
      "The ancient mechanism begins to move, cogs and gears meshing in harmony.",
      "After an expectant pause, there's a definitive click, and a gust of cold, ancient air escapes from the door's seal, hinting at mysteries long hidden within the mountain's heart.",
      "As this wondrous occurrence unfolds, the mithril key disintegrates before your very eyes, its purpose fulfilled, but the mithril door now stands open, a silent invitation to the unknown.",
      "trash-mithril-key",
      "Summoning your courage, you pull the heavy door open and enter the room, feeling the weight of history surround you.",
      "The room itself is a frigid sanctuary, yet just enough light finds its way in to reveal a mithril chest, resting in solemn majesty in the center of the room, a sentinel of lost secrets.",
      "With steps both hesitant and determined, you approach the chest, hands trembling, and open it to reveal its contents.",
      "mithril-chest",
      {
         "yes": "You open the chest and reveal its mysterious contents.",
         "no": "You decide not to open the chest and proceed onwards, letting the mystery linger."
      },
      "Resolute, you turn your back towards the chest and leave the room, feeling the mountain's watchful presence.",
      "As you make your exit, the chest closes on its own, and the mithril door slams shut and locks quickly, sealing the ancient secret once more.",
      "With the mithril key now a memory, you're unable to re-open the door, the mountain's mystery intact.",
      "Should you wish to enter the room again, you must find another key, a quest that could be a saga in itself.",
      "You exit the cave, now part of the mountain's lore, and survey the peaks to determine your next destination.",
      "end"
   ]
  }
  const getStory = keyCheckStoryLibrary[keyCheck]
  return getStory
}

export default keyStory;