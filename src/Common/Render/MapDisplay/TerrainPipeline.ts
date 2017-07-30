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

type GetTileFunc = ( x: number , y: number ) => Nullable<ITile>;

@Injectable()
class TerrainPipeline {

    @Inject( Resources )
    private gResources: Resources;

    private fGetTileFunc: Nullable<GetTileFunc>;

    /**
     * Sets the tile func used to retrieve tiles.
     * @param tileFunc function that returns tile
     */
    public setTileFunc( tileFunc: GetTileFunc ): void {
        this.fGetTileFunc = tileFunc;
    }

    /**
     * Creates terrain pipeline that renders terrain 
     */
    public getPipeline(): IMapDisplayPipelineElement {
        return {
            redraw: ( container , tileX , tileY , destX , destY , scale ) => {
                this.drawTile( container , tileX , tileY , destX , destY , scale );
            }
        };
    }

    /**
     * Renders tile on target position
     * @param container pixi container
     * @param tileX x-position of tile
     * @param tileY y-position of tile
     * @param destX draw at x position (in pixels)
     * @param destY draw at y position (in pixels)
     * @param scale draw at scale
     */
    private drawTile( container: Pixi.Container , tileX: number , tileY: number , destX: number , destY: number , scale: number ): void {

        if ( this.fGetTileFunc ) {
            
            const tile: Nullable<ITile> = this.fGetTileFunc( tileX , tileY );

            if ( tile ) {
                const texture: Pixi.Texture = this.gResources.getTilTexture( 'GROUND32.TIL' , tile.spriteId );
                const sprite: Pixi.Sprite = new Pixi.Sprite( texture );
                sprite.position.set( destX , destY );
                sprite.scale.set( scale );
                container.addChild( sprite );
            }

        } else {
            console.warn( 'No tile function provided for Terrain pipeline.' );
        }

    }

}

export default TerrainPipeline;
