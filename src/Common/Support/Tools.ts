/**
 * OpenHeroes2
 * 
 * This class serves as a various toolbox without dependencies. This
 * class is not meant to be used in IOC.
 */

class Tools {

    /**
     * Returns an promise that will resolve after certain amount of miliseconds.
     * Its a typical sleep() function in async/await world.
     */
    public static sleep( miliseconds: number ): Promise<void> {
        return new Promise<void>( resolve => setTimeout( resolve , miliseconds ) );
    }

    /**
     * Extracts file name from full path specified.
     * @param filePath full path to file with either windows or unix separators
     * @return name of file in path
     */
    public static extractFileName( filePath: string ): string {
        return filePath.replace( /^.*[\\\/]/ , '' );
    }

    /**
     * Converts number value into hex string representation with
     * certain amount of digits forced.
     * @param value real value of variable
     * @param digits amount of digits to display
     */
    public static numToHex( value: number , digits: number = 4 ): string {
        
        if ( value < 0 ) {
            value = 0xFFFFFFFF + value + 1;
        }
        
        let retValue = value.toString(16).toUpperCase();
        
        while( retValue.length < digits ) {
            retValue = '0' + retValue;
        }

        return retValue;

    }

    /**
     * Checks if target number fits in range of [min..max]
     * @param value number to check
     * @param range object with minimum and maximum value
     */
    public static inRange( value: number , range: { min: number , max: number } ): boolean {
        return ( value >= range.min ) && ( value <= range.max );
    }

    /**
     * Generates random number in range [min..max] inclusive
     * @param min minimum value
     * @param max maximum value
     */
    public static random( min: number , max: number ): number {
        return Math.floor( Math.random() * ((max-min)+1) ) + min;
    }

    /**
     * Clamps value to specific range
     * @param value value to clamp
     * @param range range 
     */
    public static clamp( value: number , range: { min: number , max: number } ): number {
        if ( value < range.min ) {
            return range.min;
        } else if ( value > range.max ) {
            return range.max;
        } else {
            return value;
        }
    }

}

export default Tools;
