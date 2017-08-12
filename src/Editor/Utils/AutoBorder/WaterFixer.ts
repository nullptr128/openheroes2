import IAutoFixerProcessor from './IAutoFixerProcessor';
import Terrain from '../../../Common/Types/Terrain';

const WaterFixer: IAutoFixerProcessor = {

    sources: {
        'W': t => t === Terrain.WATER || t === null ,
        'L': t => t !== Terrain.WATER && t !== null ,
        '?': t => true ,
    } ,

    outputs: {
        'cl': { copyFrom: { x: -1 , y: 0 } } ,
        'cu': { copyFrom: { x: 0 , y: -1 } } ,
        '??': null ,
    } ,

    matchers: [

        // horizontal "peninsula" fix
        {
            in: [ '?' , '?' , '?' ,
                  'W' , 'L' , 'W' ,
                  '?' , '?' , '?' ] ,

            out: [ '??' , '??' , '??' , 
                   '??' , 'cl' , '??' ,
                   '??' , '??' , '??' ] ,                

        } ,

        // vertical "peninsula" fix
        {
            in: [ 'W' , '?' , '?' ,
                  'L' , '?' , '?' ,
                  'W' , '?' , '?' ] ,

            out: [ '??' , '??' , '??' ,
                   'cu' , '??' , '??' ,
                   '??' , '??' , '??' ] ,
        } ,

        // horizontal hole fix
        {
            in: [ '?' , '?' , '?' ,
                  'L' , 'W' , 'L' ,
                  '?' , '?' , '?' ] ,

            out: [ '??' , '??' , '??' ,
                   '??' , 'cl' , '??' ,
                   '??' , '??' , '??' ] ,
        } ,

        // horizontal hole fix
        {
            in: [ 'L' , '?' , '?' ,
                  'W' , '?' , '?' ,
                  'L' , '?' , '?' ] ,

            out: [ '??' , '??' , '??' ,
                   'cu' , '??' , '??' ,
                   '??' , '??' , '??' ] ,
        } ,

    ]

};

export default WaterFixer;
