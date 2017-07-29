/**
 * OpenHeroes2
 * 
 * This class serves as helper module for EditorStore.
 * This one targets map-based retrieval and updates.
 */

import Injectable from '../../Common/IOC/Injectable';
import IEditorState from '../Model/IEditorState';
import Events from '../../Common/Events/Events';
import IMap from '../../Common/Model/IMap';
import ITile from '../../Common/Model/ITile';
import Tools from '../../Common/Support/Tools';

@Injectable()
class EditorMapStore {

    private fState: IEditorState;
    private gEvents: Events;

    constructor( state: IEditorState , events: Events ) {
        this.fState = state;
        this.gEvents = events;
    }

    public getMap(): IMap {
        return this.fState.map;
    }

    /**
     * Returns size of current map.
     */
    public getMapSize(): number {
        return this.fState.map.size;
    }

    /**
     * Retrieves read-only tile of current map.
     * @param x x-position of tile
     * @param y y-position of tile
     */
    public getMapTile( x: number , y: number ): Readonly<ITile> {
        const mapSize: number = this.getMapSize();
        if ( Tools.inRange( x , { min: 0 , max: mapSize - 1 } ) && Tools.inRange( y , { min: 0 , max: mapSize - 1 } ) ) {
            return this.fState.map.tiles[x][y];
        } else {
            throw new Error( 'EditorMapStore.getMapTile() - position [' + x + '/' + y + '] is out of map range!' );
        }
    }

}

export default EditorMapStore;
