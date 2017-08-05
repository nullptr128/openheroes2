
import * as React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import EInject from '../../Core/EInject';
import Locale from '../../../Common/Engine/Misc/Locale';

export default class EditorAppBar extends React.Component {

    @EInject( Locale )
    private gLocale: Locale;

    public render(): JSX.Element {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={ true } style={ { paddingLeft: '10px' } }>
                    { this.createButton( 'fa fa-file' , this.gLocale.get( 'Editor.AppBar.NewMap' ) ) }
                    { this.createButton( 'fa fa-folder' , this.gLocale.get( 'Editor.AppBar.LoadMap' ) ) }
                    { this.createButton( 'fa fa-save' , this.gLocale.get( 'Editor.AppBar.SaveMap' ) ) }
                    { this.createButton( 'fa fa-save' , this.gLocale.get( 'Editor.AppBar.SaveMapAs' ) ) }
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>
                    { this.createButton( 'fa fa-copy' , this.gLocale.get( 'Editor.AppBar.Copy' ) ) }
                    { this.createButton( 'fa fa-cut' , this.gLocale.get( 'Editor.AppBar.Cut' ) ) }
                    { this.createButton( 'fa fa-paste' , this.gLocale.get( 'Editor.AppBar.Paste' ) ) }
                    { this.createButton( 'fa fa-remove' , this.gLocale.get( 'Editor.AppBar.Delete' ) ) }
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>
                    { this.createButton( 'fa fa-flag' , this.gLocale.get( 'Editor.AppBar.Players' ) ) }
                    { this.createButton( 'fa fa-gears' , this.gLocale.get( 'Editor.AppBar.Settings' ) ) }
                    { this.createButton( 'fa fa-clock-o' , this.gLocale.get( 'Editor.AppBar.TimedEvents' ) ) }
                </ToolbarGroup>
            </Toolbar>
        );
    }

    private createButton( icon: string , hint: string ): JSX.Element {
        return (
            <IconButton className="toolbar-button" tooltip={ hint } style={ { zIndex: 2 } }>
                <FontIcon className={ icon }/>
            </IconButton>
        );
    }

}