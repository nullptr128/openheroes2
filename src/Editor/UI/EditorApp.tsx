
import * as React from 'react';
import EditorTop from './Layout/EditorTop';
import EditorMain from './Layout/EditorMain';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import EInject from '../Core/EInject';
import { EventId } from '../../Common/Engine/Events/Events';
import Events from '../../Common/Engine/Events/Events';
import EEditorReady from '../Events/EEditorReady';

interface EditorAppState {
    isLoading: boolean;
}

export default class EditorApp extends React.Component<{},EditorAppState> {

    state = {
        isLoading: true,
    };

    @EInject( Events )
    private gEvents: Events;

    private fLoadedEvent: EventId;

    public componentDidMount(): void {
        this.fLoadedEvent = this.gEvents.on( EEditorReady , () => {
            this.setState( { isLoading: false } );
        } );
    }

    public componentWillUnmount(): void {
        this.gEvents.off( this.fLoadedEvent );
    }

    public render(): JSX.Element {

        const element: JSX.Element = this.state.isLoading ? 
            this.buildLoadingScreen() :
            this.buildMainScreen();

        return (
            <MuiThemeProvider>
                { element }
            </MuiThemeProvider>
        );
    }

    public buildMainScreen(): JSX.Element {
        return (
            <div className="editor-app">
                <div className="editor-app-top">
                    <EditorTop/>
                </div>
                <div className="editor-app-main">
                    <EditorMain/>
                </div>
            </div>
        );
    }

    public buildLoadingScreen(): JSX.Element {
        return (
            <div className="editor-loading">
                <div className="editor-loading-content">
                    <CircularProgress size={120}/>
                </div>
            </div>
        );
    }

}
