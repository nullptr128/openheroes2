import Tools from './Tools';
/**
 * OpenHeroes2
 * 
 * Arrays - this helper class is used for managing some unusual array operations.
 */

type ArrayInitializer<T> = ( x: number , y: number ) => T;

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

    /**
     * Creates array with numbers of certain range, like createRange(3,6) will
     * create an array: [3,4,5,6].
     * @param from starting number
     * @param to ending number
     */
    public static createRange( from: number , to: number ): number[] {
        const count: number = to - from;
        const result: number[] = [];
        for( let i = 0 ; i < count ; ++i ){
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
