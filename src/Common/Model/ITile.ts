import Terrain from '../Types/Terrain';

interface ITile {
    x: number;
    y: number;
    terrain: Terrain;
    spriteId: number;
}

export default ITile;
