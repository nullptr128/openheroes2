
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

}

export default EditorGridPipeline;
