
import Terrain from './Terrain';
import ITerrainBorders from './ITerrainBorders';
import IColor from './IColor';

interface ITerrainData {
    color: IColor;
    terrain: Terrain;
    tilFile: string;
    basicTiles: number[];
    decorationTiles: number[];
    junctionBorders: ITerrainBorders;
    basicBorders: ITerrainBorders;
    multiBorders: number[];
}

export default ITerrainData;
