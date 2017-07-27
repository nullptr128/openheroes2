import Injectable from '../../Common/IOC/Injectable';
import IEditorState from '../Model/IEditorState';
import Events from '../../Common/Events/Events';
import IMap from '../../Common/Model/IMap';

@Injectable()
class EditorMapStore {

    private fState: IEditorState;
    private gEvents: Events;

    constructor( state: IEditorState , events: Events ) {
        this.fState = state;
        this.gEvents = events;
    }

    public getMap(): Readonly<IMap> {
        return this.fState.map;
    }

}

export default EditorMapStore;
