/**
 * OpenHeroes2
 * 
 * This AutoBorder processor processes the most difficult situations
 * where a 3-way border is needed. The case is when two different
 * terrains on land meet themeselves in proximity of water/sand.
 * 
 * There are 6 different three-way borders and all of them are
 * processed in this file.
 */

import IAutoBorderProcessor from './IAutoBorderProcessor';
import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';

const TerrainMultiBorders: IAutoBorderProcessor[] = [
    Terrain.GRASS , Terrain.SNOW , Terrain.SWAMP ,
    Terrain.LAVA , Terrain.ROUGH , Terrain.DESERT
].map( terrain => {
    return {

        sources: {
            'S': t => t === Terrain.WATER || t === Terrain.SAND , // 'S' -> "sandy" terrain (water or sand)
            'L': t => t === terrain , // L -> current terrain
            'O': t => t !== terrain && t !== Terrain.WATER && t !== Terrain.SAND && t !== null , // O -> other terrain but no "sandy"
            '?': t => true , // any
        } ,

        outputs: {
            '0': { sprites: [ TerrainData[ terrain ].multiBorders[0] ] } , // multi border 1
            '1': { sprites: [ TerrainData[ terrain ].multiBorders[1] ] } , // multi border 2
            '2': { sprites: [ TerrainData[ terrain ].multiBorders[2] ] } , // multi border 3
            '3': { sprites: [ TerrainData[ terrain ].multiBorders[3] ] } , // multi border 4
            '4': { sprites: [ TerrainData[ terrain ].multiBorders[4] ] } , // multi border 5
            '5': { sprites: [ TerrainData[ terrain ].multiBorders[5] ] } , // mulit obrder 6
        } ,

        matchers: [

            // multi border #0
            {
                in: [ '?' , 'O' , 'O' ,
                      '?' , 'L' , 'O' ,
                      '?' , 'L' , 'S' ] ,
                out: [ '?' , '?' , '?' ,
                       '?' , '0' , '?' ,
                       '?' , '?' , '?' ] ,
                priority: 5 ,
            } ,

            // multi border #1
            {
                in: [ 'S' , 'O' , 'O' ,
                      'L' , 'L' , 'O' ,
                      '?' , '?' , '?' ] ,
                out: [ '?' , '?' , '?' , 
                       '?' , '1' , '?' ,
                       '?' , '?' , '?' ] ,
                priority: 5 ,
            },

            // multi border #2
            {
                in: [ 'O' , 'S' ,
                      'L' , 'L' ],
                out: [ '?' , '?' ,
                       '2' , '?' ] ,
                priority: 5 ,
            } ,
            
            // multi border #3
            {
                in: [ 'L' , 'S' ,
                      'L' , 'O' ] ,
                out: [ '?' , '?' ,
                       '3' , '?' ] ,
                priority: 5 ,
            } ,

            // multi border #4
            {
                in: [ 'S' , '?' ,
                      'L' , 'O' ] ,
                out: [ '?' , '?' ,
                       '4' , '?' ] ,
                priority: 5 ,
            } ,

            // multi border #5
            {
                in: [ 'O' , '?' ,
                      'L' , 'S' ] ,
                out: [ '?' , '?' ,
                       '5' , '?' ] ,
                priority: 5 ,
            } ,

        ] ,

    } as IAutoBorderProcessor;
} );

export default TerrainMultiBorders;
