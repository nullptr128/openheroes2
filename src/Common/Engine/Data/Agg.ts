/**
 * OpenHeroes2
 * 
 * This file opens, parses and extracts contents of Heroes2 AGG
 * archives.
 */

import Injectable from '../../IOC/Injectable';
import Files from '../Files/Files';
import Inject from '../../IOC/Inject';
import BinaryFile from '../Files/BinaryFile';
import Tools from '../../Support/Tools';
import Nullable from '../../Support/Nullable';

const FILENAME_LENGTH       = 15;

interface IFileEntry {
    sourceAgg: BinaryFile;
    offset: number;
    size: number;
}

interface IAggFile {
    fileId: number;
    fileName: string;
    offset: number;
    size: number;
}

@Injectable()
class Agg {

    @Inject( Files )
    private gFiles: Files;

    private fFiles: Map<string,IFileEntry> = new Map();

    private fOpenAggs: BinaryFile[] = [];

    /**
     * This helper function reads DOS compatabile 15-char length
     * name from buffer, ignoring null (0) bytes.
     * @param buffer buffer we are reading from
     * @param offset where start of string is located
     */
    private getName( buffer: Buffer , offset: number ): string {
        let fileName: string = '';
        for( let j = 0; j < FILENAME_LENGTH - 2 ; ++j ) {
            const chr = buffer.readUInt8( offset + j );
            if ( chr != 0 ) {
                fileName += String.fromCharCode(chr);
            }
        }
        return fileName;
    }

    /**
     * Loads specified agg file into files repository, allowing to get
     * specific file buffer from all aggs loaded.
     * @param aggFilePath path to agg file
     */
    public async loadAggFile( aggFilePath: string ): Promise<void> {

        /*
        Format for AGG files:
        First two bytes: Little endian 16-bit integer describing number of files contained (henceforth, "n")
        Next 12n bytes: A 12-byte FileInfo structure for every file consisting of three little-endian 32-bit integers: a file ID (see below), an offset o, and a size s. Bytes in the range [o,o+s-1] will contain the binary contents of the corresponding file.
        Note : in Heroes of Might and Magic 1, this section is diffrent. There are 14n bytes FileInfo structure for every file consisting of : a file ID (32 bits), a 16-bits number, and two times the same 32-bits integer representing the size of the file.
        Next arbitrary number of bytes: A concatenation of the binary contents of all files in the AGG.
        Final 15n bytes: For every file, a 13-character (including trailing null) DOS-compatible filename, followed by two padding characters. The ith file here gives the filename of the ith file in the array of FileInfo's included at the beginning.

        Source: https://thaddeus002.github.io/fheroes2-WoT/infos/informations.html
        */

        // first we will open the file
        const file: BinaryFile = await this.gFiles.openBinaryFile( aggFilePath );

        // get size of file, as we will need it later 
        const fileSize: number = file.getSize();

        // read number of files as 16bit unsigned int from first two bytes
        const numberOfFiles: number = ( await file.read( 0 , 2 ) ).readUInt16LE( 0 );
        
        // read 12*n buffer for file metadata, from 3rd byte upwards
        const fileMetaBuffer: Buffer = await file.read( 2 , numberOfFiles*12 );

        // read 15*n buffer for file names, located at the end of file
        const fileNamesBuffer: Buffer = await file.read( fileSize - numberOfFiles*FILENAME_LENGTH , numberOfFiles*FILENAME_LENGTH );

        // create list of files
        const files: IAggFile[] = [];

        for( let i = 0 ; i < numberOfFiles ; ++i ) {
            // read specific file data
            const aggFile: IAggFile = {
                fileId: fileMetaBuffer.readUInt32LE( i*12 + 0 ) ,
                offset: fileMetaBuffer.readUInt32LE( i*12 + 4 ) ,
                size: fileMetaBuffer.readUInt32LE( i*12 + 8 ) ,
                fileName: this.getName( fileNamesBuffer , i*FILENAME_LENGTH ) ,
            };
            files.push( aggFile );
        }

        // store all files in fFiles map, with key being filename and value being
        // IFileEntry, for later loading files
        files.forEach( f => this.fFiles.set( f.fileName , { sourceAgg: file , offset: f.offset , size: f.size } ) );

        // finally, save opened agg file as we should close it before destroying application
        this.fOpenAggs.push( file );

        console.log( files );

    }

    /**
     * Closes all opened agg files and removes all files from
     * file lists.
     */
    public async closeAggFiles(): Promise<void> {
        // clear files map
        this.fFiles = new Map();
        // close all files
        await Promise.all( this.fOpenAggs.map( openAgg => openAgg.close() ) );
        // clear open aggs array
        this.fOpenAggs = [];
    }

    /**
     * Scans all AGG files for particular file, returning a buffer with
     * this file.
     * @param fileName name of file inside one of the loaded agg files
     * @return buffer containing just only the file
     */
    public async getFile( fileName: string ): Promise<Buffer> {
        // find file from our file cache
        const fileEntry: Nullable<IFileEntry> = this.fFiles.get( fileName );
        if ( fileEntry ) {
            // if we found it, query source agg file and read particular offset/size as buffer
            return await fileEntry.sourceAgg.read( fileEntry.offset , fileEntry.size );
        } else {
            // throw new error if that file was not found in aggs
            throw new Error( 'Cannot find file [' + fileName + '] in loaded AGG files!' );
        }
    }

}

export default Agg;