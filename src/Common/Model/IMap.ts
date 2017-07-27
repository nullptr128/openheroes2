/**
 * OpenHeroes2
 * 
 * This interface defines a shape of basic OpenHeroes2 map.
 */

import ITile from './ITile';

interface IMap {
    name: string;
    description: string;
    size: number;
    tiles: ITile[][];
}

export default IMap;
