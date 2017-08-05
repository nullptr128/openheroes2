
import * as Pixi from 'pixi.js';

interface IMapDisplayPipelineElement {
    startRedraw?(): void;
    redraw( container: Pixi.Container , tileX: number , tileY: number , destX: number , destY: number , scale: number ): void;
    update?( container: Pixi.Container , startTileX: number , startTileY: number , tileSize: number , scale: number ): void;
}

export default IMapDisplayPipelineElement;
