
import * as Pixi from 'pixi.js';

interface IMapDisplayPipelineElement {
    redraw( container: Pixi.Container , tileX: number , tileY: number , destX: number , destY: number , scale: number ): void;
}

export default IMapDisplayPipelineElement;
