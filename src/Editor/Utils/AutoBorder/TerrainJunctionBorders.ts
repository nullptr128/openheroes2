/**
 * OpenHeroes2
 * 
 * AutoBorder processor that processes borders junctioning different types of 
 * terrain using brown (dirt) borders. For example when grass meets snow on
 * land.
 */

import IAutoBorderProcessor from './IAutoBorderProcessor';
import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';

const TerrainJunctionBorders: IAutoBorderProcessor[] = [
    Terrain.GRASS , Terrain.SNOW , Terrain.SWAMP ,
    Terrain.LAVA , Terrain.ROUGH , Terrain.DESERT
].map( terrain => {
    return {

        sources: {
            // 'O' -> different terrain but no water nor sand (as they not use brown borders)
            'O': t => t !== terrain && t !== Terrain.WATER && t !== Terrain.SAND && t !== null ,
            // 'L' -> current terrain
            'L': t => t === terrain ,
            '?': t => true ,
        } ,

        outputs: {
            'v': { sprites: TerrainData[ terrain ].junctionBorders.vertical } ,
            'h': { sprites: TerrainData[ terrain ].junctionBorders.horizontal } ,
            'i': { sprites: TerrainData[ terrain ].junctionBorders.innerCorner } ,
            'o': { sprites: TerrainData[ terrain ].junctionBorders.outerCorner } ,
            '?': null ,
        } ,

        matchers: [

            // vertical border
            {
                in: [ 'O' , '?' ,
                      'L' , '?' ] ,

                out: [ '?' , '?' ,
                       'v' , '?' ] ,

                priority: 3 ,
            } ,

            // horizontal border
            {
                in: [ 'L' , 'O' ,
                      '?' , '?' ] ,

                out: [ 'h' , '?' ,
                       '?' , '?' ] ,
                
                priority: 3 ,
            } ,

            // inner corner
            {
                in: [ 'L' , 'O' ,
                      'L' , 'L' ] ,

                out: [ '?' , '?' ,
                       'i' , '?' ] ,

                priority: 4 ,
            } ,
            
            // outer corner 
            {
                in: [ 'O' , 'O' ,
                      'L' , 'O' ] ,

                out: [ '?' , '?' ,
                       'o' , '?' ] ,

                priority: 4 ,
            } ,

        ] ,

    } as IAutoBorderProcessor;
} );

export default TerrainJunctionBorders;
