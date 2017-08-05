/**
 * OpenHeroes2
 * 
 * This class serves as helper module for EditorStore.
 * This one targets editor UI, like active tabs etc.
 */

import IEditorState from '../Model/IEditorState';
import EditorActiveTab from '../Types/EditorActiveTab';
import ETabChanged from '../Events/ETabChanged';
import Events from '../../Common/Engine/Events/Events';
import EditorTerrainBrushSize from '../Types/EditorTerrainBrushSize';
import Terrain from '../../Common/Types/Terrain';

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

    public getTerrainBrushSize(): EditorTerrainBrushSize {
        return this.fState.terrainOptions.brushSize;
    }

    public setTerrainBrushSize( brushSize: EditorTerrainBrushSize ): void {
        this.fState.terrainOptions.brushSize = brushSize;
    }

    public getTerrainBrushType(): Terrain {
        return this.fState.terrainOptions.terrain;
    }

    public setTerrainBrushType( terrainType: Terrain ): void {
        this.fState.terrainOptions.terrain = terrainType;
    }

}

export default EditorUIStore;
