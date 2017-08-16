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
import TerrainData from '../../Game/Terrain/TerrainData';
import IMinimapMouse from './IMinimapMouse';
import Point from '../../Types/Point';
import Inject from '../../IOC/Inject';

// function that retrieves terrain type of tile from position
type GetTerrainFunc = ( x: number , y: number ) => Terrain;

// minimap mouse handler
type MinimapMouseFunc = ( data: IMinimapMouse ) => void;

@Injectable()
class MinimapDisplay {

    private fInternalCanvas: Nullable<HTMLCanvasElement>;
    private fTarget: Nullable<HTMLCanvasElement>;
    private fCameraBox: Nullable<HTMLElement>;
    private fSize: number;
    private fGetTerrainFunc: GetTerrainFunc;
    private fOnMouseDown: MinimapMouseFunc[] = [];
    private fOnMouseMove: MinimapMouseFunc[] = [];

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
        this.fTarget.addEventListener( 'mousedown' , (evt) => this.handleMouseDown(evt) );
        this.fTarget.addEventListener( 'mousemove' , (evt) => this.handleMouseMove(evt) );
    }

    public setCameraBox( cameraBox: HTMLElement ): void {
        this.fCameraBox = cameraBox;
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

    public updateCameraBox( position: Point , size: Point ): void {
        if ( this.fCameraBox && this.fTarget ) {
            this.fCameraBox.style.left = position.x / this.fSize * this.fTarget.width + 'px';
            this.fCameraBox.style.top = position.y / this.fSize * this.fTarget.height + 'px';
            this.fCameraBox.style.width = size.x / this.fSize * this.fTarget.width + 'px';
            this.fCameraBox.style.height = size.y / this.fSize * this.fTarget.height + 'px';
        }
    }   

    /**
     * Retrieves color of minimap pixel on tile x/y
     * @param x x-offset of tile
     * @param y y-offset of tile
     */
    public getTileColor( x: number , y: number ): Readonly<IColor> {
        const terrain: Terrain = this.fGetTerrainFunc( x , y );
        return TerrainData[ terrain ].color;
    }

    public onMouseMove( func: MinimapMouseFunc ): void {
        this.fOnMouseMove.push( func );
    }

    public onMouseDown( func: MinimapMouseFunc ): void {
        this.fOnMouseDown.push( func );
    }

    private getMouseData( event: MouseEvent ): IMinimapMouse {
        
        const mapPos: Point = new Point(
            Math.floor( event.offsetX / this.fTarget!.width * this.fSize ) ,
            Math.floor( event.offsetY / this.fTarget!.height * this.fSize ) ,
        );

        const MOUSE_LEFT = 1;
        const MOUSE_MIDDLE = 2;
        const MOUSE_RIGHT = 4;

        return {
            tilePosition: mapPos ,
            cursorPosition: new Point( event.clientX , event.clientY ) ,
            buttons: {
                left: ( event.buttons & MOUSE_LEFT ) == MOUSE_LEFT ,
                middle: ( event.buttons & MOUSE_MIDDLE ) == MOUSE_MIDDLE ,
                right: ( event.buttons & MOUSE_RIGHT ) == MOUSE_RIGHT ,
            } ,
        }

    }

    private handleMouseMove( event: MouseEvent ): void {
        const mouse: IMinimapMouse = this.getMouseData( event );
        this.fOnMouseMove.forEach( fn => fn( mouse ) );
    }

    private handleMouseDown( event: MouseEvent ): void {
        const mouse: IMinimapMouse = this.getMouseData( event );
        this.fOnMouseDown.forEach( fn => fn( mouse ) );
    }

}

export default MinimapDisplay;
