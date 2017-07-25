import IEditorState from '../Model/IEditorState';
import Events from '../../Common/Events/Events';
import EditorActiveTab from '../Types/EditorActiveTab';
import ETabChanged from '../Events/ETabChanged';

class EditorUIStore {

    private fState: IEditorState;
    private gEvents: Events;

    constructor( state: IEditorState , events: Events ) {
        this.fState = state;
        this.gEvents = events;
    }

    public getActiveTab(): EditorActiveTab {
        return this.fState.activeTab;
    }

    public setActiveTab( tab: EditorActiveTab ): void {
        this.fState.activeTab = tab;
        this.gEvents.trigger( ETabChanged , { activeTab: tab } );
    }

}

export default EditorUIStore;
