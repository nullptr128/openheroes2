
import Injectable from '../../IOC/Injectable';
import IMapDisplayPipelineElement from './IMapDisplayPipelineElement';
import Nullable from '../../Support/Nullable';
import ITile from '../../Model/ITile';
import * as Pixi from 'pixi.js';
import Inject from '../../IOC/Inject';
import Resources from '../../Engine/Resource/Resources';
import IMapDisplayData from './IMapDisplayData';
import PerfCounter from '../../Support/PerfCounter';
import Arrays from '../../Support/Arrays';

type GetTileFunc = ( x: number , y: number ) => Nullable<ITile>;

@Injectable()
class RoadPipeline implements IMapDisplayPipelineElement {

    @Inject( Resources )
    private gResources: Resources;

    private fContainer: Pixi.Container = new Pixi.Container();
    private fGetTileFunc: Nullable<GetTileFunc>;
    private fRoadTextures: Pixi.Texture[] = new Array( 32 );
    private fSprites: Pixi.Sprite[][] = [];

    /**
     * Sets the tile func used to retrieve tiles.
     * @param tileFunc function that returns tile
     */
    public setTileFunc( tileFunc: GetTileFunc ): void {
        this.fGetTileFunc = tileFunc;
    }

    /**
     * Loads graphics used by this pipeline.
     */
    public onInitialize(): Pixi.Container {
        
        for( let i = 0 ; i <= 31 ; ++i ) {
            this.fRoadTextures[i] = this.gResources.getIcnTexture( 'ROAD.ICN' , i );
        }

        return this.fContainer;

    }

    /**
     * Checks if fSprites array is correct size (it wont if zoom is changed)
     * @param data current map display data
     */
    private checkSprites( data: IMapDisplayData ): boolean {
        const spritesX: number = this.fSprites.length;
        const spritesY: number = ( this.fSprites.length > 0 ? this.fSprites[0].length : 0 );
        return ( spritesX === data.tilesWidth && spritesY === data.tilesHeight );
    }

    /**
     * Reinitializes fSprites array, enlarging or shrinking it to new size
     * @param data current map display data
     */
    private reinitializeSprites( data: IMapDisplayData ): void {

        const perf: PerfCounter = new PerfCounter();

        // resize array to new size using optimized alghoritm
        this.fSprites = Arrays.optiResize2dArray( this.fSprites , data.tilesWidth , data.tilesHeight , {
            onNew: (x,y) => {
                // for every new element, create and configure sprite
                const sprite: Pixi.Sprite = new Pixi.Sprite();
                sprite.position.set( x * data.tileSize - data.absOffsetX , y * data.tileSize - data.absOffsetY );
                sprite.scale.set( data.scale );
                this.fContainer.addChild( sprite );
                return sprite;
            } ,
            onRemove: ( sprite , x , y ) => {
                // for every removed element, remove it from display container
                this.fContainer.removeChild( sprite );
            } ,
        } );

        console.log( 'RoadPipeline::reinitializeSprites() -> ' + perf.delta() );

    }

    /**
     * Updates sprite position on screen
     * @param sprite target sprite
     * @param x x-tile position on screen
     * @param y y-tile position on screen
     * @param mirror should sprite be mirrored?
     * @param flip should sprite be flipped?
     * @param data map display data
     */
    private reposSprite( sprite: Pixi.Sprite , x: number , y: number , mirror: boolean , flip: boolean , data: IMapDisplayData ): void {
        
        const scaleXOffset: number = mirror ? data.tileSize : 0;
        const scaleYOffset: number = flip? data.tileSize : 0;

        const textureXOffset: number = ( sprite.texture as any )._offsetX * data.scale;
        const textureYOffset: number = ( sprite.texture as any )._offsetY * data.scale;

        sprite.position.set( 
            x * data.tileSize - data.absOffsetX + scaleXOffset + textureXOffset , 
            y * data.tileSize - data.absOffsetY + scaleYOffset + textureYOffset
        );
        sprite.scale.set( 
            mirror ? data.scale * -1 : data.scale ,  
            flip ? data.scale * -1 : data.scale ,
        );

    }

    /**
     * Refreshes all sprites, changing their graphics. Used when map is moved for more 
     * than few tiles, forcing redrawing and reinitializng container.
     * @param data 
     */
    public onRedraw( data: IMapDisplayData ): void {

        const perf: PerfCounter = new PerfCounter();
        
        if ( !this.checkSprites( data ) ) {
            this.reinitializeSprites( data );
        }

        for( let x = 0 ; x < data.tilesWidth ; ++x ) {
            for( let y = 0 ; y < data.tilesHeight ; ++y ) {

                const tileX: number = data.tileStart.x + x;
                const tileY: number = data.tileStart.y + y;

                const sprite: Pixi.Sprite = this.fSprites[x][y];
                const tile: Nullable<ITile> = this.fGetTileFunc!( tileX , tileY );

                if ( tile && tile.roadSprite !== null ) {
                    sprite.visible = true;
                    sprite.texture = this.fRoadTextures[ tile.roadSprite! ];
                    this.reposSprite( sprite , x , y , false , false , data );
                } else {
                    sprite.visible = false;
                }
                
            }
        }

        console.log( 'RiverPipeline::onRedraw() -> ' + perf.delta() );

    }

    public onUpdate( data: IMapDisplayData ): void {
    }

}

export default RoadPipeline;
