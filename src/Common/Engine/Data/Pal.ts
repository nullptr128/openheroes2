/**
 * OpenHeroes2
 * 
 * This file reads and stores original Heroes2 palettes
 * from .pal files.
 * 
 * There is only one file of this type in the archive : the file "kb.pal". This file is the palette. It contains the colors to use to interpret the images in ICN files. It is a 3*256 bytes file. All group of 3 bytes represent a RGB color. You may notice that this palette is very dark (each byte is letter or equal than 0x3F). You must multiplicate all the bytes by 4 to obtain the real game's colors.
 * Note for Heroes I : there are two pal files in HEROES.AGG archive but they are identical. Caution, in this version the palette must be translate to retrieve the good colors.
 * Some palette ranges are for color animation (cycling colors) for phoenix, fire elementaries, lava, water :
 * 214-217 (red)
 * 218-221 (yellow)
 * 231-237 (ocean/river/lake colors)
 * 238-241 (blue)
 * 
 * The color cycling is an in-game feature. Simply put, if you place color 214, it will be put in a cycle automatically: 214-215-216-217-214-... etc. If you start from color 215, it will go in the game like 215-216-217-214-215-... etc.
 * 
 */

import Injectable from '../../IOC/Injectable';
import IColor from '../../Types/IColor';

@Injectable()
class Pal {

    private fPalette: IColor[] = [];

    /**
     * Reads KB.PAL file from buffer and setups color table.
     * @param buffer 
     */
    public openPalFile( buffer: Buffer ): void {

        for( let i = 0 ; i < 256 ; ++i ) {
            const color: IColor = {
                r: buffer.readUInt8( i*3 + 0 ) * 4 ,
                g: buffer.readUInt8( i*3 + 1 ) * 4 ,
                b: buffer.readUInt8( i*3 + 2 ) * 4 ,
                a: 255 ,
            };
            this.fPalette.push( color );
        }

    }

    /**
     * Returns color from index 0..255 based on KB.PAL file.
     * It returns readonly IColor instead of copy for perf
     * reasons.
     * @param colorIndex index of color from 0 to 255
     */
    public getColor( colorIndex: number ): Readonly<IColor> {
        return this.fPalette[ colorIndex ];
    }

    /**
     * ICN file may contain special "shadow" pixels. This
     * method returns proper RGBA values for these shadow
     * pixels.
     */
    public getShadowColor(): Readonly<IColor> {
        return { r: 0 , g: 0 , b: 0 , a: 64 };
    }

}

export default Pal;
