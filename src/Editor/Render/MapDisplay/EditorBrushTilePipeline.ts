/**
 * OpenHeroes2
 * 
 * This MapDisplay pipeline handler is responsible for drawing
 * green tile marker under cursor when user is painting terrain.
 */

import Injectable from '../../../Common/IOC/Injectable';
import Point from '../../../Common/Types/Point';
import IMapDisplayPipelineElement from '../../../Common/Render/MapDisplay/IMapDisplayPipelineElement';
import Container from '../../../Common/IOC/Container';
import * as Pixi from 'pixi.js';
import Paths from '../../../Common/Engine/Misc/Paths';
import Inject from '../../../Common/IOC/Inject';
import IMapDisplayData from '../../../Common/Render/MapDisplay/IMapDisplayData';
import Arrays from '../../../Common/Support/Arrays';
import PerfCounter from '../../../Common/Support/PerfCounter';

@Injectable()
class EditorBrushTilePipeline implements IMapDisplayPipelineElement {

    @Inject( Paths )
    private gPaths: Paths;

    private fGreenTexture: Pixi.Texture;
    private fOrigin: Point = Point.zero();
    private fSize: number = 0;
    private fMarkedTiles: Pixi.Sprite[][] = [];
    private fNeedsRefresh: boolean = false;
    private fContainer: Pixi.Container;

    /**
     * Initializes graphics required for this pipeline
     */
    public onInitialize(): Pixi.Container {
        this.fGreenTexture = Pixi.Texture.from( this.gPaths.getImageDir() + '/editor/green-tile.png' );
        this.fContainer = new Pixi.Container();
        return this.fContainer;
    }

    /**
     * Moves highlight to new position and changes its size
     * @param originX x-position on map
     * @param originY y-position on map
     * @param size size in tiles
     */
    public set( originX: number , originY: number , size: number ): void {
        this.fOrigin.x = originX;
        this.fOrigin.y = originY;
        this.fSize = size;
        this.fNeedsRefresh = true;
    }

    /**
     * Refreshes sprite cache when zoom is changed
     * @param data 
     */
    private refresh( data: IMapDisplayData ): void {

        const perf: PerfCounter = new PerfCounter();

        this.fMarkedTiles = Arrays.optiResize2dArray( this.fMarkedTiles , this.fSize , this.fSize , {
            onNew: (x,y) => {
                const sprite: Pixi.Sprite = new Pixi.Sprite( this.fGreenTexture );
                sprite.alpha = 0.3;
                sprite.scale.set( data.scale );
                this.fContainer.addChild( sprite );
                return sprite;
            } ,
            onRemove: (sprite) => {
                this.fContainer.removeChild( sprite );
            } ,
        } );

    }

    /**
     * Updates sprite cache to reflect new position of green tile marker
     * @param data 
     */
    public onUpdate( data: IMapDisplayData ): void {

        if ( this.fNeedsRefresh ) {
            this.refresh( data );
            this.fNeedsRefresh = false;
        }

        const startX: number = this.fOrigin.x - Math.floor( this.fSize / 2.000 );
        const startY: number = this.fOrigin.y - Math.floor( this.fSize / 2.000 );
        const endX: number = startX + this.fSize;
        const endY: number = startY + this.fSize;

        for( let x = 0 ; x < this.fSize ; ++x ) {
            for( let y = 0 ; y < this.fSize ; ++y ) {
                const sprite: Pixi.Sprite = this.fMarkedTiles[x][y];
                const pX: number = ( x + startX - data.tileStart.x ) * data.tileSize - data.absOffsetX;
                const pY: number = ( y + startY - data.tileStart.y ) * data.tileSize - data.absOffsetY;
                sprite.position.set( pX , pY );
                sprite.scale.set( data.scale );
            }
        }

    }

}

export default EditorBrushTilePipeline;
