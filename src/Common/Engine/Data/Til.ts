/**
 * OpenHeroes2 
 * 
 * This class is responsible for reading .TIL files and converting
 * them to pixelmaps.
 * 
 * TIL files contains tiles for the maps. In these files, the first three groups of 2 bytes are :

 * the number of tiles (n)
 * tiles' width
 * tiles' height
 * Then there are n times, width * height bytes, that are the colors' index in the palette of the tiles' pixels.

 * The data contains three TIL files :

 * clof32.til : four dark tiles (nigth sky?)
 * ground32.til : tiles for all terrain's type in the main map.
 * ston.til : stone ground tiles.
 * 
 * Source: https://thaddeus002.github.io/fheroes2-WoT/infos/informations.html
 */

import Injectable from '../../IOC/Injectable';
import Inject from '../../IOC/Inject';
import Pal from './Pal';
import Arrays from '../../Support/Arrays';
import IColor from '../../Types/IColor';
import IH2Tile from '../Graphics/IH2Tile';

@Injectable()
class Til {

    @Inject( Pal )
    private gPal: Pal;

    /**
     * Reads data from .TIL buffer and returns IH2Tile structure
     * with data and tile pixelmap.
     * @param tilFile buffer with .TIL file
     * @param index number of tile (0..TOTAL-1) we want to read
     */
    public getTile( tilFile: Buffer , index: number ): IH2Tile {

        const numberOfTiles: number = tilFile.readUInt16LE( 0 );
        const tilesWidth: number = tilFile.readUInt16LE( 2 );
        const tilesHeight: number = tilFile.readUInt16LE( 4 );

        const startByte: number = (tilesWidth*tilesHeight) * index + 6;

        const pixmap: IColor[][] = Arrays.create2dArray( tilesWidth , tilesHeight , () => ({ r: 0 , g: 0 , b: 0 , a: 0 }) );

        for( let x = 0 ; x < tilesWidth ; ++x ) {
            for( let y = 0 ; y < tilesHeight ; ++y ) {
                const paletteIndex: number = tilFile.readUInt8( startByte + (y*tilesWidth) + x );
                pixmap[x][y] = this.gPal.getColor( paletteIndex );
            }
        }

        return {
            width: tilesWidth ,
            height: tilesHeight ,
            pixmap: pixmap ,
        };

    }

    /**
     * Reads data from .TIL buffer and returns all tiles 
     * as H2Tile[] array with data and tile pixelmap.
     * @param tilFile buffer with .TIL file
     * @param index number of tile (0..TOTAL-1) we want to read
     */
    public getTiles( tilFile: Buffer ): IH2Tile[] {

        const numberOfTiles: number = tilFile.readUInt16LE( 0 );
        const tilesWidth: number = tilFile.readUInt16LE( 2 );
        const tilesHeight: number = tilFile.readUInt16LE( 4 );

        const result: IH2Tile[] = [];

        for( let index = 0 ; index < numberOfTiles ; ++index ) {

            const startByte: number = (tilesWidth*tilesHeight) * index + 6;
            const pixmap: IColor[][] = Arrays.create2dArray( tilesWidth , tilesHeight , () => ({ r: 0 , g: 0 , b: 0 , a: 0 }) );

            for( let x = 0 ; x < tilesWidth ; ++x ) {
                for( let y = 0 ; y < tilesHeight ; ++y ) {
                    const paletteIndex: number = tilFile.readUInt8( startByte + (y*tilesWidth) + x );
                    pixmap[x][y] = this.gPal.getColor( paletteIndex );
                }
            }

            result.push( {
                width: tilesWidth ,
                height: tilesHeight ,
                pixmap: pixmap ,
            } );

        }

        return result;

    }

}

export default Til;