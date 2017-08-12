
import Nullable from '../../../Common/Support/Nullable';
import Terrain from '../../../Common/Types/Terrain';

type SourceFunction = (terrain: Terrain | null) => boolean;
type IMatrix<T> = [ T , T , T , T , T , T , T , T , T ];

interface IKeyValue<T> {
    [key: string]: T;
}

interface IMatcher {
    in: IMatrix<string> ,
    out: IMatrix<string> ,
}

interface IOutput {
    copyFrom: {
        x: number;
        y: number;
    };
}

interface IAutoFixerProcessor {

    sources: IKeyValue<SourceFunction>;
    outputs: IKeyValue<Nullable<IOutput>>;

    matchers: IMatcher[];

}

export default IAutoFixerProcessor;
