/**
 * OpenHeroes2
 * 
 * This mapdisplay pipeline is reposnible for drawing grid on editor.
 */

import Injectable from '../../../Common/IOC/Injectable';
import Paths from '../../../Common/Engine/Misc/Paths';
import Inject from '../../../Common/IOC/Inject';
import * as Pixi from 'pixi.js';
import IMapDisplayPipelineElement from '../../../Common/Render/MapDisplay/IMapDisplayPipelineElement';
import IMapDisplayData from '../../../Common/Render/MapDisplay/IMapDisplayData';
import PerfCounter from '../../../Common/Support/PerfCounter';
import Arrays from '../../../Common/Support/Arrays';
import Nullable from '../../../Common/Support/Nullable';
import ITile from '../../../Common/Model/ITile';
import Events from '../../../Common/Engine/Events/Events';
import EEditorGridEnabledChanged from '../../Events/EEditorGridEnabledChanged';

@Injectable()
class EditorGridPipeline implements IMapDisplayPipelineElement {

    @Inject( Paths )
    private gPaths: Paths;

    @Inject( Events )
    private gEvents: Events;

    private fGridTexture: Pixi.Texture;
    private fContainer: Pixi.Container;
    private fSprites: Pixi.Sprite[][] = [];

    /**
     * Initializes graphics required for this pipeline
     */
    public onInitialize(): Pixi.Container {

        this.gEvents.on( EEditorGridEnabledChanged , (data) => {
            this.fContainer.visible = data.value;
        } );
        
        this.fGridTexture = Pixi.Texture.from( this.gPaths.getImageDir() + '/editor/grid.png' );
        this.fContainer = new Pixi.Container();
        this.fContainer.visible = false;
        return this.fContainer;

    }

    /**
     * Checks if sprite cache has correct width and height
     * @param data 
     */
    private checkSprites( data: IMapDisplayData ): boolean {
        const spritesX: number = this.fSprites.length;
        const spritesY: number = ( this.fSprites.length > 0 ? this.fSprites[0].length : 0 );
        return ( spritesX === data.tilesWidth && spritesY === data.tilesHeight );
    }

    /**
     * Reinitializes sprite cache, resizing it using optimized alghoritm
     * @param data 
     */
    private reinitializeSprites( data: IMapDisplayData ): void {

        const perf: PerfCounter = new PerfCounter();

        this.fSprites = Arrays.optiResize2dArray( this.fSprites , data.tilesWidth , data.tilesHeight , {
            onNew: (x,y) => {
                const sprite: Pixi.Sprite = new Pixi.Sprite( this.fGridTexture );
                sprite.position.set( x * data.tileSize - data.absOffsetX , y * data.tileSize - data.absOffsetY );
                sprite.scale.set( data.scale );
                sprite.alpha = 0.3;
                this.fContainer.addChild( sprite );
                return sprite;
            } ,
            onRemove: ( sprite , x , y ) => {
                this.fContainer.removeChild( sprite );
            } ,
        } );

        console.log( 'EditorGridPipeline::reinitializeSprites() -> ' + perf.delta() );

    }

    /**
     * Redraws grid, when zoom is changed for example
     * @param data 
     */
    public onRedraw( data: IMapDisplayData ): void {

        const perf: PerfCounter = new PerfCounter();
        
        if ( !this.checkSprites( data ) ) {
            this.reinitializeSprites( data );
        }

        for( let x = 0 ; x < data.tilesWidth ; ++x ) {
            for( let y = 0 ; y < data.tilesHeight ; ++y ) {
                const sprite: Pixi.Sprite = this.fSprites[x][y];
                sprite.position.set( x * data.tileSize - data.absOffsetX , y * data.tileSize - data.absOffsetY );
                sprite.scale.set( data.scale );
            }
        }

        console.log( 'EditorGridPipeline::onRedraw() -> ' + perf.delta() );

    }

}

export default EditorGridPipeline;
