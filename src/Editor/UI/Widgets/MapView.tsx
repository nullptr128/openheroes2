
import * as React from 'react';

export default class MapView extends React.Component {

    public render(): JSX.Element {
        return (
            <div className="map-view">
                <canvas/>
            </div>
        );
    }

}
