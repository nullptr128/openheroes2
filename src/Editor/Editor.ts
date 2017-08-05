/**
 * OpenHeroes2
 * 
 * Editor index file.
 */

import 'font-awesome/css/font-awesome.css';
import 'fontello/css/fontello.css';
import 'fontello/font/fontello.ttf';
import * as InjectTapEventPlugin from 'react-tap-event-plugin';
import 'style/editor/editor.scss';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import Nullable from '../Common/Support/Nullable';
import EditorApp from "./UI/EditorApp";
import EditorCore from './Core/EditorCore';
import EditorContainer from './Core/EditorContainer';

window.addEventListener( 'load' , async () => {

    // clear console for auto-reload purposes
    console.clear();

    // this one is required by react-material-ui
    InjectTapEventPlugin();

    // find element with #app id
    const appElement: Nullable<HTMLElement> = document.getElementById( 'app' );

    // inject React if possible
    if ( appElement ) {
        ReactDom.render( React.createElement( EditorApp ) , appElement );
        // get EditorCore class from editor service Container
        const core: EditorCore = EditorContainer.get( EditorCore );
        // run editor
        await core.run();
    } else {    
        throw new Error( 'Mailformed HTML file - no #app element present.' );
    }

} );
