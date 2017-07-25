
import Injectable from '../../Common/IOC/Injectable';
import IMap from '../../Common/Model/IMap';
import ITile from '../../Common/Model/ITile';
import Arrays from '../../Common/Support/Arrays';
import Terrain from '../../Common/Types/Terrain';

@Injectable()
class EditorMapFactory {

    public createBlankMap( name: string , description: string , size: number ): IMap {
        return {
            name ,
            description , 
            size ,
            tiles: this.createBlankTiles( size ) ,
        };
    }

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
