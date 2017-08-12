
import IAutoBorderProcessor from './IAutoBorderProcessor';
import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';

setTimeout( () => {
    console.log( TerrainData[ Terrain.GRASS ].multiBorders[5] );
    console.log( TerrainData[ Terrain.GRASS ].multiBorders );
} , 3*1000 );

const TerrainMultiBorders: IAutoBorderProcessor[] = [
    Terrain.GRASS , Terrain.SNOW , Terrain.SWAMP ,
    Terrain.LAVA , Terrain.ROUGH , Terrain.DESERT
].map( terrain => {

    const processor: IAutoBorderProcessor = {

        sources: {
            'S': t => t === Terrain.WATER || t === Terrain.SAND ,
            'L': t => t === terrain ,
            'O': t => t !== terrain && t !== Terrain.WATER && t !== Terrain.SAND && t !== null ,
            '?': t => true ,
        } ,

        outputs: {
            '4nn': { sprites: [ TerrainData[ terrain ].multiBorders[4] ] } ,
            '4mn': { sprites: [ TerrainData[ terrain ].multiBorders[4] ] , mirror: true } ,
            '4nf': { sprites: [ TerrainData[ terrain ].multiBorders[4] ] , flip: true } ,
            '4mf': { sprites: [ TerrainData[ terrain ].multiBorders[4] ] , mirror: true , flip: true } ,
            '5nn': { sprites: [ TerrainData[ terrain ].multiBorders[5] ] } ,
            '5mn': { sprites: [ TerrainData[ terrain ].multiBorders[5] ] , mirror: true } ,
            '5nf': { sprites: [ TerrainData[ terrain ].multiBorders[5] ] , flip: true } ,
            '5mf': { sprites: [ TerrainData[ terrain ].multiBorders[5] ] , mirror: true , flip: true } ,
            '???': null ,
        } ,

        matchers: [

            // multi border #4
            {
                in: [ 'S' , '?' , '?' ,
                      'L' , 'O' , '?' ,
                      '?' , '?' , '?' ] ,

                out: [ '???' , '???' , '???' , 
                       '4nn' , '???' , '???' ,
                       '???' , '???' , '???' ] ,

            } ,

            // multi border #4 -> mirror
            {
                in: [ '?' , 'S' , '?' ,
                      'O' , 'L' , '?' ,
                      '?' , '?' , '?' ] ,

                out: [ '???' , '???' , '???' ,
                       '???' , '4mn' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // multi border #4 -> flip
            {
                in: [ '?' , '?' , '?' ,
                      'L' , 'O' , 'O' ,
                      'S' , 'S' , 'S' ] ,

                out: [ '???' , '???' , '???' , 
                       '4nf' , '???' , '???' ,
                       '???' , '???' , '???' ] ,

            } ,

            // multi border #4 -> flip+mirror
            {
                in: [ '?' , '?' , '?' ,
                      'O' , 'L' , 'L' ,
                      'S' , 'S' , 'S' ] ,

                out: [ '???' , '???' , '???' ,
                       '???' , '4mf' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // multi border #5 -> flip
            {
                in: [ 'O' , 'S' , '?' ,
                      'O' , 'S' , '?' ,
                      'L' , 'S' , '?' ] ,
                
                out: [ '???' , '???' , '???' ,
                       '???' , '???' , '???' ,
                       '5nn' , '???' , '???' ] ,
            } ,

            // multiborder #5 -> mirror
            {
                in: [ 'S' , 'O' , '?' ,
                      'S' , 'O' , '?' ,
                      'S' , 'L' , '?' ] ,

                out: [ '???' , '???' , '???' ,
                       '???' , '???' , '???' ,
                       '???' , '5mn' , '???' ] ,
            } ,

            // multi border #5 -> flip
            {
                in: [ 'L' , 'S' , '?' ,
                      'O' , 'S' , '?' ,
                      'O' , 'S' , '?' ] ,
                
                out: [ '5nf' , '???' , '???' ,
                       '???' , '???' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

            // multi border #5 -> flip+mirror
            {
                in: [ 'S' , 'L' , '?' ,
                      'S' , 'O' , '?' ,
                      'S' , 'O' , '?' ] ,

                out: [ '???' , '5mf' , '???' ,
                       '???' , '???' , '???' ,
                       '???' , '???' , '???' ] ,
            } ,

        ] ,

    };

    return processor;

} );

export default TerrainMultiBorders;
