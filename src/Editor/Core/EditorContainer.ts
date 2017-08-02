/**
 * OpenHeroes2
 * 
 * This file creates and exports service container for
 * Editor application.
 */

import Container from '../../Common/IOC/Container';
import EngineProvider from '../../Common/Providers/EngineProvider';
import EditorProvider from './EditorProvider';
import RenderProvider from '../../Common/Providers/RenderProvider';

const EditorContainer: Container = new Container();
EditorContainer.use( EngineProvider );
EditorContainer.use( EditorProvider );
EditorContainer.use( RenderProvider );
EditorContainer.callInitializers();

export default EditorContainer;