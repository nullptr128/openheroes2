/**
 * OpenHeroes2
 * 
 * This class setups basic map display render pipeline that
 * is used both in editor and game. It is responsible for
 * rendering tiles, objects, etc on game screen.
 */

import Injectable from '../../IOC/Injectable';
import IMap from '../../Model/IMap';
import IMapDisplayPipelineElement from './IMapDisplayPipelineElement';
import * as Pixi from 'pixi.js';
import Inject from '../../IOC/Inject';
import Resources from '../../Engine/Resource/Resources';
import Terrain from '../../Types/Terrain';
import TerrainData from '../../Game/Terrain/TerrainData';
import ITerrainData from '../../Types/ITerrainData';
import ITile from '../../Model/ITile';
import Nullable from '../../Support/Nullable';
import IMapDisplayData from './IMapDisplayData';
import Tools from '../../Support/Tools';
import Arrays from '../../Support/Arrays';
import PerfCounter from '../../Support/PerfCounter';

type GetTileFunc = ( x: number , y: number ) => Nullable<ITile>;

@Injectable()
class TerrainPipeline implements IMapDisplayPipelineElement {

    @Inject( Resources )
    private gResources: Resources;

    private fGetTileFunc: Nullable<GetTileFunc>;
    private fTileTextures: Pixi.Texture[] = new Array(431);
    private fContainer: Pixi.Container = new Pixi.Container();
    private fSprites: Pixi.Sprite[][] = [];

    /**
     * Sets the tile func used to retrieve tiles.
     * @param tileFunc function that returns tile
     */
    public setTileFunc( tileFunc: GetTileFunc ): void {
        this.fGetTileFunc = tileFunc;
    }

    public onInitialize(): Pixi.Container {
        
        for( let i = 0 ; i < 431 ; ++i ) {
            this.fTileTextures[i] = this.gResources.getTilTexture( 'GROUND32.TIL' , i );
        }

        return this.fContainer;

    }

    private checkSprites( data: IMapDisplayData ): boolean {
        const spritesX: number = this.fSprites.length;
        const spritesY: number = ( this.fSprites.length > 0 ? this.fSprites[0].length : 0 );
        return ( spritesX === data.tilesWidth && spritesY === data.tilesHeight );
    }

    private reinitializeSprites( data: IMapDisplayData ): void {

        const perf: PerfCounter = new PerfCounter();

        this.fSprites = Arrays.optiResize2dArray( this.fSprites , data.tilesWidth , data.tilesHeight , {
            onNew: (x,y) => {
                const sprite: Pixi.Sprite = new Pixi.Sprite();
                sprite.position.set( x * data.tileSize - data.absOffsetX , y * data.tileSize - data.absOffsetY );
                sprite.scale.set( data.scale );
                this.fContainer.addChild( sprite );
                return sprite;
            } ,
            onRemove: ( sprite , x , y ) => {
                this.fContainer.removeChild( sprite );
            } ,
        } );

        console.log( 'TerrainPipeline::reinitializeSprites() -> ' + perf.delta() );

    }

    private reposSprite( sprite: Pixi.Sprite , x: number , y: number , mirror: boolean , flip: boolean , data: IMapDisplayData ): void {

        const scaleXOffset: number = mirror ? data.tileSize : 0;
        const scaleYOffset: number = flip? data.tileSize : 0;
        sprite.position.set( 
            x * data.tileSize - data.absOffsetX + scaleXOffset , 
            y * data.tileSize - data.absOffsetY + scaleYOffset 
        );
        sprite.scale.set( 
            mirror ? data.scale * -1 : data.scale ,  
            flip ? data.scale * -1 : data.scale ,
        );

    }

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

                if ( tile ) {
                    sprite.visible = true;
                    sprite.texture = this.fTileTextures[ tile.spriteId ];
                    this.reposSprite( sprite , x , y , tile.mirror , tile.flip , data );
                } else {
                    sprite.visible = false;
                }
                
            }
        }

        console.log( 'TerrainPipeline::onRedraw() -> ' + perf.delta() );

    }

    public onUpdate( data: IMapDisplayData ): void {
    }

}

export default TerrainPipeline;
