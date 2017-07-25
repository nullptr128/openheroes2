
import EditorActiveTab from '../Types/EditorActiveTab';
import IMap from '../../Common/Model/IMap';

interface IEditorState {
    activeTab: EditorActiveTab;
    map: IMap;
    isModified: boolean;
}

export default IEditorState;
