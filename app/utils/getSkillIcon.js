import {
  GiMailedFist,
  GiBullHorns,
  GiBrute,
  GiDeadlyStrike,
  GiEarthCrack,
  GiWhirlwind,
  GiBroadsword,
  GiPointySword,
  GiBiceps,
  GiBurningPassion,
  GiPowerLightning,
  GiLightningTree,
  GiFireball,
  GiIceSpear,
  GiCometSpark,
  GiBeamWake,
  GiTentacleHeart,
  GiAura,
  GiDrippingBlade,
  GiBellShield,
  GiBloodyStash,
  GiSkullCrack,
  GiButterflyKnife,
  GiFleshyMass,
  GiClawSlashes,
  GiCowled,
  GiFist,
} from "react-icons/gi";

function getSkillIcon(skillName) {
  switch (skillName) {
    // Warrior Skills
    case "Bash": {
      return <GiMailedFist />;
    }
    case "Body Slam": {
      return <GiBrute />;
    }
    case "Furious Charge": {
      return <GiBullHorns />;
    }
    case "Mighty Slam": {
      return <GiEarthCrack />;
    }
    case "Zen Slash": {
      return <GiBroadsword />;
    }
    case "Charge Blade": {
      return <GiPointySword />;
    }
    case "Second Wind": {
      return <GiBiceps />;
    }
    case "Focus Zen": {
      return <GiBurningPassion />;
    }
    case "Whirlwind": {
      return <GiWhirlwind />;
    }
    // Mage Skills
    case "Zap": {
      return <GiPowerLightning />;
    }
    case "Fire Ball": {
      return <GiFireball />;
    }
    case "Ice Spear": {
      return <GiIceSpear />;
    }
    case "Lightning Storm": {
      return <GiLightningTree />;
    }
    case "Magic Missle": {
      return <GiCometSpark />;
    }
    case "Mystic Beam": {
      return <GiBeamWake />;
    }
    case "Mystic Heal": {
      return <GiTentacleHeart />;
    }
    case "Mystic Recovery": {
      return <GiAura />;
    }
    case "Magic Rage": {
      return <GiDeadlyStrike />;
    }
    // Assassin Skills
    case "Quick Jab": {
      return <GiFist />;
    }
    case "Hidden Blade": {
      return <GiButterflyKnife />;
    }
    case "Death's Touch": {
      return <GiSkullCrack />;
    }
    case "Thousand Cuts": {
      return <GiBloodyStash />;
    }
    case "Shadow Strike": {
      return <GiClawSlashes />;
    }
    case "Creeping Darkness": {
      return <GiFleshyMass />;
    }
    case "Life Leech": {
      return <GiDrippingBlade />;
    }
    case "Shadow Restore": {
      return <GiBellShield />;
    }
    case "Assassinate": {
      return <GiCowled />;
    }
  }
}

export default getSkillIcon;
