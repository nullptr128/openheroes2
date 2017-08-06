
import * as Pixi from 'pixi.js';
import IMapDisplayData from './IMapDisplayData';

interface IMapDisplayPipelineElement {
    onInitialize(): Pixi.Container;
    onRedraw?( data: IMapDisplayData ): void;
    onUpdate?( data: IMapDisplayData ): void;
}

export default IMapDisplayPipelineElement;
