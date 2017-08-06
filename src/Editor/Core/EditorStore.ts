/**
 * OpenHeroes2
 * 
 * This class serves as main access point for editor state.
 * It holds the state and implements submodules that have
 * functions to retrieve and mutate state.
 */

import Injectable from '../../Common/IOC/Injectable';
import IEditorState from '../Model/IEditorState';
import EditorActiveTab from '../Types/EditorActiveTab';
import Inject from '../../Common/IOC/Inject';
import EditorUIStore from '../Store/EditorUIStore';
import EditorMapFactory from './EditorMapFactory';
import EditorMapStore from '../Store/EditorMapStore';
import PerfCounter from '../../Common/Support/PerfCounter';
import Events from '../../Common/Engine/Events/Events';
import Terrain from '../../Common/Types/Terrain';
import EditorTerrainBrushSize from '../Types/EditorTerrainBrushSize';

@Injectable()
class EditorStore {

    @Inject( Events )
    private gEvents: Events;

    @Inject( EditorMapFactory )
    private gEditorMapFactory: EditorMapFactory;

    private fState: IEditorState;

    public ui: EditorUIStore;
    public map: EditorMapStore;

    /**
     * Initializes EditorStore
     */
    public initialize(): void {
        // create initial store
        this.fState = {
            activeTab: EditorActiveTab.TERRAIN ,
            map: this.gEditorMapFactory.createBlankMap( 'Unnamed map' , '' , 72 ) ,
            isModified: false ,
            terrainOptions: {
                terrain: Terrain.WATER ,
                brushSize: EditorTerrainBrushSize.SINGLE ,
            } ,
        };
        // create helper modules
        this.ui = new EditorUIStore( this.fState , this.gEvents );
        this.map = new EditorMapStore( this.fState , this.gEvents );
    }

}

export default EditorStore;
