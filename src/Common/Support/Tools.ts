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

}

export default Tools;
