/**
 * OpenHeroes2
 * 
 * This class is responsible for drawing adventure map screen. It
 * is used both in editor and game itself and works on abstract way.
 * 
 * This class does not draw anything itself, instead you must pass
 * array of pipeline functions that are responsible for drawing particular
 * parts of screen, like tiles, rivers, roads, objects, etc.
 * 
 * It is implemented this way because render pipeline will be different
 * for editor and game, but still share some pipeline functions.
 * 
 * For example game does not need to display grid, editor does not need
 * to display current hero path arrows, but both of them have to display
 * terrains and objects.
 * 
 * As of rendering itself, we are going to create a function that creates
 * Pixi.Sprite's for every tile and object and such after a "redraw()".
 * After sprites on scene are prepared, they will be rendered continously
 * by Pixi.
 * 
 * When user moves camera slightly, we are moving whole scene on screen.
 * When camera is moved for a more than a 1 tile, it will become redrawn.
 * This way we can limit amount of recreating scene to only few times per
 * second (when scrolling) instead of 60 times per second.
 */

import * as Pixi from 'pixi.js';
import Injectable from '../../IOC/Injectable';
import Render from '../../Engine/Render/Render';
import Inject from '../../IOC/Inject';
import Position from '../../Types/Position';
import Container from '../../IOC/Container';
import IMap from '../../Model/IMap';
import Nullable from '../../Support/Nullable';
import IMapDisplayPipelineElement from './IMapDisplayPipelineElement';
import PerfCounter from '../../Support/PerfCounter';

@Injectable()
class MapDisplay {

    @Inject( Render )
    private gRender: Render;

    private fCanvas: HTMLCanvasElement;
    private fCameraPosition: Position = new Position( 0 , 0 );
    private fCameraDelta: Position = new Position( 0.000 , 0.000 );
    private fPipeline: IMapDisplayPipelineElement[] = [];
    private fMapContainer: Nullable<Pixi.Container>;
    private fNeedRedraw: boolean = false;

    /**
     * Creates and gets canvas for MapDisplay.
     * @param baseWidth width of canvas
     * @param baseHeight height of canvas
     */
    public createAndGetCanvas( baseWidth: number , baseHeight: number ): HTMLCanvasElement {
        this.fCanvas = this.gRender.getCanvas( baseWidth , baseHeight );
        return this.fCanvas;
    }

    /**
     * Sets pipeline for map rendering.
     * @param pipeline array of pipeline functions
     */
    public setPipeline( pipeline: IMapDisplayPipelineElement[] ): void {
        this.fPipeline = pipeline;
    }

    /**
     * Forces MapDisplay to make full redraw on next frame.
     */
    public forceRedraw(): void {
        this.fNeedRedraw = true;
    }

    /**
     * Renders adventure map view into pixi container.
     * @param stage 
     */
    public render( stage: Pixi.Container ): void {

        // mapdisplay is active before canvas is initialized
        if ( !this.fCanvas ) {
            return;
        }

        // redraw map if user moved screen for over 1 tile,
        // or it hasnt been drawn yet or
        // we forced redraw using forceRedraw() function.
        const needsRedraw: boolean = ( 
            this.fCameraDelta.x < -1.000 ||
            this.fCameraDelta.y < -1.000 ||
            this.fCameraDelta.x > 1.000 || 
            this.fCameraDelta.y > 1.000 || 
            !this.fMapContainer || 
            this.fNeedRedraw 
        );

        if ( needsRedraw ) {
            // fully reinitialize pixi scene, destroying and
            // recreating all sprites
            const perfCounter: PerfCounter = new PerfCounter();
            this.normalizeCamera();
            this.redraw( stage );
            console.log( 'redraw time: ' , perfCounter.delta() );
        }

        // update container position
        this.updateContainer();

    }

    /**
     * Returns size of tile for current zoom level.
     */
    private getTileSize(): number {
        return 32;
    }

    private normalizeCamera(): void {

        this.fCameraPosition.x += Math.floor( this.fCameraDelta.x );
        this.fCameraPosition.y += Math.floor( this.fCameraDelta.y );
        
        this.fCameraDelta.x = this.fCameraDelta.x % 1.000;
        this.fCameraDelta.y = this.fCameraDelta.y % 1.000;

    }

    /**
     * Redraws whole scene, destroying container and all sprites;
     * and then reinitializing them over.
     * @param stage
     */
    private redraw( stage: Pixi.Container ): void {

        // get tile size for current zoom
        const tileSize: number = this.getTileSize();

        // calculate bounds
        const startX: number = Math.floor( this.fCameraPosition.x - 2 );
        const startY: number = Math.floor( this.fCameraPosition.y - 2 );
        const endX: number = Math.floor( this.fCameraPosition.x ) + Math.ceil( this.fCanvas.width / tileSize ) + 2;
        const endY: number = Math.floor( this.fCameraPosition.y ) + Math.ceil( this.fCanvas.height / tileSize ) + 2;

        // erase old container
        if ( this.fMapContainer ) {
            stage.removeChild( this.fMapContainer );
            this.fMapContainer.destroy();
        }

        // create new container and add it to scene
        this.fMapContainer = new Pixi.Container();
        stage.addChild( this.fMapContainer );

        // push container through rendering pipeline
        // iterating from bottom-right to top-left
        // on line basis
        for( let y = endY ; y >= startY ; --y ) {
            for ( let x = endX ; x >= startX ; --x ) {
                this.redrawTile( x , y , startX , startY );
            }
        }

        // make sure we wont force redraw next frame
        this.fNeedRedraw = false;

    }

    /**
     * Pushes target tile through rendering pipeline.
     * @param tileX x position of tile on map
     * @param tileY y position of tile on map
     * @param startX x position of tile on screen
     * @param startY y position of tile on screen
     */
    private redrawTile( tileX: number , tileY: number , startX: number , startY: number ): void {

        // prepare data
        const tileSize: number = this.getTileSize();
        const drawX: number = ( tileX - startX - 2 ) * tileSize;
        const drawY: number = ( tileY - startY - 2 ) * tileSize;
        const scale: number = tileSize / 32.000;

        // call pipeline functions
        this.fPipeline.forEach( el => el.redraw( this.fMapContainer! , tileX , tileY , drawX , drawY , scale ) );

    }

    /**
     * Updates container without redrawing it fully; when camera is moved for a less than 1 tile,
     * we are moving container on screen for performance reasons.
     */
    private updateContainer(): void {

        const tileSize: number = this.getTileSize();
        const container: Pixi.Container = this.fMapContainer!;

        container.x = Math.floor( -this.fCameraDelta.x * tileSize );
        container.y = Math.floor( -this.fCameraDelta.y * tileSize );

    }

    public moveMap( offsetX: number , offsetY: number ): void {
        this.fCameraDelta.x += offsetX;
        this.fCameraDelta.y += offsetY;
    }

}

export default MapDisplay;
