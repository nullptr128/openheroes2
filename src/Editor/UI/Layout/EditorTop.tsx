
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import { Toolbar , ToolbarGroup } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditorToolbar from '../Partials/EditorToolbar';
import EditorAppBar from '../Partials/EditorAppBar';

export default class EditorTop extends React.Component {

    public render(): JSX.Element {
        return (
            <div className="editor-top">
                <EditorAppBar/>
                <EditorToolbar/>
            </div>
        );
    }

}
