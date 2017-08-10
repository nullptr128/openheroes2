import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';
import ITerrainBorders from '../../../Common/Types/ITerrainBorders';
import IAutoBorderProcessor from './IAutoBorderProcessor';

const water = TerrainData[ Terrain.WATER ];

const WaterBorders: IAutoBorderProcessor = {

    sources: {
        'W': t => t == Terrain.WATER ,
        'L': t => t != Terrain.WATER ,
        '?': t => true ,
    } ,

    outputs: {
        'uuu': { sprites: water.basicBorders.vertical , flip: true } ,
        'ddd': { sprites: water.basicBorders.vertical } ,
        'lll': { sprites: water.basicBorders.horizontal } ,
        'rrr': { sprites: water.basicBorders.horizontal , mirror: true } ,
        'otl': { sprites: water.basicBorders.innerCorner , flip: true } ,
        'otr': { sprites: water.basicBorders.innerCorner , mirror: true , flip: true } ,
        'obl': { sprites: water.basicBorders.innerCorner } ,
        'obr': { sprites: water.basicBorders.innerCorner , mirror: true } ,
        'itl': { sprites: water.basicBorders.outerCorner , flip: true } ,
        'itr': { sprites: water.basicBorders.outerCorner , mirror: true , flip: true } ,
        'ibl': { sprites: water.basicBorders.outerCorner } ,
        'ibr': { sprites: water.basicBorders.outerCorner , mirror: true } ,
        '???': null ,
    } ,

    matchers: [

        // top border
        {
            in: [ '?','W','?',
                  '?','L','?',
                  '?','?','?' ] ,

            out: [ '???' , 'uuu' , '???' ,
                   '???' , '???' , '???' ,
                   '???' , '???' , '???' ] ,

        } ,

        // bottom border
        {
            in: [ '?','L','?',
                  '?','W','?',
                  '?','?','?'] ,
            
            out: [ '???' , '???' , '???' ,
                   '???' , 'ddd' , '???' ,
                   '???' , '???' , '???' ] ,

        } ,

        // left border
        {
            in: [ '?','?','?',
                  'W','L','?',
                  '?','?','?' ],
            
            out: [ '???' , '???' , '???' ,
                   'lll' , '???' , '???' ,
                   '???' , '???' , '???' ],
        } ,

        // right corner
        {
            in: [ '?','?','?',
                  'L','W','?',
                  '?','?','?' ],

            out: [ '???' , '???' , '???' ,
                   '???' , 'rrr' , '???',
                   '???' , '???' , '???' ],
        } ,

        // top-left corner
        {
            in: [ 'W' , 'W' , '?' ,
                  'W' , 'L' , '?' ,
                  '?' , '?' , '?' ] ,

            out: [ 'otl' , '???' , '???' ,
                   '???' , '???' , '???' ,
                   '???' , '???' , '???' ] ,                
        } ,

        // top-right corner
        {
            in: [ 'W' , 'W' , '?' ,
                  'L' , 'W' , '?' ,
                  '?' , '?' , '?' ] ,
        
            out: [ '???' , 'otr' , '???' ,
                   '???' , '???' , '???' ,
                   '???' , '???' , '???' ] ,
        } ,

        // bottom-left corner
        {
            in: [ 'W' , 'L' , '?' ,
                  'W' , 'W' , '?' ,
                  '?' , '?' , '?' ] ,

            out: [ '???' , '???' , '???' ,
                   'obl' , '???' , '???' ,
                   '???' , '???' , '???' ] ,
        } ,

        // bottom-right corner
        {
            in: [ 'L' , 'W' , '?' ,
                  'W' , 'W' , '?' ,
                  '?' , '?' , '?' ] ,
            
            out: [ '???' , '???' , '???' ,
                   '???' , 'obr' , '???' ,
                   '???' , '???' , '???' ] ,
        } ,

        // top-left inner corner
        {
            in: [ 'W' , 'L' , '?' ,
                  'L' , 'L' , '?' ,
                  '?' , '?' , '?' ] ,

            out: [ 'itl' , '???' , '???' ,
                   '???' , '???' , '???' ,
                   '???' , '???' , '???' ] ,
        } ,

        // top-right inner corner
        {
            in: [ 'L' , 'W' , '?' ,
                  'L' , 'L' , '?' ,
                  '?' , '?' , '?' ] ,

            out: [ '???' , 'itr' , '???' ,
                   '???' , '???' , '???' ,
                   '???' , '???' , '???' ] ,

        } ,

        // bottom-left inner corner
        {
            in: [ 'L' , 'L' , '?' ,
                  'W' , 'L' , '?' ,
                  '?' , '?' , '?' ] ,

            out: [ '???' , '???' , '???' ,
                   'ibl' , '???' , '???' ,
                   '???' , '???' , '???' ] ,
        } ,

        // bottom-right inner corner
        {
            in: [ 'L' , 'L' , '?' ,
                  'L' , 'W' , '?' ,
                  '?' , '?' , '?' ] ,

            out: [ '???' , '???' , '???' ,
                   '???' , 'ibr' , '???' ,
                   '???' , '???' , '???' ] ,
        } ,

    ] ,

};

export default WaterBorders;
