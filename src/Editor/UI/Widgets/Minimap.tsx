
import * as React from 'react';
import EInject from '../../Core/EInject';
import MinimapDisplay from '../../../Common/Render/Minimap/MinimapDisplay';

export default class Minimap extends React.Component {

    @EInject( MinimapDisplay )
    private gMinimapDisplay: MinimapDisplay;

    public componentDidMount(): void {
        this.gMinimapDisplay.setRenderTarget( this.refs.canvas as HTMLCanvasElement );
    }

    public render(): JSX.Element {
        return (
            <div className="minimap">
                <canvas width="220" height="220" ref="canvas"/>
            </div>
        );
    }

}
