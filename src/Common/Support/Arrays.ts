
import * as _ from 'lodash';
import Tools from './Tools';

/**
 * OpenHeroes2
 * 
 * Arrays - this helper class is used for managing some unusual array operations.
 */

type ArrayInitializer<T> = ( x: number , y: number ) => T;
type ArrayDeinitializer<T> = ( element: T , x: number , y: number ) => void;

interface ArrayOptiResizeStruct<T> {
    onNew: ArrayInitializer<T> ,
    onRemove: ArrayDeinitializer<T> ,
};

class Arrays {

    /**
     * This method will create a two-dimensional array of type <T>, calling initializer function
     * for every x/y element that will provide initial value. Example:
     * 
     * const posArray: string[][] = Arrays.create2dArray( 32 , 32 , (x,y): string => 'pos-' + x + '-' + y );
     * console.log( posArray[10][10] ); // will output 'pos-10-10'
     * 
     * @param width 
     * @param height 
     * @param initializer 
     */
    public static create2dArray<T>( width: number , height: number , initializer: ArrayInitializer<T> ): T[][] {

        const result: T[][] = [];

        for( let x = 0 ; x < width ; ++x ) {
            const row: T[] = [];
            for( let y = 0 ; y < height ; ++y ) {
                row.push( initializer( x , y ) );
            }
            result.push( row );
        }

        return result;

    }

    public static optiResize2dArray<T>( array: T[][] , newWidth: number , newHeight: number , struct: ArrayOptiResizeStruct<T> ): T[][] {

        const originalWidth: number = array.length;
        const originalHeight: number = ( array.length > 0 ) ? array[0].length : 0;

        const result: T[][] = [];

        for( let x = 0 ; x < newWidth ; ++x ) {

            const row: T[] = [];
            for( let y = 0 ; y < newHeight ; ++y ) {

                if ( x < originalWidth && y < originalHeight ) {
                    row.push( array[x][y] );
                } else {
                    row.push( struct.onNew(x,y) );
                }

            }

            result.push( row );

        }

        // call removes if possible
        for( let x = 0 ; x < originalWidth ; ++x ) {
            for ( let y = 0 ; y < originalHeight ; ++y ) {
                if ( x >= newWidth || y >= newHeight ) {
                    struct.onRemove( array[x][y] , x , y );
                }
            }
        }
        
        return result;

    }

    /**
     * Creates array with numbers of certain range, like createRange(3,6) will
     * create an array: [3,4,5,6].
     * @param from starting number
     * @param to ending number
     */
    public static createRange( from: number , to: number ): number[] {
        const count: number = to - from;
        const result: number[] = [];
        for( let i = 0 ; i <= count ; ++i ){
            result.push( from + i );
        }
        return result;
    }

    /**
     * Retrieves random element from array.
     * @param array a non-empty array
     */
    public static randomElement<T>( array: Array<T> ): T {
        if ( array.length == 0 ) {
            throw new Error( 'randomElement() - provided array is empty!' );
        } else {
            return array[ Tools.random( 0 , array.length - 1 ) ];
        }
    }

}

export default Arrays;
