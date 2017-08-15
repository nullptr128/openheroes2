/**
 * OpenHeroes2
 * 
 * This interface represents AutoBorderProcessor pipeline.
 * The pipeline itself works as follows:
 * 
 * Define `sources` and `outputs` objects that have string-based
 * keys and specific values; then define matchers which will contain
 * two arrays - input one tied to `sources` and output one tied to
 * `outputs`; arrays should have either 4 or 9 elements, for 2x2 or 3x3
 * matrixes. The value of input array element should be string key for
 * `sources` object and value of output array element should be string
 * key for `outputs` object. Example:
 * 
 * {
 *   inputs: {
 *     'W': (t) => ( t === Terrain.WATER ) , // 'W' must match water
 *     '?': (t) => ( true ) , // '?' means any tile
 *   } ,
 *   outputs: {
 *     'g': { sprites: ...array of grass sprites } // 'g' means replace with grass
 *     '?': null // '?' means replace with null, meaning no change at all
 *   } ,
 * 
 *   matchers: [
 *     // matcher that replace two diagonal water tiles with grass ones
 *     {
 *       in: [ 'W' , '?' ,
 *             '?' , 'W' ] ,
 *       out: [ 'g' , '?' , 
 *              '?' , 'g' ] ,   
 *     }
 *   ] ,
 * 
 */

import Terrain from '../../../Common/Types/Terrain';
import Nullable from '../../../Common/Support/Nullable';

type SourceFunction = (terrain: Terrain | null) => boolean;

interface IKeyValue<T> {
    [key: string]: T;
}

type IShortMatrix<T> = [ T , T , T , T ];
type ILongMatrix<T> = [ T , T , T , T , T , T , T , T , T ];

export type IMatrix<T> = IShortMatrix<T> | ILongMatrix<T>;
type IOutput = { sprites: number[] , terrainOverride?: Terrain };

export interface IAutoBorderMatcher {
    in: IMatrix<string>;
    out: IMatrix<string>;
    priority: number;
    noTransform?: boolean;
    outMirror?: boolean;
    outFlip?: boolean;
}

interface IAutoBorderProcessor {

    sources: IKeyValue<SourceFunction>;
    outputs: IKeyValue< Nullable<IOutput> >;
    matchers: IAutoBorderMatcher[];

}

export default IAutoBorderProcessor;
