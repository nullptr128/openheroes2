
import * as Pixi from 'pixi.js';
import Injectable from '../../IOC/Injectable';
import RenderFunction from './RenderFunction';
import Nullable from '../../Support/Nullable';

type IPixiRenderer = Pixi.CanvasRenderer | Pixi.WebGLRenderer;

@Injectable()
class Render {

    private fRenderer: IPixiRenderer;
    private fRenderFunc: Nullable<RenderFunction>;
    private fStage: Pixi.Container;

    public initialize( baseWidth: number , baseHeight: number ): void {
        this.fRenderer = Pixi.autoDetectRenderer( baseWidth , baseHeight );
        this.fStage = new Pixi.Container();
    }

    public getCanvas( targetWidth: number , targetHeight: number ): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = this.fRenderer.view;
        canvas.style.width = targetWidth + 'px';
        canvas.style.height = targetHeight + 'px';
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        this.fRenderer.resize( targetWidth , targetHeight );
        return canvas;
    }

    public startRender( renderFunction: RenderFunction ): void {
        this.fRenderFunc = renderFunction;
        this.renderLoop();
    }

    public stopRender(): void {
        this.fRenderFunc = null;
    }

    public renderLoop(): void {

        const internalRender = () => {
            // we will only run render function if it was not detached...
            if ( this.fRenderFunc ) {
                // call render func with correct delta time
                this.fRenderFunc( this.fStage );
                // render stage
                this.fRenderer.render( this.fStage );
                // request next redraw
                requestAnimationFrame( internalRender );       
            }
        };

        requestAnimationFrame( internalRender );

    }

}

export default Render;
