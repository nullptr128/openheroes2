/**
 * OpenHeroes2
 * 
 * This autoborder processor creates a borders from various land terrains towards
 * water or towards sand (grass->water and grass->sand uses same borders ex.).
 */

import IAutoBorderProcessor from './IAutoBorderProcessor';
import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';
import ITerrainData from '../../../Common/Types/ITerrainData';

const TerrainOuterBorders: IAutoBorderProcessor[] = [
    Terrain.GRASS , Terrain.DIRT , Terrain.SNOW , Terrain.SWAMP ,
    Terrain.LAVA , Terrain.ROUGH , Terrain.DESERT
].map( terrain => {

    return {
        
        sources: {
            'W': t => t === Terrain.WATER || t === Terrain.SAND || t === null , // 'W' -> either water or sand
            'L': t => t === terrain && t !== null , // L -> current terrain
            '?': t => true , // ? -> any
        } ,
        
        outputs: {
            'v': { sprites: TerrainData[ terrain ].basicBorders.vertical } , // vertical border
            'h': { sprites: TerrainData[ terrain ].basicBorders.horizontal } , // horizontal border
            'i': { sprites: TerrainData[ terrain ].basicBorders.innerCorner } , // inner border            
            'o': { sprites: TerrainData[ terrain ].basicBorders.outerCorner } , // outer border
            '?': null ,
        } ,

        matchers: [

            // vertical border
            {
                in: [ 'W' , '?' ,
                      'L' , '?' ] ,

                out: [ '?' , '?' ,
                       'v' , '?' ] ,

                priority: 1 ,

            } ,

            // horizontal border
            {
                in: [ 'L' , 'W' ,
                      '?' , '?' ] ,

                out: [ 'h' , '?' ,
                       '?' , '?' ] ,

                priority: 1 ,
            } ,

            // inner border
            {
                in: [ 'L' , 'W' ,
                      'L' , 'L' ] ,

                out: [ '?' , '?' ,
                       'i' , '?' ] ,

                priority: 2 ,
            } ,

            // outer border
            {
                in: [ 'W' , 'W' ,
                      'L' , 'W' ] ,

                out: [ '?' , '?' ,
                       'o' , '?' ] ,

                priority: 2 ,
            } ,

        ] ,

    } as IAutoBorderProcessor ;

} );

export default TerrainOuterBorders;
