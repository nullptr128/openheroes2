/**
 * OpenHeroes2
 * 
 * Defines type of function that receives mouseup/down/move events from MapDisplay.
 */

import IMapDisplayMouse from './IMapDisplayMouse';

type MapDisplayMouseFunction = (mouse: IMapDisplayMouse) => void;
export default MapDisplayMouseFunction;
