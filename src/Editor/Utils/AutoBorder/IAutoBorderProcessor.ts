import Terrain from '../../../Common/Types/Terrain';
import Nullable from '../../../Common/Support/Nullable';

type SourceFunction = (terrain: Terrain | null) => boolean;

interface IKeyValue<T> {
    [key: string]: T;
}

interface IOutput {
    sprites: number[];
    mirror?: boolean;
    flip?: boolean;
}

type IMatrix<T> = [ T , T , T , T , T , T , T , T , T ];

interface IMatcher {
    in: IMatrix<string> ,
    out: IMatrix<string> ,
}

interface IAutoBorderProcessor {

    sources: IKeyValue<SourceFunction>;
    outputs: IKeyValue< Nullable<IOutput> >;
    matchers: IMatcher[];

}

export default IAutoBorderProcessor;
