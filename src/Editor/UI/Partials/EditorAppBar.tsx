
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

export default class EditorAppBar extends React.Component {

    public render(): JSX.Element {
        return (
            <AppBar title="Unnamed Map 1" iconElementLeft={ this.buildMenu() }/>
        );
    }

    public buildMenu(): JSX.Element {
        return (
            <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                <MenuItem value="new-map" primaryText="New map"/>
                <MenuItem value="open-map" primaryText="Open map"/>
                <MenuItem value="save-map" primaryText="Save"/>
                <MenuItem value="save-as-map" primaryText="Save as..."/>
                <Divider/>
                <MenuItem value="settings" primaryText="Map settings..."/>
                <Divider/>
                <MenuItem value="quit" primaryText="Quit"/>
            </IconMenu>
        );
    }

}