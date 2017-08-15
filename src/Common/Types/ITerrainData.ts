/**
 * OpenHeroes2
 * 
 * This interface defines a shape of TerrainData[] element.
 */

import Terrain from './Terrain';
import ITerrainBorders from './ITerrainBorders';
import IColor from './IColor';

interface ITerrainData {
    color: IColor; // minimap color
    terrain: Terrain; // terrain
    tilFile: string; // name of .til file
    basicTiles: number[]; // array of basic tile sprites
    decorationTiles: number[]; // array of decorated (rare) tile sprites
    basicBorders: ITerrainBorders; // array of basic (sand) tile borders
    junctionBorders: ITerrainBorders; // array of junction (brown) tile borders
    multiBorders: number[]; // array of multi (sand+brown) tile borders
}

export default ITerrainData;
