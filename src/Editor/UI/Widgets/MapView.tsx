
import * as React from 'react';
import MapDisplay from '../../../Common/Render/MapDisplay/MapDisplay';
import EInject from '../../Core/EInject';

export default class MapView extends React.Component {

    @EInject( MapDisplay )
    private gMapDisplay: MapDisplay;

    public render(): JSX.Element {
        return (
            <div className="map-view" ref="mapViewElement">
            </div>
        );
    }

    public componentDidMount(): void {
        const containerElement: HTMLElement = this.refs.mapViewElement as HTMLElement;
        const width: number = containerElement.clientWidth;
        const height: number = containerElement.clientHeight;
        const canvas: HTMLCanvasElement = this.gMapDisplay.createAndGetCanvas( width , height );
        containerElement.appendChild( canvas );
    }

}
