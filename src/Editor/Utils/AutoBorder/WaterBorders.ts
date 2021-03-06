/**
 * OpenHeroes2
 * 
 * This autoborder processor creates outer borders from water to any land.
 */

import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';
import ITerrainBorders from '../../../Common/Types/ITerrainBorders';
import IAutoBorderProcessor from './IAutoBorderProcessor';

const water = TerrainData[ Terrain.WATER ];

const WaterBorders: IAutoBorderProcessor = {

    sources: {
        'W': t => t === Terrain.WATER || t === null , // 'W' -> water tile
        'L': t => t !== Terrain.WATER && t !== null , // 'L' -> land tile
        '?': t => true , // '?' -> any tile
    } ,

    outputs: {
        'vb': { sprites: water.basicBorders.vertical } , // vertical border
        'hb': { sprites: water.basicBorders.horizontal } , // horizontal border
        'ib': { sprites: water.basicBorders.innerCorner } , // inner border
        'ob': { sprites: water.basicBorders.outerCorner } , // outer border
        '??': null ,
    } ,

    matchers: [

        // vertical border
        {
            in: [ '?','L',
                  '?','W' ] ,
            
            out: [ '??' , '??',
                   '??' , 'vb' ] ,

            priority: 1 ,

        } ,

        // horizontal border
        {
            in: [ '?' , '?' ,
                  'W' , 'L' ] ,
      
            out: [ '??' , '??' ,
                   'hb' , '??' ] ,

            priority: 1 ,
        } ,

        // inner border
        {
            in: [ 'W' , 'L' ,
                  'W' , 'W' ] ,

            out: [ '??' , '??' ,
                   'ib' , '??' ] ,
                   
            priority: 2 ,
        } ,

        // outer border
        {
            in: [ 'L' , 'L' ,
                  'W' , 'L' ] ,
            
            out: [ '??' , '??' ,
                   'ob' , '??' ] ,

            priority: 2 ,
        } ,

    ] ,

};

export default WaterBorders;
