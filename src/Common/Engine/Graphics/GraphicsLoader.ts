/**
 * OpenHeroes2
 * 
 * This file is responsible for loading graphic files
 * from .AGG files. It handles reading file from AGG and
 * passing it to correct services that will decrypt them.
 */

import Injectable from '../../IOC/Injectable';
import Agg from '../Data/Agg';
import Inject from '../../IOC/Inject';
import Pal from '../Data/Pal';
import IColor from '../../Types/IColor';
import IH2Sprite from './IH2Sprite';
import Icn from '../Data/Icn';
import IH2Tile from './IH2Tile';
import Til from '../Data/Til';
import * as Pixi from 'pixi.js';

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

    /**
     * Loads sprite from .ICN file from particular index, returning
     * IH2Sprite structure. This is helper method.
     * @param buffer buffer with .ICN file
     * @param index index of sprite we want to read
     */
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

    /**
     * Receives H2Sprite struct from ICN for a proper index.
     * @param icnFileName name of ICN file 
     * @param index index of sprite we want to fetch
     */
    public async getH2SpriteByIndex( icnFileName: string , index: number ): Promise<IH2Sprite> {

        // get original h2 sprite binary file
        const icnFile: Buffer = await this.gAgg.getFile( icnFileName );
        return this.internalLoadSprite( icnFile , index );

    }

    /**
     * Receives all sprites from particular ICN file.
     * @param icnFileName name of ICN file
     */
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

    /**
     * Converts IH2Sprite to dataUrl string with PNG type.
     * @param sprite h2sprite to convert
     */
    private h2SpriteToDataUrl( sprite: IH2Sprite ): string {

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

    /**
     * Converts IH2Tile to dataUrl string with PNG type
     * @param tile h2tile to convert
     */
    private h2TileToDataUrl( tile: IH2Tile ): string {

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

    /**
     * Receives sprite from ICN file with correct index, returning data-url string
     * for that sprite.
     * @param icnFileName name of icn file
     * @param index index of sprite
     */
    public async getIcnFrameAsDataUrl( icnFileName: string , index: number ): Promise<string> {
        const sprite: IH2Sprite = await this.getH2SpriteByIndex( icnFileName , index );
        return this.h2SpriteToDataUrl( sprite );
    }

    /**
     * Receives full sprite from ICN with all frames, returning array of data-urls.
     * @param icnFileName name of icn file 
     */
    public async getIcnAsDataUrl( icnFileName: string ): Promise<string[]> {
        const sprites: IH2Sprite[] = await this.getH2Sprites( icnFileName );
        return sprites.map( s => this.h2SpriteToDataUrl(s) );
    }

    /**
     * Receives Heroes2 tile from .TIL file and returns H2Tile struct
     * @param tilFileName name of .TIL file
     * @param index index of floor tile
     */
    private async getH2TileByIndex( tilFileName: string , index: number ): Promise<IH2Tile> {
        
        const tilFile: Buffer = await this.gAgg.getFile( tilFileName );
        return this.gTil.getTile( tilFile , index );

    }

    /**
     * Receives all frames from TIL file and returns IH2Tile[] array
     * from it.
     * @param tilFileName name of til file
     */
    private async getH2Tiles( tilFileName: string ): Promise<IH2Tile[]> {
        const tilFile: Buffer = await this.gAgg.getFile( tilFileName );
        return this.gTil.getTiles( tilFile );
    }

    /**
     * Reads Hereso2 tile from .TIL file and returns data-url string for that tile.
     * @param tilFileName name of .TIL file
     * @param index index of floor tile
     */
    public async getTilFrameAsDataUrl( tilFileName: string , index: number ): Promise<string> {

        const tile: IH2Tile = await this.getH2TileByIndex( tilFileName , index );
        return this.h2TileToDataUrl( tile );

    }

    /**
     * Receives full tileset from TIL file with all frames, returning array
     * of data-urls.
     * @param tilFileName name of til file
     */
    public async getTilAsDataUrl( tilFileName: string ): Promise<string[]> {

        const tiles: IH2Tile[] = await this.getH2Tiles( tilFileName );
        return tiles.map( t => this.h2TileToDataUrl( t ) );

    }

}

export default GraphicsLoader;
