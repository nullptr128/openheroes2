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
    private fFinish: Point = Point.zero();
    private fMarkedTiles: Pixi.Sprite[][] = [];
    private fNeedsRefresh: boolean = false;
    private fContainer: Pixi.Container;
    private fIsVisible: boolean = true;

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
     */
    public set( originX: number , originY: number , finishX: number , finishY: number ): void {
        this.fOrigin.x = originX;
        this.fOrigin.y = originY;
        this.fFinish.x = finishX;
        this.fFinish.y = finishY;
        this.fNeedsRefresh = true;
    }

    public show(): void {
        this.fContainer.visible = true;
        this.fIsVisible = true;
    }

    public hide(): void {
        this.fContainer.visible = false;
        this.fIsVisible = false;
    }

    /**
     * Refreshes sprite cache when zoom is changed
     * @param data 
     */
    private refresh( data: IMapDisplayData ): void {

        const perf: PerfCounter = new PerfCounter();

        const newWidth: number = this.fFinish.x - this.fOrigin.x + 1;
        const newHeight: number = this.fFinish.y - this.fOrigin.y + 1;

        this.fMarkedTiles = Arrays.optiResize2dArray( this.fMarkedTiles , newWidth , newHeight , {
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

        if ( !this.fIsVisible ) {
            return;
        }

        if ( this.fNeedsRefresh ) {
            this.refresh( data );
            this.fNeedsRefresh = false;
        }

        for( let x = this.fOrigin.x ; x <= this.fFinish.x ; ++x ) {
            for( let y = this.fOrigin.y ; y <= this.fFinish.y ; ++y ) {
                const sprite: Pixi.Sprite = this.fMarkedTiles[x-this.fOrigin.x][y-this.fOrigin.y];
                const pX: number = ( x - data.tileStart.x ) * data.tileSize - data.absOffsetX;
                const pY: number = ( y - data.tileStart.y ) * data.tileSize - data.absOffsetY;
                sprite.position.set( pX , pY );
                sprite.scale.set( data.scale );
            }
        }

    }

}

export default EditorBrushTilePipeline;
