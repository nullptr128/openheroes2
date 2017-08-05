
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

    public getPipeline(): IMapDisplayPipelineElement {
        return {
            startRedraw: () => {
                this.fMarkedTiles = [];
            } ,
            redraw: ( container , tileX , tileY , destX , destY , scale ) => {
                this.drawTile( container , tileX , tileY , destX , destY , scale );
            },
            update: ( container , startTileX , startTileY , tileSize , scale ) => {
                this.update( container , startTileX , startTileY , tileSize , scale );
            },
        }
    };

    public set( originX: number , originY: number , size: number ): void {
        this.fOrigin.x = originX;
        this.fOrigin.y = originY;
        this.fSize = size;
    }

    private drawTile( container: Pixi.Container , tileX: number , tileY: number , destX: number , destY: number , scale: number ): void {

        if ( this.contains( tileX , tileY ) ) {

            const sprite: Pixi.Sprite = new Pixi.Sprite( this.fGreenTexture );
            sprite.position.set( destX , destY );
            sprite.scale.set( scale );
            sprite.alpha = 0.35;

            container.addChild( sprite );

        }

    }

    private update( container: Pixi.Container , startTileX: number , startTileY: number , tileSize: number , scale: number ): void {

        console.log( 'update()' );

    }

    private contains( tileX: number , tileY: number ): boolean {
        if ( this.fSize % 2 == 0 ) {
            return (
                tileX >= this.fOrigin.x - Math.floor( this.fSize / 2.0 ) &&
                tileX <= this.fOrigin.x + Math.floor( (this.fSize - 1) / 2.0 ) &&
                tileY >= this.fOrigin.y - Math.floor( this.fSize / 2.0 ) &&
                tileY <= this.fOrigin.y + Math.floor( (this.fSize - 1) / 2.0 )
            );
        } else {
            return (
                tileX >= this.fOrigin.x - Math.floor( this.fSize / 2.0 ) &&
                tileX <= this.fOrigin.x + Math.floor( this.fSize / 2.0 ) &&
                tileY >= this.fOrigin.y - Math.floor( this.fSize / 2.0 ) &&
                tileY <= this.fOrigin.y + Math.floor( this.fSize / 2.0 )
            );
        }
    }

}

export default EditorBrushTilePipeline;
