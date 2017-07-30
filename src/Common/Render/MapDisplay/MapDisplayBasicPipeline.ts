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

@Injectable()
class MapDisplayBasicPipeline {

    @Inject( Resources )
    private gResources: Resources;

    private fMap: IMap;

    /**
     * Sets map that pipeline will read tiles from.
     * @param map 
     */
    public setMap( map: IMap ): void {
        this.fMap = map;
    }

    /**
     * Returns array of pipelines to marge with MapDisplay
     * pipeline.
     */
    public getPipelines(): IMapDisplayPipelineElement[] {
        return [
            this.getTerrainPipeline()
        ];
    }

    /**
     * Creates terrain pipeline that renders terrain 
     */
    public getTerrainPipeline(): IMapDisplayPipelineElement {
        return {
            redraw: ( container , tileX , tileY , destX , destY , scale ) => {
                const texture: Pixi.Texture = this.gResources.getTilTexture( 'GROUND32.TIL' , 16 );
                const sprite: Pixi.Sprite = new Pixi.Sprite( texture );
                sprite.position.set( destX , destY );
                sprite.scale.set( scale );
                container.addChild( sprite );
            }
        };
    }

}

export default MapDisplayBasicPipeline;
