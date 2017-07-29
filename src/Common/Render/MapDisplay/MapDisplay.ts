/**
 * OpenHeroes2
 * 
 * This class is responsible for drawing game screen.
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

@Injectable()
class MapDisplay {

    @Inject( Render )
    private gRender: Render;

    private fCanvas: HTMLCanvasElement;
    private fCameraPosition: Position = new Position( 0 , 0 );
    private fCameraDelta: Position = new Position( 0.000 , 0.000 );
    private fPipeline: IMapDisplayPipelineElement[] = [];
    private fMapContainer: Nullable<Pixi.Container>;

    public createAndGetCanvas( baseWidth: number , baseHeight: number ): HTMLCanvasElement {
        this.fCanvas = this.gRender.getCanvas( baseWidth , baseHeight );
        return this.fCanvas;
    }

    public setPipeline( pipeline: IMapDisplayPipelineElement[] ): void {
        this.fPipeline = pipeline;
    }

    public render( stage: Pixi.Container ): void {

        if ( !this.fCanvas ) {
            return;
        }

        const needsRedraw: boolean = ( this.fCameraDelta.x > 1.000 || this.fCameraDelta.y > 1.000 || !this.fMapContainer );

        if ( needsRedraw ) {
            this.redraw( stage );
        } else {
            this.updateContainer();
        }

    }

    private getTileSize(): number {
        return 32;
    }

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
        }

        // create new container
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

    }

    private redrawTile( tileX: number , tileY: number , startX: number , startY: number ): void {

        const tileSize: number = this.getTileSize();
        const drawX: number = ( tileX - startX ) * tileSize;
        const drawY: number = ( tileY - startY ) * tileSize;
        const scale: number = tileSize / 32.000;

        this.fPipeline.forEach( el => el.redraw( this.fMapContainer! , tileX , tileY , drawX , drawY , scale ) );

    }

    private updateContainer(): void {

        const tileSize: number = this.getTileSize();
        const container: Pixi.Container = this.fMapContainer!;

        container.x = this.fCameraDelta.x * tileSize;
        container.y = this.fCameraDelta.y * tileSize;

    }

}

export default MapDisplay;
