/**
 * OpenHeroes2
 * 
 * This class is responsible for opening, reading and 
 * converting .82M audio files into .WAV format.
 */

import Injectable from '../../IOC/Injectable';

@Injectable()
class Snd {

    /**
     * Convers .82M file from buffer passed as
     * method arg, returning audio/wav compatabile
     * buffer.
     * @param sndFile buffer with .82M file
     */
    public getWav( sndFile: Buffer ): Buffer {

        const audioDataSize: number = sndFile.byteLength;

        const wavHeader: Buffer = Buffer.alloc( 44 );

        //
        // Code based on:
        // https://sourceforge.net/p/fheroes2/code/HEAD/tree/trunk/fheroes2/src/tools/82m2wav.cpp
        //

        // Write WAV header (44 bytes):
        //
        // #0 -> chunk id
        wavHeader.writeUInt32LE( 0x46464952 , 0 );
        // #4 -> chunk size
        wavHeader.writeUInt32LE( audioDataSize + 0x24 , 4 );
        // #8 -> format
        wavHeader.writeUInt32LE( 0x45564157 , 8 );
        // #12 -> sub chunk 1 id
        wavHeader.writeUInt32LE( 0x20746D66 , 12 );
        // #16 -> sub chunk 1 size
        wavHeader.writeUInt32LE( 0x10 , 16 );
        // #20 -> audio format
        wavHeader.writeUInt16LE( 0x01 , 20 );
        // #22 -> num channels
        wavHeader.writeUInt16LE( 0x01 , 22 );
        // #24 -> sample rate
        wavHeader.writeUInt32LE( 22050 , 24 );
        // #28 -> byte rate
        wavHeader.writeUInt32LE( 22050 , 28 );
        // #32 -> block align
        wavHeader.writeUInt16LE( 0x01 , 32 );
        // #34 -> bits per sample
        wavHeader.writeUInt16LE( 0x08 , 34 );
        // #36 -> subchunk 2 id
        wavHeader.writeUInt32LE( 0x61746164 , 36 );
        // #40 -> subchunk 2 size
        wavHeader.writeUInt32LE( audioDataSize , 40 );
        
        // return combined wave header + raw audio data from .82m file.
        return Buffer.concat( [ wavHeader , sndFile ] );

    }

}

export default Snd;
