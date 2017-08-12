/**
 * OpenHeroes2
 * 
 * This class serves as helper module for EditorStore.
 * This one targets map-based retrieval and updates.
 */

import Injectable from '../../Common/IOC/Injectable';
import IEditorState from '../Model/IEditorState';
import IMap from '../../Common/Model/IMap';
import ITile from '../../Common/Model/ITile';
import Tools from '../../Common/Support/Tools';
import Events from '../../Common/Engine/Events/Events';
import Terrain from '../../Common/Types/Terrain';
import Nullable from '../../Common/Support/Nullable';

@Injectable()
class EditorMapStore {

    private fState: IEditorState;
    private gEvents: Events;

    constructor( state: IEditorState , events: Events ) {
        this.fState = state;
        this.gEvents = events;
    }

    /**
     * Returns size of current map.
     */
    public getMapSize(): number {
        return this.fState.map.size;
    }

    public isValidTile( x: number , y: number ): boolean {
        return ( 
            x >= 0 &&
            y >= 0 &&
            x < this.fState.map.size &&
            y < this.fState.map.size
        );
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

    public getMapTileOrNull( x: number , y: number ): Readonly<Nullable<ITile>> {
        if ( this.isValidTile( x , y ) ) {
            return this.getMapTile( x , y );
        } else {
            return null;
        }
    }

    public setTileTerrain( x: number , y: number , terrain: Terrain , spriteId: number , mirror?: boolean , flip?: boolean ): void {
        const mapSize: number = this.getMapSize();
        if ( Tools.inRange( x , { min: 0 , max: mapSize - 1 } ) && Tools.inRange( y , { min: 0 , max: mapSize - 1 } ) ) {
            this.fState.map.tiles[x][y].terrain = terrain;
            this.fState.map.tiles[x][y].spriteId = spriteId;
            this.fState.map.tiles[x][y].mirror = !!mirror;
            this.fState.map.tiles[x][y].flip = !!flip;
        }
    }

}

export default EditorMapStore;
