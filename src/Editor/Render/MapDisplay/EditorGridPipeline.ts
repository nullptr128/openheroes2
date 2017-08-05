
import Injectable from '../../../Common/IOC/Injectable';
import Paths from '../../../Common/Engine/Misc/Paths';
import Inject from '../../../Common/IOC/Inject';
import * as Pixi from 'pixi.js';
import IMapDisplayPipelineElement from '../../../Common/Render/MapDisplay/IMapDisplayPipelineElement';

@Injectable()
class EditorGridPipeline {

    @Inject( Paths )
    private gPaths: Paths;

    private fActive: boolean = true;
    private fGridTexture: Pixi.Texture;

    public initialize(): void {
        this.fGridTexture = Pixi.Texture.from( this.gPaths.getImageDir() + '/editor/grid.png' );
    }

    public getPipeline(): IMapDisplayPipelineElement {
        return {
            redraw: ( container , tileX , tileY , destX , destY , scale ) => {
                this.drawTile( container , destX , destY , scale );
            }
        }
    };

    private drawTile( container: Pixi.Container , destX: number , destY: number , scale: number ): void {
        
        const sprite: Pixi.Sprite = new Pixi.Sprite( this.fGridTexture );
        sprite.position.set( destX , destY );
        sprite.scale.set( scale );
        sprite.alpha = 0.3;
        container.addChild( sprite );

    }

}

export default EditorGridPipeline;
