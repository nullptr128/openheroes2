/**
 * OpenHeroes2
 * 
 * This class represents a binary file. With this class,
 * you can open binary file and extract some part of it
 * as Buffer objects.
 * 
 * This class should not be used directly, Files.openBinaryFile()
 * serves as loader and factory function instead (and its in DI).
 */

import * as FS from 'fs';
import Injectable from '../../IOC/Injectable';

class BinaryFile {

    private fFileDescriptor: number;
    private fSize: number;

    constructor( fileDescriptor: number , fileSize: number ) {
        this.fFileDescriptor = fileDescriptor;
        this.fSize = fileSize;
    }

    /**
     * Reads file data from particular position (offset) and returns
     * an Buffer instance with data.
     * @param position start reading with this position
     * @param count amount of bytes to read
     * @return Buffer with data
     */
    public read( position: number , count: number ): Promise<Buffer> {
        return new Promise<Buffer>( (resolve,reject) => {
            const readBuffer: Buffer = Buffer.alloc( count );
            FS.read( this.fFileDescriptor , readBuffer , 0 , count , position , (err,bytesRead) => {
                if ( err ) {
                    reject( err );
                } else {
                    resolve( readBuffer );
                }
            } );
        } );
    }

    /**
     * Releases and closes binary file, freeing OS file handle.
     * This method makes read() method unuseable for this instance
     * of BinaryFile.
     */
    public close(): Promise<void> {
        return new Promise<void>( (resolve,reject) => {
            FS.close( this.fFileDescriptor , (err) => {
                if ( err ) {
                    reject( err );
                } else {
                    resolve();
                }
            } );
        } );
    }

    /**
     * Returns size of this file in bytes.
     */
    public getSize(): number {
        return this.fSize;
    }

}

export default BinaryFile;
