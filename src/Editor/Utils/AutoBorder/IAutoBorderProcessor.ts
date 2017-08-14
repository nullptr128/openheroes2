import Terrain from '../../../Common/Types/Terrain';
import Nullable from '../../../Common/Support/Nullable';

type SourceFunction = (terrain: Terrain | null) => boolean;

interface IKeyValue<T> {
    [key: string]: T;
}

type IShortMatrix<T> = [ T , T , T , T ];
type ILongMatrix<T> = [ T , T , T , T , T , T , T , T , T ];

export type IMatrix<T> = IShortMatrix<T> | ILongMatrix<T>;
type IOutput = number[];

export interface IAutoBorderMatcher {
    in: IMatrix<string>;
    out: IMatrix<string>;
    priority: number;
    noTransform?: boolean;
    outMirror?: boolean;
    outFlip?: boolean;
}

interface IAutoBorderProcessor {

    sources: IKeyValue<SourceFunction>;
    outputs: IKeyValue< Nullable<IOutput> >;
    matchers: IAutoBorderMatcher[];

}

export default IAutoBorderProcessor;
