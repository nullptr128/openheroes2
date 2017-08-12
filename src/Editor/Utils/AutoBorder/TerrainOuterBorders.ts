
import IAutoBorderProcessor from './IAutoBorderProcessor';
import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';
import ITerrainData from '../../../Common/Types/ITerrainData';

const TerrainOuterBorders: IAutoBorderProcessor[] = [
    Terrain.GRASS , Terrain.DIRT , Terrain.SNOW , Terrain.SWAMP ,
    Terrain.LAVA , Terrain.ROUGH , Terrain.DESERT
].map( terrain => {

    const processor: IAutoBorderProcessor = {

        sources: {
            'W': t => t === Terrain.WATER || t === Terrain.SAND || t === null ,
            'L': t => t === terrain && t !== null ,
            '?': t => true ,
        } ,

        outputs: {
            'uuu': { sprites: TerrainData[ terrain ].basicBorders.vertical } ,
            'ddd': { sprites: TerrainData[ terrain ].basicBorders.vertical , flip: true } ,
            'lll': { sprites: TerrainData[ terrain ].basicBorders.horizontal , mirror: true } ,
            'rrr': { sprites: TerrainData[ terrain ].basicBorders.horizontal } ,
            'otl': { sprites: TerrainData[ terrain ].basicBorders.outerCorner , mirror: true } ,
            'otr': { sprites: TerrainData[ terrain ].basicBorders.outerCorner } ,
            'obl': { sprites: TerrainData[ terrain ].basicBorders.outerCorner , mirror: true , flip: true } ,
            'obr': { sprites: TerrainData[ terrain ].basicBorders.outerCorner , flip: true } ,
            'itl': { sprites: TerrainData[ terrain ].basicBorders.innerCorner , mirror: true } ,
            'itr': { sprites: TerrainData[ terrain ].basicBorders.innerCorner } ,
            'ibl': { sprites: TerrainData[ terrain ].basicBorders.innerCorner , mirror: true , flip: true } ,
            'ibr': { sprites: TerrainData[ terrain ].basicBorders.innerCorner , flip: true } ,
            '???': null ,
        } ,

        matchers: [

            // top border
            {
                in: [ '?','W','?',
                      'L','L','L',
                      '?','?','?' ] ,

                out: [ '???' , '???' , '???' ,
                       '???' , 'uuu' , '???' ,
                       '???' , '???' , '???' ] ,

            } ,

            // bottom border
            {
                in: [ 'L','L','L',
                      '?','W','?',
                      '?','?','?' ] ,

                out: [ '???' , 'ddd' , '???' ,
                       '???' , '???' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // left border
            {
                in: [ '?','L','?',
                      'W','L','?',
                      '?','L','?'] ,
                out: [ '???' , '???' , '???' ,
                       '???' , 'lll' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // right border
            {
                in: [ 'L','?','?',
                      'L','W','?',
                      'L','?','?'] ,
                out: [ '???' , '???' , '???' ,
                       'rrr' , '???' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // outer top-left
            {
                in: [ 'W' , 'W' , '?' ,
                      'W' , 'L' , '?' ,
                      '?' , '?' , '?' ] ,
                out: [ '???' , '???' , '???' ,
                       '???' , 'otl' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // outer top-right
            {
                in: [ 'W' , 'W' , '?' ,
                      'L' , 'W' , '?' ,
                      '?' , '?' , '?' ] ,
                out: [ '???' , '???' , '???' ,
                       'otr' , '???' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // outer bottom-left
            {
                in: [ 'W' , 'L' , '?' ,
                      'W' , 'W' , '?' ,
                      '?' , '?' , '?' ] ,
                out: [ '???' , 'obl' , '???' ,
                       '???' , '???' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // outer bottom-right
            {
                in: [ 'L' , 'W' , '?' ,
                      'W' , 'W' , '?' ,
                      '?' , '?' , '?' ] ,
                out: [ 'obr' , '???' , '???' ,
                       '???' , '???' , '???' ,
                       '???' , '???' , '???' ] ,
            },

            // inner top-left
            {
                in: [ 'W' , 'L' , '?' ,
                      'L' , 'L' , '?' , 
                      '?' , '?' , '?' ] ,

                out: [ '???' , '???' , '???' ,
                       '???' , 'itl' , '???' ,
                       '???' , '???' , '???' ],
            } ,

            // inner top-right
            {
                in: [ 'L' , 'W' , '?' ,
                      'L' , 'L' , '?' , 
                      '?' , '?' , '?' ] ,

                out: [ '???' , '???' , '???' ,
                       'itr' , '???' , '???' ,
                       '???' , '???' , '???' ],
            } ,

            // inner bottom-left
            {
                in: [ 'L' , 'L' , '?' ,
                      'W' , 'L' , '?' , 
                      '?' , '?' , '?' ] ,

                out: [ '???' , 'ibl' , '???' ,
                       '???' , '???' , '???' ,
                       '???' , '???' , '???' ],
            } ,

            // inner bottom-right
            {
                in: [ 'L' , 'L' , '?' ,
                      'L' , 'W' , '?' , 
                      '?' , '?' , '?' ] ,

                out: [ 'ibr' , '???' , '???' ,
                       '???' , '???' , '???' ,
                       '???' , '???' , '???' ],
            }

        ] ,

    };

    return processor;

} );

export default TerrainOuterBorders;
