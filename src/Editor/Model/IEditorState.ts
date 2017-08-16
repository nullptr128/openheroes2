/**
 * OpenHeroes2
 * 
 * This module exports interface that defines a shape
 * for whole OpenHeroes2Editor state.
 */

import EditorActiveTab from '../Types/EditorActiveTab';
import IMap from '../../Common/Model/IMap';
import ITerrainOptions from './ITerrainOptions';

interface IEditorState {
    activeTab: EditorActiveTab;
    isGridEnabled: boolean;
    map: IMap;
    isModified: boolean;
    terrainOptions: ITerrainOptions;
}

export default IEditorState;
