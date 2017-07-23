/**
 * OpenHeroes2
 * 
 * This file creates and exports service container for
 * Editor application.
 */

import Container from '../../Common/IOC/Container';
import EngineProvider from '../../Common/Providers/EngineProvider';
import EditorProvider from './EditorProvider';

const EditorContainer: Container = new Container();
EditorContainer.use( EngineProvider );
EditorContainer.use( EditorProvider );

export default EditorContainer;