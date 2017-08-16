/**
 * OpenHeroes2
 * 
 * This class serves as helper module for EditorStore.
 * This one targets editor UI, like active tabs etc.
 */

import IEditorState from '../Model/IEditorState';
import EditorActiveTab from '../Types/EditorActiveTab';
import Events from '../../Common/Engine/Events/Events';
import EditorTerrainBrushSize from '../Types/EditorTerrainBrushSize';
import Terrain from '../../Common/Types/Terrain';
import EEditorTabChanged from '../Events/EEditorTabChanged';
import EEditorGridEnabledChanged from '../Events/EEditorGridEnabledChanged';

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
        this.gEvents.trigger( EEditorTabChanged , { activeTab: tab } );
    }

    public isGridEnabled(): boolean {
        return this.fState.isGridEnabled;
    }

    public setGridEnabled( value: boolean ): void {
        this.fState.isGridEnabled = value;
        this.gEvents.trigger( EEditorGridEnabledChanged , { value: value } );
    }

    /**
     * Gets terrain painter brush size selected
     */
    public getTerrainBrushSize(): EditorTerrainBrushSize {
        return this.fState.terrainOptions.brushSize;
    }

    /**
     * Sets terrain painter brush size
     * @param brushSize new brush size
     */
    public setTerrainBrushSize( brushSize: EditorTerrainBrushSize ): void {
        this.fState.terrainOptions.brushSize = brushSize;
    }

    /**
     * Gets terrain painter brush type
     */
    public getTerrainBrushType(): Terrain {
        return this.fState.terrainOptions.terrain;
    }

    /**
     * Sets terrain painter brush type
     * @param terrainType new terrain type
     */
    public setTerrainBrushType( terrainType: Terrain ): void {
        this.fState.terrainOptions.terrain = terrainType;
    }

    /**
     * Gets terrain painter alternative (right mouse button) brush type
     */
    public getTerrainAltBrushType(): Terrain {
        return this.fState.terrainOptions.altTerrain;
    }

    /**
     * Sets terrain painter alternative (right mouse button) brush type
     * @param terrainType 
     */
    public setTerrainAltBrushType( terrainType: Terrain ): void {
        this.fState.terrainOptions.altTerrain = terrainType;
    }

}

export default EditorUIStore;
