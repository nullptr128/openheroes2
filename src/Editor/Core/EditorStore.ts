
import Injectable from '../../Common/IOC/Injectable';
import IEditorState from '../Model/IEditorState';
import EditorActiveTab from '../Types/EditorActiveTab';
import Events from '../../Common/Events/Events';
import Inject from '../../Common/IOC/Inject';
import ETabChanged from '../Events/ETabChanged';
import EditorUIStore from '../Store/EditorUIStore';
import EditorMapFactory from './EditorMapFactory';
import EditorMapStore from '../Store/EditorMapStore';

@Injectable()
class EditorStore {

    @Inject( Events )
    private gEvents: Events;

    @Inject( EditorMapFactory )
    private gEditorMapFactory: EditorMapFactory;

    private fState: IEditorState;

    public ui: EditorUIStore;
    public map: EditorMapStore;

    public initialize(): void {
        this.fState = {
            activeTab: EditorActiveTab.TERRAIN ,
            map: this.gEditorMapFactory.createBlankMap( 'Unnamed map' , '' , 72 ) ,
            isModified: false
        };
        this.ui = new EditorUIStore( this.fState , this.gEvents );
        this.map = new EditorMapStore( this.fState , this.gEvents );
    }

}

export default EditorStore;
