
import * as React from 'react';
import Minimap from '../Widgets/Minimap';

export default class EditorPanel extends React.Component {

    public render(): JSX.Element {
        return (
            <div className="editor-panel">
                <div className="editor-panel-minimap">
                    <Minimap/>
                </div>
            </div>
        );
    }

}
