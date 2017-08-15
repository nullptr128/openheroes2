/**
 * OpenHeroes2
 * 
 * This interface represents one MapDisplay pipeline element, that
 * will take care of rendering one layer of things on screen.
 */

import * as Pixi from 'pixi.js';
import IMapDisplayData from './IMapDisplayData';

interface IMapDisplayPipelineElement {
    onInitialize(): Pixi.Container;
    onRedraw?( data: IMapDisplayData ): void;
    onUpdate?( data: IMapDisplayData ): void;
}

export default IMapDisplayPipelineElement;
