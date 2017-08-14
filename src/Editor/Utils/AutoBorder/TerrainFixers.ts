
import IAutoFixerProcessor from './IAutoFixerProcessor';
import Terrain from '../../../Common/Types/Terrain';

const TerrainFixers: IAutoFixerProcessor[] = [
    Terrain.WATER , Terrain.GRASS , Terrain.DIRT , Terrain.SNOW ,
    Terrain.SWAMP , Terrain.LAVA , Terrain.ROUGH , Terrain.DESERT ,
    Terrain.SAND
].map( terrain => {
    
    return {

        sources: {
            'W': t => t !== terrain || t === null ,
            'L': t => t === terrain && t !== null ,
            '?': t => true ,
        } ,

        outputs: {
            'cl': { copyFrom: { x: -1 , y: 0 } } ,
            'cr': { copyFrom: { x: 1 , y: 0 } } ,
            'cu': { copyFrom: { x: 0 , y: -1 } } ,
            'cd': { copyFrom: { x: 0 , y: 1 } } ,
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

            // horizontal tetris fix
            {
                in: [ 'W' , 'L' , 'L' ,
                    'L' , 'L' , 'W' ,
                    '?' , '?' , '?' ] ,

                out: [ 'cr' , '??' , '??' ,
                    '??' , '??' , 'cl' ,
                    '??' , '??' , '??' ] ,

            } ,

            // horizontal inverted tetris fix
            {
                in: [ 'L' , 'L' , 'W' ,
                    'W' , 'L' , 'L' ,
                    '?' , '?' , '?' ] ,

                out: [ '??' , '??' , 'cl' ,
                    'cr' , '??' , '??' ,
                    '??' , '??' , '??' ] ,

            } ,

            // vertical teris fix
            {
                in: [ 'W' , 'L' , '?' ,
                    'L' , 'L' , '?' ,
                    'L' , 'W' , '?' ] ,

                out: [ 'cd' , '??' , '??' ,
                    '??' , '??' , '??' ,
                    '??' , 'cu' , '??' ] ,
            } ,

            // vertical inverted teris fix
            {
                in: [ 'L' , 'W' , '?' ,
                    'L' , 'L' , '?' ,
                    'W' , 'L' , '?' ] ,
                    
                out: [ '??' , 'cd' , '??' ,
                    '??' , '??' , '??' ,
                    'cu' , '??' , '??' ] ,
            } ,

        ]

    } as IAutoFixerProcessor;

} );

export default TerrainFixers;
