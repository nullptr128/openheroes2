
import Injectable from '../../../Common/IOC/Injectable';
import Point from '../../../Common/Types/Point';
import IMapDisplayPipelineElement from '../../../Common/Render/MapDisplay/IMapDisplayPipelineElement';
import Container from '../../../Common/IOC/Container';
import * as Pixi from 'pixi.js';
import Paths from '../../../Common/Engine/Misc/Paths';
import Inject from '../../../Common/IOC/Inject';

@Injectable()
class EditorBrushTilePipeline {

    @Inject( Paths )
    private gPaths: Paths;

    private fGreenTexture: Pixi.Texture;
    private fOrigin: Point = Point.zero();
    private fSize: number = 0;
    private fMarkedTiles: Pixi.Sprite[] = [];

    public initialize(): void {
        this.fGreenTexture = Pixi.Texture.from( this.gPaths.getImageDir() + '/editor/green-tile.png' );
    }

    public set( originX: number , originY: number , size: number ): void {
        this.fOrigin.x = originX;
        this.fOrigin.y = originY;
        this.fSize = size;
    }

}

export default EditorBrushTilePipeline;
