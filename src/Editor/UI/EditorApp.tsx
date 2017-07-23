
import * as React from 'react';
import EditorTop from './Layout/EditorTop';
import EditorMain from './Layout/EditorMain';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EditorApp extends React.Component {

    public render(): JSX.Element {
        return (
            <MuiThemeProvider>
                <div className="editor-app">
                    <div className="editor-app-top">
                        <EditorTop/>
                    </div>
                    <div className="editor-app-main">
                        <EditorMain/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

}
