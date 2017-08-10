/**
 * OpenHeroes2
 * 
 * This interface defines a shape of basic OpenHeroes2 map tile.
 */

import Terrain from '../Types/Terrain';

interface ITile {
    x: number;
    y: number;
    terrain: Terrain;
    spriteId: number;
    mirror: boolean;
    flip: boolean;
}

export default ITile;
