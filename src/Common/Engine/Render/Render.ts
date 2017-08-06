/**
 * OpenHeroes2
 * 
 * This class is responsible for creating and managing Pixi.js
 * renderer.
 */

import * as Pixi from 'pixi.js';
import Injectable from '../../IOC/Injectable';
import RenderFunction from './RenderFunction';
import Nullable from '../../Support/Nullable';

type IPixiRenderer = Pixi.CanvasRenderer | Pixi.WebGLRenderer;

@Injectable()
class Render {

    private fRenderer: IPixiRenderer;
    private fStage: Pixi.Container;

    /**
     * Initializes Pixi renderer with target width and height.
     * Width and height does not matter as renderer will be
     * resized to fit sizes in getCanvas() function anyway.
     * @param baseWidth 
     * @param baseHeight 
     */
    public initialize( baseWidth: number , baseHeight: number ): void {
        this.fRenderer = Pixi.autoDetectRenderer( baseWidth , baseHeight );
        this.fStage = new Pixi.Container();
    }

    /**
     * Returns html canvas element associated with renderer, also scaling
     * both canvas and renderer to target sizes.
     * @param targetWidth size of viewport
     * @param targetHeight size of viewport
     */
    public getCanvas( targetWidth: number , targetHeight: number ): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = this.fRenderer.view;
        canvas.style.width = targetWidth + 'px';
        canvas.style.height = targetHeight + 'px';
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        this.fRenderer.resize( targetWidth , targetHeight );
        return canvas;
    }

    /**
     * Renders single animation frame using particular render function.
     * @param renderFunction function to use in rendering
     */
    public render( renderFunction: RenderFunction ): void {
        renderFunction();
        this.fRenderer.render( this.fStage );
    }

    public addContainer( container: Pixi.Container ): void {
        this.fStage.addChild( container );
    }

}

export default Render;
