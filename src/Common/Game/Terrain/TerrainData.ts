import ITerrainData from '../../Types/ITerrainData';
import Terrain from '../../Types/Terrain';
import Arrays from '../../Support/Arrays';

const TerrainData: ITerrainData[] = new Array<ITerrainData>( 10 );

// Water
TerrainData[ Terrain.WATER ] = {
    color: { r: 140 , g: 175 , b: 230 , a: 255 } ,
    terrain: Terrain.WATER ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createNumberArray( 16 , 29 ) ,
    decorationTiles: Arrays.createNumberArray( 16 , 29 ) ,
    basicBorders: {
        vertical: Arrays.createNumberArray( 0 , 3 ) ,
        outerCorner: Arrays.createNumberArray( 4 , 7 ) ,
        horizontal: Arrays.createNumberArray( 8 , 11 ) ,
        innerCorner: Arrays.createNumberArray( 12 , 15 ) ,
    } ,
    junctionBorders: {
        vertical: Arrays.createNumberArray( 0 , 3 ) ,
        outerCorner: Arrays.createNumberArray( 4 , 7 ) ,
        horizontal: Arrays.createNumberArray( 8 , 11 ) ,
        innerCorner: Arrays.createNumberArray( 12 , 15 ) ,
    } ,
};

export default TerrainData;


/**
 * TerrainColor[ Terrain.WATER ]   = { r: 140 , g: 175 , b: 230 , a: 255 };
TerrainColor[ Terrain.GRASS ]   = { r: 130 , g: 168 , b: 109 , a: 255 };
TerrainColor[ Terrain.DIRT ]    = { r: 168 , g: 137 , b: 109 , a: 255 };
TerrainColor[ Terrain.SNOW ]    = { r: 224 , g: 224 , b: 224 , a: 255 };
TerrainColor[ Terrain.SWAMP ]   = { r:  82 , g:  89 , b:  77 , a: 255 };
TerrainColor[ Terrain.LAVA ]    = { r:  91 , g:  80 , b:  80 , a: 255 };
TerrainColor[ Terrain.ROUGH ]   = { r: 196 , g: 173 , b: 123 , a: 255 };
TerrainColor[ Terrain.DESERT ]  = { r: 216 , g: 213 , b: 151 , a: 255 };
TerrainColor[ Terrain.SAND ]    = { r: 244 , g: 231 , b: 183 , a: 255 };
TerrainColor[ Terrain.HIDDEN ]  = { r:   0 , g:   0 , b:   0 , a:   0 };

 */