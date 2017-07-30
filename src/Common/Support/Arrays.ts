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

    public static createRange( from: number , to: number ): number[] {
        const count: number = to - from;
        const result: number[] = [];
        for( let i = 0 ; i < count ; ++i ){
            result.push( from + i );
        }
        return result;
    }

}

export default Arrays;
