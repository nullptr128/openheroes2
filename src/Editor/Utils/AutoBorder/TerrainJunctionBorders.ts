
import IAutoBorderProcessor from './IAutoBorderProcessor';
import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';

const TerrainJunctionBorders: IAutoBorderProcessor[] = [
    Terrain.GRASS , Terrain.SNOW , Terrain.SWAMP ,
    Terrain.LAVA , Terrain.ROUGH , Terrain.DESERT
].map( terrain => {

    const processor: IAutoBorderProcessor = {

        sources: {
            'W': t => t !== terrain && t !== Terrain.WATER && t !== Terrain.SAND && t !== null ,
            'L': t => t === terrain ,
            '?': t => true ,
        } ,

        outputs: {
            'uuu': { sprites: TerrainData[ terrain ].junctionBorders.vertical } ,
            'ddd': { sprites: TerrainData[ terrain ].junctionBorders.vertical , flip: true } ,
            'lll': { sprites: TerrainData[ terrain ].junctionBorders.horizontal , mirror: true } ,
            'rrr': { sprites: TerrainData[ terrain ].junctionBorders.horizontal } ,
            'otl': { sprites: TerrainData[ terrain ].junctionBorders.outerCorner , mirror: true } ,
            'otr': { sprites: TerrainData[ terrain ].junctionBorders.outerCorner } ,
            'obl': { sprites: TerrainData[ terrain ].junctionBorders.outerCorner , mirror: true , flip: true } ,
            'obr': { sprites: TerrainData[ terrain ].junctionBorders.outerCorner , flip: true } ,
            'itl': { sprites: TerrainData[ terrain ].junctionBorders.innerCorner , mirror: true } ,
            'itr': { sprites: TerrainData[ terrain ].junctionBorders.innerCorner } ,
            'ibl': { sprites: TerrainData[ terrain ].junctionBorders.innerCorner , mirror: true , flip: true } ,
            'ibr': { sprites: TerrainData[ terrain ].junctionBorders.innerCorner , flip: true } ,
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

export default TerrainJunctionBorders;
