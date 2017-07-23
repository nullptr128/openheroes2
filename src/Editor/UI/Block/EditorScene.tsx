
import * as React from 'react';
import MapView from '../Widgets/MapView';

export default class EditorScene extends React.Component {

    public render(): JSX.Element {
        return (
            <div className="editor-scene">
                <div className="editor-scene-map-view">
                    <MapView/>
                </div>
            </div>
        );
    }

}