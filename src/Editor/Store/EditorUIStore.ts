/**
 * OpenHeroes2
 * 
 * This class serves as helper module for EditorStore.
 * This one targets editor UI, like active tabs etc.
 */

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

    /**
     * Returns currently selected tab from toolbar.
     */
    public getActiveTab(): EditorActiveTab {
        return this.fState.activeTab;
    }

    /**
     * Sets currently selected tab on toolbar.
     * @param tab new selected tab
     */
    public setActiveTab( tab: EditorActiveTab ): void {
        this.fState.activeTab = tab;
        this.gEvents.trigger( ETabChanged , { activeTab: tab } );
    }

}

export default EditorUIStore;
