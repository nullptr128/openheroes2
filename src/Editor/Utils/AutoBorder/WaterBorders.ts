
import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';
import ITerrainBorders from '../../../Common/Types/ITerrainBorders';
import IAutoBorderProcessor from './IAutoBorderProcessor';

const water = TerrainData[ Terrain.WATER ];

const WaterBorders: IAutoBorderProcessor = {

    sources: {
        'W': t => t === Terrain.WATER || t === null ,
        'L': t => t !== Terrain.WATER && t !== null ,
        '?': t => true ,
    } ,

    outputs: {
        'vb': water.basicBorders.vertical ,
        'hb': water.basicBorders.horizontal ,
        'ib': water.basicBorders.innerCorner ,
        'ob': water.basicBorders.outerCorner ,
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
