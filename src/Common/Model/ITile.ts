/**
 * OpenHeroes2
 * 
 * This interface defines a shape of basic OpenHeroes2 map tile.
 */

import Terrain from '../Types/Terrain';
import Nullable from '../Support/Nullable';

interface ITile {
    x: number;
    y: number;
    terrain: Terrain;
    spriteId: number;
    mirror: boolean;
    flip: boolean;
    borderPriority: number;
    isRiver: boolean;
    isRoad: boolean;
    riverSprite: Nullable<number>;
    roadSprite: Nullable<number>;
    debug: boolean;
}

export default ITile;
