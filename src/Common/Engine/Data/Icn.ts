
import Injectable from '../../IOC/Injectable';
import IColor from '../../Types/IColor';
import Pal from '../Data/Pal';
import Inject from '../../IOC/Inject';
import Arrays from '../../Support/Arrays';
import Tools from '../../Support/Tools';

@Injectable() 
class Icn {

    @Inject( Pal )
    private gPal: Pal;

    /*  
        Scheme for normal sprite

        There is one byte for command followed by 0 or more bytes of data. The command byte can be :

        0x00 - end of line reached, go to the first pixel of next line.
        0x01 to 0x7F - number n of data. The next n bytes are the colors of the next n pixels.
        0x80 - end of data. The sprite is yet totaly describe.
        0x81 to 0xBF - number of pixels to skip + 0x80. The (n - 128) pixels are transparents.
        0xC0 - put here n pixels of shadow. If the next byte module 4 is not null, n equals the next pixel modulo 4, otherwise n equals the second next byte.
        0xC1 - next byte is the number of next pixels of same color. The second next byte is the color of these pixels.
        0xC2 to 0xFF - number of pixels of same color plus 0xC0. Next byte is the color of these pixels.
    */

    public getPixmap( buffer: Buffer , width: number , height: number , type: number , byteStartIndex: number ): IColor[][] {
        switch ( type ) {
            case 0:
                return this.getPixmapNormal( buffer , width , height , byteStartIndex );
            default:
                throw new Error( 'getPixmap() type ' + type + ' is not supported!' );
        }
    }

    private getPixmapNormal( buffer: Buffer , width: number , height: number , byteStartIndex: number ): IColor[][] {

        // first of all, create result array with correct with and height, filling it with transparent pixels
        const result: IColor[][] = Arrays.create2dArray( width , height , () => ({ r: 0 , g: 0 , b: 0 , a: 0 }) );

        // initialize buffer position marker and set it at start
        let bufferPosition: number = byteStartIndex;
        
        // initialize image position
        let imagePosition: { x:number , y:number } = { 
            x: 0 ,
            y: 0 ,
        };

        // we will create helper function that reads one byte from 
        // position, increasing position marker as well
        function getByte(): number {
            return buffer.readUInt8( bufferPosition++ );
        }

        // this function increases image.x position with wrapping support
        function incImagePos( amount: number ): void {
            imagePosition.x += amount;
            while ( imagePosition.x > width ) {
                imagePosition.x -= width;
                imagePosition.y++;
            }
        }

        // block read loop
        while( 1 ) {
            
            const command: number = getByte();

            if ( command == 0x00 ) {
                
                // 0x00 byte: end of line command
                imagePosition.x = 0;
                imagePosition.y++;

            } else if ( command >= 0x01 && command <= 0x7F ) {
                
                // 0x01..0x7F bytes: amount of colored pixels
                const amountOfPixels: number = command;
                for( let i = 0 ; i < amountOfPixels; ++i ) {
                    const paletteIndex: number = getByte();
                    result[imagePosition.x][imagePosition.y] = this.gPal.getColor( paletteIndex );
                    incImagePos(1);
                }

            } else if ( command == 0x80 ) {

                // 0x80 - end of sprite command
                return result;

            } else if ( command >= 0x81 && command <= 0xBF ) {

                // 0x81..0xBF - amount of transparent pixels to skip. 128 must be subtracted from
                // this value in order to get real amount of pixels to skip
                const amountOfPixels: number = command - 0x80;
                // we will just move x-pointer as image is initially transparent
                incImagePos(amountOfPixels);

            } else if ( command == 0xC0 ) {

                // 0xC0 - amount of 'shadow' pixels
                const shadowValue: number = getByte();
                let amountOfPixels: number;
                if ( shadowValue % 4 != 0 ) {
                    amountOfPixels = shadowValue % 4;
                } else {
                    amountOfPixels = getByte();
                }
                for( let i = 0 ; i < amountOfPixels ; ++i ) {
                    result[imagePosition.x][imagePosition.y] = this.gPal.getShadowColor();
                    incImagePos(1);
                }

            } else if ( command == 0xC1 ) {

                // 0xC1 - next byte is the number of next pixels of same color; 2nd next byte
                // is color of these pixels (run length encoding)
                const amountOfPixels: number = getByte();
                const paletteIndex: number = getByte();
                for( let i = 0 ; i < amountOfPixels ; ++i ) {
                    result[imagePosition.x][imagePosition.y] = this.gPal.getColor( paletteIndex );
                    incImagePos(1);
                }

            } else if ( command >= 0xC2 && command <= 0xFF ) {

                // 0xC2..0xFF - amount of pixels plus 0xC0, with next byte being 
                // color of all pixels (run length encoding)
                const amountOfPixels: number = command - 0xC0;
                const paletteIndex: number = getByte();
                for( let i = 0 ; i < amountOfPixels ; ++i ) {
                    result[imagePosition.x][imagePosition.y] = this.gPal.getColor( paletteIndex );
                    incImagePos(1);
                }
                
            } else {
                throw new Error( 'Not supported command: ' + Tools.numToHex( command ) );
            }
        }

        return result;

    }

}

export default Icn;
