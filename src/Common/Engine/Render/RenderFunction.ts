/**
 * OpenHeroes2
 * 
 * This module exports a function that must be passed to Render
 * class in order to render any scene.
 */

import * as Pixi from 'pixi.js';

type RenderFunction = (stage: Pixi.Container) => void;
export default RenderFunction;
