const getRegionImage = (area) => {
  switch (area) {
    case "desolateBeach": {
      return "./desolate_beach.png";
    }
    case "southernGateway": {
      return "./southern_gateway_region.png";
    }
    case "easternDesert": {
      return "./desert_region.png";
    }
    case "southernForest": {
      return "./forest_region_1.png";
    }
    case "tradersCrossroads": {
      return "./traders_crossroads_region.png";
    }
    case "bartusVillage": {
      return "./abandoned_village_region_1.png";
    }
    case "shroudedHollow": {
      return "./cemetary_region_1.png";
    }
    case "telletLake": {
      return "./tellet_lake_region.png";
    }
    case "murkwoodMarsh": {
      return "./swamp_region.png";
    }
    case "blackspinePeaks": {
      return "./mountain_region_1.png";
    }
    case "dragonsTearRiver": {
      return "./river_region_1.png";
    }
    case "dunesOfTheDamned": {
      return "./dunes_of_the_damned_region.png";
    }
    case "dragonsDescentTemple": {
      return "./mountain_shrine_region.png";
    }
    case "goldenRuins": {
      return "./golden_ruins_region.png";
    }
    case "verdantis": {
      return "./verdantis_city.png";
    }
    case "panStraneArena": {
      return "./pan_strane_arena.png";
    }
    case "anvilorn": {
      return "./anvilorn_city.png";
    }
    case "forgottenForest": {
      return "./dark_forest_region_1.png";
    }
    case "northrendAscent": {
      return "./mountain_region_2.png";
    }
    case "eldoria": {
      return "./eldoria_city.png";
    }
    default:
      return null;
  }
};

export default getRegionImage;
