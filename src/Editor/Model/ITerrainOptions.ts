/**
 * OpenHeroes2
 * 
 * This struct holds currently selected options in
 * terrain placing mode.
 */

import Terrain from '../../Common/Types/Terrain';

interface ITerrainOptions {
    terrain: Terrain;
    altTerrain: Terrain;
    brushSize: number;
}

export default ITerrainOptions;
