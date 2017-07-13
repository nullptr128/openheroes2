/**
 * OpenHeroes2
 * 
 * This class wraps all file-based operations for ease of use,
 * promise (async/await) support and future abstraction when
 * project will be deployed on a platform without 'FS' module
 * (like phonegap).
 */

import * as FS from 'fs';
import BinaryFile from './BinaryFile';
import Injectable from '../../IOC/Injectable';

@Injectable()
class Files {

    /**
     * Opens file from path as binary file, returning
     * BinaryFile instance for easier read.
     * @param path path for file
     */
    public openBinaryFile( path: string ): Promise<BinaryFile> {
        return new Promise<BinaryFile>( (resolve,reject) => {
            FS.stat( path , (err,stats) => {
                if ( err ) {
                    reject( err );
                } else {
                    FS.open( path , 'r' , (err,fd) => {
                        if ( err ) {
                            reject( err );
                        } else {
                            resolve( new BinaryFile( fd , stats.size ) );
                        }
                    } );
                }
            } );
        } );
    }

}

export default Files;
