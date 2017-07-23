/**
 * OpenHeroes2
 * 
 * This module creates EInject() decator which automatically
 * injects properties into React components from EditorContainer.
 */

import EditorContainer from './EditorContainer';

const EInject = EditorContainer.createInjectDecorator();
export default EInject;
