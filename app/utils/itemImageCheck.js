const itemQualityCheck = (itemName) => {
  switch (itemName) {

    /* -- CONSUMABLES-- */
    // Potions
    case "Small Health Potion": {
      return "./small_health_vial.png";
    }
    case "Medium Health Potion": {
      return "./medium_health_vial.png";
    }
    case "Large Health Potion": {
      return "./large_health_vial.png";
    }
    case "Full Health Potion": {
      return "./full_health_vial.png";
    }
    case "Small Energy Potion": {
      return "./small_energy_vial.png";
    }
    case "Medium Energy Potion": {
      return "./medium_energy_vial.png";
    }
    case "Large Energy Potion": {
      return "./large_energy_vial.png";
    }
    case "Full Energy Potion": {
      return "./full_energy_vial.png";
    }
    case "Small Restore Potion": {
      return "./small_restore_vial.png";
    }
    case "Medium Restore Potion": {
      return "./medium_restore_vial.png";
    }
    case "Large Restore Potion": {
      return "./large_restore_vial.png";
    }
    case "Full Restore Potion": {
      return "./full_restore_vial.png";
    }

    // Food
    case "Apple": {
      return "./apple.png";
    }
    case "Banana": {
      return "./banana.png";
    }


    /* -- WARRIOR GEAR -- */
    // Warrior Main Hand
    case "Rusty Iron Sword": {
      return "./rusty_iron_sword.png";
    }
    case "Iron Sword": {
      return "./iron_sword.png";
    }
    case "Steel Sword": {
      return "./steel_sword.png";
    }
    case "Decorated Steel Sword": {
      return "./decorated_steel_sword.png";
    }
    case "Mithril Sword": {
      return "./mithril_sword.png";
    }
    case "Transcendent Mithril Sword": {
      return "./transcendant_mithril.png";
    }

    // Warrior Off Hand
    case "Rusty Iron Shield": {
      return "./rusty_iron_shield.png";
    }
    case "Iron Shield": {
      return "./iron_Shield.png";
    }
    case "Steel Shield": {
      return "./steel_shield.png";
    }
    case "Decorated Steel Shield": {
      return "./decorated_steel_shield.png";
    }
    case "Mithril Shield": {
      return "./mithril_shield.png";
    }
    case "Transcendent Mithril Shield": {
      return "./transcendent_mithril_shield.png";
    }

    // Warrior Armor
    case "Rusty Iron Armor": {
      return "./rusty_iron_armor.png";
    }
    case "Iron Armor": {
      return "./iron_armor.png";
    }
    case "Steel Armor": {
      return "./steel_armor.png";
    }
    case "Decorated Steel Armor": {
      return "./decorated_steel_armor.png";
    }
    case "Mithril Armor": {
      return "./mithril_armor.png";
    }
    case "Transcendent Mithril Armor": {
      return "./transcendent_mithril_armor.png";
    }


    /* -- MAGE GEAR -- */
    // Mage Main Hand
    case "Old Wood Magic Staff": {
      return "./old_wood_magic_staff.png";
    }
    case "Uncommon Wood Magic Staff": {
      return "./uncommon_wood_magic_staff.png";
    }
    case "Carved Wood Magic Staff": {
      return "./carved_wood_magic_staff.png";
    }
    case "Decorated Wood Magic Staff": {
      return "./decoraded_magic_staff.png";
    }
    case "Enchanted Wood Magic Staff": {
      return "./enchanted_wood_magic_staff.png";
    }
    case "Transcendent Wood Magic Staff": {
      return "./transcendent_magic_staff.png";
    }

    // Mage Off Hand
    case "Magic Notes": {
      return "./magic_notes.png";
    }
    case "Magic Book": {
      return "./magic_book.png";
    }
    case "Decorated Magic Book": {
      return "./decorated_magic_book.png";
    }
    case "Scratched Magic Orb": {
      return "./scratched_magic_orb.png";
    }
    case "Magic Orb": {
      return "./magic_orb.png";
    }
    case "Transcendent Magic Orb": {
      return "./transcendent_magic_orb.png";
    }

    // Mage Armor
    case "Tattered Magic Robes": {
      return "./tattered_magic_robes.png";
    }
    case "Cloth Magic Robes": {
      return "./magic_robes.png";
    }
    case "Styled Magic Robes": {
      return "./styled_magic_robes.png";
    }
    case "Decorated Magic Robes": {
      return "./decorated_magic_robes.png";
    }
    case "Enchanted Magic Robes": {
      return "./enchanted_magic_robes.png";
    }
    case "Transcendent Magic Robes": {
      return "./transcendent_magic_robes.png";
    }


    /* -- ASSASSIN GEAR -- */
    // Assassin Main Hand
    case "Rusty Iron Main Hand Dagger": {
      return "./rusty_iron_main_hand_dagger.png";
    }
    case "Iron Main Hand Dagger": {
      return "./iron_main_hand_dagger.png";
    }
    case "Steel Main Hand Dagger": {
      return "./steel_main_hand_dagger.png";
    }
    case "Decorated Steel Main Hand Dagger": {
      return "./decorated_steel_main_hand_dagger.png";
    }
    case "Mithril Main Hand Dagger": {
      return "./mithril_main_hand_dagger.png";
    }
    case "Transcendent Mithril Main Hand Dagger": {
      return "./transcendent_mithril_main_hand_dagger.png";
    }

    // Assassin Off Hand
    case "Rusty Iron Off Hand Dagger": {
      return "./rusty_iron_off_hand_dagger.png";
    }
    case "Iron Off Hand Dagger": {
      return "./iron_off_hand_dagger.png";
    }
    case "Steel Off Hand Dagger": {
      return "./steel_off_hand_dagger.png";
    }
    case "Decorated Steel Off Hand Dagger": {
      return "./decorated_steel_off_hand_dagger.png";
    }
    case "Mithril Off Hand Dagger": {
      return "./mithril_off_hand_dagger.png";
    }
    case "Transcendent Mithril Off Hand Dagger": {
      return "./transcendent_mithril_off_hand_dagger.png";
    }

    // Assassin Armor
    case "Worn Leather Armor": {
      return "./worn_leather_armor.png";
    }
    case "Leather Armor": {
      return "./leather_armor.png";
    }
    case "Polished Leather Armor": {
      return "./polished_leather_armor.png";
    }
    case "Studded Leather Armor": {
      return "./studded_leather_armor.png";
    }
    case "Enchanted Studded Leather Armor": {
      return "./enchanted_studded_leather_armor.png";
    }
    case "Transcendent Studded Leather Armor": {
      return "./transcendent_studded_leather_armor.png";
    }


    /* -- MISC -- */
    case "Carved Cube": {
      return "./small_cube.png";
    }
    case "Rusty Spoon": {
      return "./rusty_spoon.png";
    }
    case "Iron Key": {
      return "./small_iron_key.png";
    }
    case "Mithril Key": {
      return "./small_mithril_key.png";
    }
    case "Rusty Fork": {
      return "./rusty_fork.png";
    }
    case "Small Boot": {
      return "./old_boot.png";
    }
    case "Dragon Toy": {
      return "./dragon_toy.png";
    }
    case "Dirty Underwear": {
      return "./dirty_underwear.png";
    }
    case "Small Rock": {
      return "./small_rock.png";
    }


    /* -- DEFAULT CASE -- */
    default:
      return null;
  }
};

export default itemQualityCheck;
