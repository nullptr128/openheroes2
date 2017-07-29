
import Injectable from '../../IOC/Injectable';
import * as Pixi from 'pixi.js';

type IPixiRenderer = Pixi.CanvasRenderer | Pixi.WebGLRenderer;

@Injectable()
class Render {

    private fRenderer: IPixiRenderer;

    public initialize( baseWidth: number , baseHeight: number ): void {
        this.fRenderer = Pixi.autoDetectRenderer( baseWidth , baseHeight );
    }

    public getCanvas( targetWidth: number , targetHeight: number ): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = this.fRenderer.view;
        canvas.style.width = targetWidth + 'px';
        canvas.style.height = targetHeight + 'px';
        return canvas;
    }

}

export default Render;
