
import * as React from 'react';
import EInject from '../../Core/EInject';
import MinimapDisplay from '../../../Common/Render/Minimap/MinimapDisplay';
import MapControl from '../../Actions/MapControl';

export default class Minimap extends React.Component {

    @EInject( MinimapDisplay )
    private gMinimapDisplay: MinimapDisplay;

    @EInject( MapControl )
    private gMapControl: MapControl;

    public componentDidMount(): void {
        this.gMinimapDisplay.setRenderTarget( this.refs.canvas as HTMLCanvasElement );
        this.gMinimapDisplay.setCameraBox( this.refs.cameraBox as HTMLElement );
        this.gMinimapDisplay.redrawMap();
        this.gMapControl.updateMinimapBox();
    }

    public render(): JSX.Element {
        return (
            <div className="minimap">
                <canvas width="220" height="220" ref="canvas"/>
                <div className="camera-box" ref="cameraBox"></div>
            </div>
        );
    }

}
