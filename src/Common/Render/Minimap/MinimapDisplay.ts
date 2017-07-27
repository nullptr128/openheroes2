/**
 * OpenHeroes2
 * 
 * This class is reponsible for drawing minimap on target canvas. It automatically
 * handles different map sizes, scaling them as neccessary.
 * 
 * To use this class, you must call setMapSize, setRenderTarget and
 * setTerrainFunc first.
 */

import Injectable from '../../IOC/Injectable';
import Nullable from '../../Support/Nullable';
import IMap from '../../Model/IMap';
import IColor from '../../Types/IColor';
import Terrain from '../../Types/Terrain';
import TerrainColor from './TerrainColor';

// function that retrieves terrain type of tile from position
type GetTerrainFunc = ( x: number , y: number ) => Terrain;

@Injectable()
class MinimapDisplay {

    private fInternalCanvas: Nullable<HTMLCanvasElement>;
    private fTarget: Nullable<HTMLCanvasElement>;
    private fSize: number;
    private fGetTerrainFunc: GetTerrainFunc;

    /**
     * This internal function creates canvas with target size.
     * @param size size of canvas in pixels (both width and height)
     */
    private createCanvas( size: number ): HTMLCanvasElement {
        const result: HTMLCanvasElement = document.createElement( 'canvas' );
        result.width = size;
        result.height = size;
        return result;
    }

    /**
     * Updates size of map we will be rendering.
     * @param mapSize new map size
     */
    public setMapSize( mapSize: number ): void {
        this.fInternalCanvas = this.createCanvas( mapSize );
        this.fSize = mapSize;
    }

    /**
     * Sets target canvas where map should be drawn
     * @param targetCanvas canvas where map should be drawn
     */
    public setRenderTarget( targetCanvas: HTMLCanvasElement ): void {
        this.fTarget = targetCanvas;
    }

    /**
     * Sets function that will return terrain type from x/y
     * @param terrainFunc terrain function
     */
    public setTerrainFunc( terrainFunc: GetTerrainFunc ): void {
        this.fGetTerrainFunc = terrainFunc;
    }

    /**
     * Redraws map on canvas set by setRenderTarget, using
     * function set by setTerrainFunc to retrieve terrain types
     * of map.
     */
    public redrawMap(): void {
        
        if ( !this.fInternalCanvas || !this.fTarget ) {
            console.warn( 'MinimapDisplay.redrawMap() called without required context!' );
            return;
        }

        const mapSize: number = this.fSize;

        const context = this.fInternalCanvas.getContext( '2d' )!;
        const imageData = context.createImageData( mapSize , mapSize );

        for( let x = 0 ; x < mapSize ; ++x ) {
            for( let y = 0 ; y < mapSize ; ++y ) {
                const pixelOffset: number = ( y * mapSize + x ) * 4;
                const color: IColor = this.getTileColor( x , y );
                imageData.data[ pixelOffset + 0 ] = color.r;
                imageData.data[ pixelOffset + 1 ] = color.g;
                imageData.data[ pixelOffset + 2 ] = color.b;
                imageData.data[ pixelOffset + 3 ] = color.a;
            }
        }

        context.putImageData( imageData , 0 , 0 );

        const targetContext = this.fTarget.getContext( '2d' )!;
        targetContext.drawImage( this.fInternalCanvas , 0 , 0 , mapSize , mapSize , 0 , 0 , this.fTarget.width , this.fTarget.height );

    }

    /**
     * Retrieves color of minimap pixel on tile x/y
     * @param x x-offset of tile
     * @param y y-offset of tile
     */
    public getTileColor( x: number , y: number ): Readonly<IColor> {
        const terrain: Terrain = this.fGetTerrainFunc( x , y );
        return TerrainColor[ terrain ];
    }

}

export default MinimapDisplay;
