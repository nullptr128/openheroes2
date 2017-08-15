/**
 * OpenHeroes2
 * 
 * This autoborder pipeline tries to fix some bad tile
 * combinations that AutoFixer cannot find.
 */

import Terrain from '../../../Common/Types/Terrain';
import IAutoBorderProcessor from './IAutoBorderProcessor';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';

const BadTileBorders: IAutoBorderProcessor[] = [
    Terrain.GRASS , Terrain.DIRT , Terrain.SNOW , Terrain.SWAMP ,
    Terrain.LAVA , Terrain.ROUGH , Terrain.DESERT , Terrain.WATER ,
].map( terrain => {

    return {
        
        sources: {
            'O': t => t !== terrain ,
            'L': t => t === terrain && t !== null ,
            '?': t => true ,
        } ,
        
        outputs: {
            'c': { sprites: TerrainData[ terrain ].basicTiles , terrainOverride: terrain } ,
            '?': null ,
        } ,

        matchers: [

            // x-fixer
            {
                in: [ 'L' , 'O' ,
                      'O' , 'L' ] ,

                out: [ '?' , 'c' , 
                       'c' , '?' ] ,

                priority: 0 ,
            } ,

            // "L" fixer
            {
                in: [ 'O' , 'L' , 'L' ,
                      'L' , 'L' , 'O' ,
                      '?' , '?' , '?' ] ,

                out: [ 'c' , '?' , '?' ,
                       '?' , '?' , 'c' ,
                       '?' , '?' , '?' ] ,
                       
                priority: 0 ,
            } ,

            // "L" rotated fixer
            {
                in: [ 'L' , 'O' , '?' ,
                      'L' , 'L' , '?' ,
                      'O' , 'L' , '?' ] ,
                      
                out: [ '?' , 'c' , '?' , 
                       '?' , '?' , '?' ,
                       'c' , '?' , '?' ] ,

                priority: 0 ,
            } ,

            // "gap" fixer
            {
                in: [ '?' , '?' , '?' ,
                      'O' , 'L' , 'O' ,
                      '?' , '?' , '?' ] ,

                out: [ '?' , '?' , '?' ,
                       'c' , '?' , 'c' ,
                       '?' , '?' , '?' ] ,

                priority: 0 ,
            } ,

            // "gap" rotated fixer
            {
                in: [ '?' , 'O' , '?' ,
                      '?' , 'L' , '?' ,
                      '?' , 'O' , '?' ] ,
                out: [ '?' , 'c' , '?' ,
                       '?' , '?' , '?' ,
                       '?' , 'c' , '?' ] ,
                priority: 0 ,
            } ,

        ]

    } as IAutoBorderProcessor;

} );

export default BadTileBorders;
