
import Terrain from '../../../Common/Types/Terrain';
import Nullable from '../../../Common/Support/Nullable';

interface IAutoBorderMatrixSprite {
    sprites: number[];
    mirror?: boolean;
    flip?: boolean;
}

type IAutoBorderMatrixSprites = Nullable<IAutoBorderMatrixSprite>;

interface NotTerrain {
    not: Terrain;
}

interface IAutoBorderMatrix {
    source: Nullable<Terrain | NotTerrain>[] ,
    out: IAutoBorderMatrixSprites[] ,
}

export default IAutoBorderMatrix;
