
import Injectable from '../../IOC/Injectable';
import IMap from '../../Model/IMap';
import IMapDisplayPipelineElement from './IMapDisplayPipelineElement';
import * as Pixi from 'pixi.js';
import Inject from '../../IOC/Inject';
import EditorStore from '../../../Editor/Core/EditorStore';

@Injectable()
class MapDisplayBasicPipeline {

    @Inject( EditorStore )
    private gEditorStore: EditorStore;

    public getPipelines(): IMapDisplayPipelineElement[] {
        return [
            this.getTerrainPipeline()
        ];
    }

    public getTerrainPipeline(): IMapDisplayPipelineElement {
        return {
            redraw( container , tileX , tileY , destX , destY , scale ) {
                console.log( 'sprite: ' , destX , destY );
                const sprite: Pixi.Sprite = Pixi.Sprite.from( '../../resource/img/editor/grass.png' );
                sprite.position.set( destX , destY );
                sprite.scale.set( scale );
                container.addChild( sprite );
            }
        };
    }

}

export default MapDisplayBasicPipeline;
