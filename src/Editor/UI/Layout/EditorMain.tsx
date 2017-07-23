
import * as React from 'react';
import EditorScene from '../Block/EditorScene';
import EditorPanel from '../Block/EditorPanel';

export default class EditorMain extends React.Component {

    public render(): JSX.Element {
        return (
            <div className="editor-main">
                <div className="editor-main-scene">
                    <EditorScene/>
                </div>
                <div className="editor-main-panel">
                    <EditorPanel/>
                </div>
            </div>
        );
    }

}
