
import Injectable from '../../IOC/Injectable';
import Agg from '../Data/Agg';
import Inject from '../../IOC/Inject';
import Pal from '../Data/Pal';
import IColor from '../../Types/IColor';
import IH2Sprite from './IH2Sprite';
import Icn from '../Data/Icn';
import IH2Tile from './IH2Tile';
import Til from '../Data/Til';

/*
All the numbers are encoded in little-endians.

The icn file contains a number n of images, we will name sprites. This is the structure of the file :

2 bytes : the number of sprites
4 bytes : the total size of the file (excluding the 6 first bytes)
13n bytes : representing n sprites headers (see below)
total_size - (count_sprite*13) bytes : concatenation of the data of the sprites.
icn sprite header

s16 offsetX; // positionning offset of the sprite on X axis
s16 offsetY; // positionning offset of the sprite on Y axis
u16 width; // sprite's width
u16 height; // sprite's height
u8 type; // type of sprite : 0 = Normal, 32 = Monochromatic shape
u32 offsetData; // beginning of the data
icn sprite data

Each sprite's pixel has a color taken from a "palette". The palette is an array of 256 colors defined in the file "kb.pal". The format of this file is describe above. The pixel can also be a shadow pixel. The shadow color will be represented by a black pixel with an alpha channel of 64 (0 represents a fully transparent color, and 255 represents a fully opaque color).

The following sheme is repeated many times, describing how to fill pixels. By default a pixel will be transparent.

Scheme for normal sprite

There is one byte for command followed by 0 or more bytes of data. The command byte can be :

0x00 - end of line reached, go to the first pixel of next line.
0x01 to 0x7F - number n of data. The next n bytes are the colors of the next n pixels.
0x80 - end of data. The sprite is yet totaly describe.
0x81 to 0xBF - number of pixels to skip + 0x80. The (n - 128) pixels are transparents.
0xC0 - put here n pixels of shadow. If the next byte module 4 is not null, n equals the next pixel modulo 4, otherwise n equals the second next byte.
0xC1 - next byte is the number of next pixels of same color. The second next byte is the color of these pixels.
0xC2 to 0xFF - number of pixels of same color plus 0xC0. Next byte is the color of these pixels.
Scheme for monochromatic shape

The pixels can only be in two states (transparent or black). So the rules are simplified.

Command bytes are :

0x00 - end of line reached, go to the first pixel of next line.
0x01 to 0x7F - number of black pixels
0x80 - end of data. The sprite is yet totaly describe.
0x81 to 0xFF - number of pixels to skip + 0x80. The (n - 128) pixels are transparents.

Source: https://thaddeus002.github.io/fheroes2-WoT/infos/informations.html
*/

@Injectable()
class GraphicsLoader {

    @Inject( Agg )
    private gAgg: Agg;

    @Inject( Pal )
    private gPal: Pal;

    @Inject( Icn )
    private gIcn: Icn;

    @Inject( Til )
    private gTil: Til;

    private internalLoadSprite( buffer: Buffer , index: number ): IH2Sprite {

        // calculate byte index of header, first header starts
        // at byte #6 and takes 13 bytes
        const headerStartIndex: number = 6 + index*13;

        // get sprite metadata from header
        const offsetX: number = buffer.readInt16LE( headerStartIndex + 0 );
        const offsetY: number = buffer.readInt16LE( headerStartIndex + 2 );
        const width: number = buffer.readUInt16LE( headerStartIndex + 4 );
        const height: number = buffer.readUInt16LE( headerStartIndex + 6 );
        const type: number = buffer.readUInt8( headerStartIndex + 8 );
        const dataOffset: number = buffer.readUInt32LE( headerStartIndex + 9 );

        // read sprite data 
        return {
            offsetX ,
            offsetY ,
            width ,
            height ,
            type ,
            pixmap: this.gIcn.getPixmap( buffer , width , height , type , dataOffset + 6 ) ,
        };

    }

    public async getH2SpriteByIndex( icnFileName: string , index: number ): Promise<IH2Sprite> {

        // get original h2 sprite binary file
        const icnFile: Buffer = await this.gAgg.getFile( icnFileName );
        return this.internalLoadSprite( icnFile , index );

    }

    public async getH2Sprites( icnFileName: string ): Promise<IH2Sprite[]> {

        // get original h2 sprite binary file
        const icnFile: Buffer = await this.gAgg.getFile( icnFileName );

        // get number of sprites
        const numberOfSprites: number = icnFile.readUInt16LE( 0 );

        // create result array
        const result: IH2Sprite[] = [];

        // load all sprites
        for( let i = 0 ; i < numberOfSprites ; ++i ) {
            const sprite: IH2Sprite = this.internalLoadSprite( icnFile , i );
            result.push( sprite );
        }

        return result;

    }

    public async getIcnAsDataUrl( icnFileName: string , index: number ): Promise<string> {

        const sprite: IH2Sprite = await this.getH2SpriteByIndex( icnFileName , index );
        const canvas: HTMLCanvasElement = document.createElement( 'canvas' );

        canvas.width = sprite.width;
        canvas.height = sprite.height;

        const context = canvas.getContext( '2d' );
        
        if ( !context ) {
            throw new Error( 'Cannot create 2d canvas context.' );
        }

        const imageData = context.createImageData( sprite.width , sprite.height );

        for( let x = 0 ; x < sprite.width ; ++x ) {
            for( let y = 0 ; y < sprite.height ; ++y ) {
                const pixelOffset: number = ( y * sprite.width + x ) * 4;
                imageData.data[pixelOffset+0] = sprite.pixmap[x][y].r;
                imageData.data[pixelOffset+1] = sprite.pixmap[x][y].g;
                imageData.data[pixelOffset+2] = sprite.pixmap[x][y].b;
                imageData.data[pixelOffset+3] = sprite.pixmap[x][y].a;
            }   
        }

        context.putImageData( imageData , 0 , 0 );
        return canvas.toDataURL();

    }

    private async getH2TileByIndex( tilFileName: string , index: number ): Promise<IH2Tile> {
        
        const tilFile: Buffer = await this.gAgg.getFile( tilFileName );
        return this.gTil.getTile( tilFile , index );

    }

    public async getTilAsDataUrl( tilFileName: string , index: number ): Promise<string> {

        const tile: IH2Tile = await this.getH2TileByIndex( tilFileName , index );
        const canvas: HTMLCanvasElement = document.createElement( 'canvas' );

        canvas.width = tile.width;
        canvas.height = tile.height;
        
        const context = canvas.getContext( '2d' );

        if ( !context ) {
            throw new Error( 'Cannot create 2d canvas context.' );
        }

        const imageData = context.createImageData( tile.width , tile.height );

        for( let x = 0 ; x < tile.width ; ++x ) {
            for( let y = 0 ; y < tile.height ; ++y ) {
                const pixelOffset: number = ( y * tile.width + x ) * 4;
                imageData.data[pixelOffset+0] = tile.pixmap[x][y].r;
                imageData.data[pixelOffset+1] = tile.pixmap[x][y].g;
                imageData.data[pixelOffset+2] = tile.pixmap[x][y].b;
                imageData.data[pixelOffset+3] = tile.pixmap[x][y].a;
            }   
        }

        context.putImageData( imageData , 0 , 0 );
        return canvas.toDataURL();

    }

}

export default GraphicsLoader;
