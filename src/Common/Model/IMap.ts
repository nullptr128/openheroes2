
import ITile from './ITile';

interface IMap {
    name: string;
    description: string;
    size: number;
    tiles: ITile[][];
}

export default IMap;
