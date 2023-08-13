const getArenaScript = (enemies) => {
  const arenaScript = [
    "After teleporting by the enchanted magic map, a sudden chill takes over your body as you find yourself in a massive arena sculpted from ancient stone.",
    "You enter the grand arena...",
    "Around you, hundreds of gladiators roam the shadowy halls, their eyes reflecting stories of battles won and lost.",
    "Their scars are a testament to their skill and courage.",
    "The distant cheers and roars of an impatient crowd echo through the labyrinthine passages, filling your heart with a mixture of anticipation and trepidation.",
    "Guided by destiny or perhaps mere curiosity, you make your way to the registration area.",
    "The clerk, a stern figure with knowing eyes, assigns you to your first match without a word.",
    "Before you can step into the arena, a wise and battle-worn veteran takes you aside.",
    "His voice, though cracked with age, carries the weight of experience:",
    "'Remember, young warrior, leave and you must start at the bottom.'",
    "'Your highest level, however, will be etched in history, a legacy in these hallowed halls.'",
    "You step foot into the area circle."
  ];

  const addEnemies = () => {

    enemies.sort((a, b) => a.level - b.level);

    for (let i = 1; i < 33; i++) {

      let enemyNumberFollow = 'th'

      const numberCheck = () => {
        if (i === 1 || i === 21 || i === 31) {
          enemyNumberFollow = 'st'
        } else if (i === 2 || i === 22 || i === 32) {
          enemyNumberFollow = 'nd'
        } else if (i === 3 || i === 23 || i === 33) {
          enemyNumberFollow = 'rd'
        } else {
          enemyNumberFollow = 'th'
        }
      }

      numberCheck()

      if (!enemies[i]) {
        console.warn(`Enemy at index ${i} is undefined`);
        continue; // Skip to next iteration if the enemy is undefined
      }
      arenaScript.push("With your weapon in hand and resolve in your heart, you prepare to face your enemy. The gate creaks open, and the cheers grow louder...");
      arenaScript.push(`Your ${i + enemyNumberFollow} enemy approaches...`);
      arenaScript.push(`It's a ${enemies[i].name}!`);
      arenaScript.push({race: enemies[i].race, level: enemies[i].level, area: enemies[i].area});
      arenaScript.push("arena-level-up");
      arenaScript.push("Victory is yours, but there's no time for celebration. The next challenge awaits. Your body aches, yet your spirit is unbroken. Once more, you prepare to face your enemy...");
    }
  }

  addEnemies()
  arenaScript.push("The crowd errupts in excitment!")
  arenaScript.push("A new Champion walks amoung them!")
  arenaScript.push("As you bask in fame and glory, a gladiator approaches...")
  arenaScript.push("'There is no one in the land that stands to your might.'")
  arenaScript.push("'You are truly, a champion of the realm and no one dare cross your path.'")
  arenaScript.push("'Just to be in your presents is an honor for any.'")
  arenaScript.push("As you receive love and praise from the whole of Pan Strane, you wonder if there are any other challenges that rival your most recent accomplishment.")
  arenaScript.push("You make your way out of the arena.")
  arenaScript.push("As you depart the arena's oversear approaches and awards you the 'Champion's Prize'.")
  arenaScript.push("'Enjoy your reward Champion, you've earned it'.")
  arenaScript.push("As the oversear leaves, you pull out your map and choose your next destination as the 'Champion of Pan Strane'!")
  arenaScript.push("end.")

  return arenaScript
}

export default getArenaScript