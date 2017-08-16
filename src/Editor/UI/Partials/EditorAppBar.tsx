
import * as React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import EInject from '../../Core/EInject';
import Locale from '../../../Common/Engine/Misc/Locale';
import EditorStore from '../../Core/EditorStore';
import Events from '../../../Common/Engine/Events/Events';
import EEditorGridEnabledChanged from '../../Events/EEditorGridEnabledChanged';
import MapControl from '../../Actions/MapControl';

interface EditorAppBarState {
    isGridEnabled: boolean;
}

export default class EditorAppBar extends React.Component {

    @EInject( EditorStore )
    private gStore: EditorStore;

    @EInject( Locale )
    private gLocale: Locale;

    @EInject( Events )
    private gEvents: Events;

    @EInject( MapControl )
    private gMapControl: MapControl;

    public state = {
        isGridEnabled: this.gStore.ui.isGridEnabled(), 
    };

    public componentDidMount(): void {
        this.gEvents.on( EEditorGridEnabledChanged , (data) => {
            this.setState( {
                isGridEnabled: data.value
            } );                
        } );
    }

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
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>
                    { this.createButton( 'fa fa-th' , this.gLocale.get( 'Editor.AppBar.Grid' ) , this.state.isGridEnabled  , () => this.toggleGrid() ) }
                    { this.createZoomInButton() }
                    { this.createZoomOutButton() }
                </ToolbarGroup>
            </Toolbar>
        );
    }

    private createButton( icon: string , hint: string , isActive?: boolean , onClick?: any ): JSX.Element {
        const className: string = isActive ? 'toolbar-button is-active' : 'toolbar-button';
        return (
            <IconButton className={ className } tooltip={ hint } style={ { zIndex: 2 } } onClick={ onClick }>
                <FontIcon className={ icon }/>
            </IconButton>
        );
    }

    private createZoomInButton(): JSX.Element {
        return (
            <IconButton className="toolbar-button" tooltip={ this.gLocale.get( 'Editor.AppBar.ZoomIn' ) } style={ { zIndex: 2 } } 
                onMouseDown={ () => this.gMapControl.setZoomingIn(true) } onMouseUp={ () => this.gMapControl.setZoomingIn(false) }>
                <FontIcon className="fa fa-search-plus"/>
            </IconButton>
        );
    }

    private createZoomOutButton(): JSX.Element {
        return (
            <IconButton className="toolbar-button" tooltip={ this.gLocale.get( 'Editor.AppBar.ZoomOut' ) } style={ { zIndex: 2 } } 
                onMouseDown={ () => this.gMapControl.setZoomingOut(true) } onMouseUp={ () => this.gMapControl.setZoomingOut(false) }>
                <FontIcon className="fa fa-search-minus"/>
            </IconButton>
        );
    }

    private toggleGrid(): void {
        const newValue: boolean = this.gStore.ui.isGridEnabled();
        this.gStore.ui.setGridEnabled( !newValue );
    }

}