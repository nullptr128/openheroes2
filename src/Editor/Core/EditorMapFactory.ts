/**
 * OpenHeroes2
 * 
 * This class serves as factory for creating new maps 
 * in OpenHeroes2 map editor.
 */

import Injectable from '../../Common/IOC/Injectable';
import IMap from '../../Common/Model/IMap';
import ITile from '../../Common/Model/ITile';
import Arrays from '../../Common/Support/Arrays';
import Terrain from '../../Common/Types/Terrain';

@Injectable()
class EditorMapFactory {

    /**
     * Creates new blank map
     * @param name name of new map
     * @param description description of new map
     * @param size size of new map
     */
    public createBlankMap( name: string , description: string , size: number ): IMap {
        return {
            name ,
            description , 
            size ,
            tiles: this.createBlankTiles( size ) ,
        };
    }

    /**
     * Creates tiles for new blank map.
     * @param mapSize size of map
     */
    private createBlankTiles( mapSize: number ): ITile[][] {
        return Arrays.create2dArray( mapSize , mapSize , (x,y) => {
            return {
                x ,
                y ,
                terrain: Terrain.WATER ,
                spriteId: 0 ,
            };
        } );
    }

}

export default EditorMapFactory;
