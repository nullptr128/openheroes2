/**
 * OpenHeroes2
 * 
 * This module exports interface that defines a shape
 * for whole OpenHeroes2Editor state.
 */

import EditorActiveTab from '../Types/EditorActiveTab';
import IMap from '../../Common/Model/IMap';

interface IEditorState {
    activeTab: EditorActiveTab;
    map: IMap;
    isModified: boolean;
}

export default IEditorState;
