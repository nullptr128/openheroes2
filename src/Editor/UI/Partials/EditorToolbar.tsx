
import * as React from 'react';
import { Toolbar, ToolbarGroup , ToolbarSeparator } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paths from '../../../Common/Engine/Misc/Paths';
import EInject from '../../Core/EInject';
import Locale from '../../../Common/Engine/Misc/Locale';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class EditorToolbar extends React.Component {

    @EInject( Paths )
    private gPaths: Paths;

    @EInject( Locale )
    private gLocale: Locale;

    public render(): JSX.Element {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={ true } style={ { paddingLeft: '10px' } }>
                    
                    { this.createButton( 'terrain.png' , this.gLocale.get( 'Editor.Toolbar.Terrain' ) ) }
                    { this.createButton( 'rivers.png' , this.gLocale.get( 'Editor.Toolbar.Rivers' ) ) }
                    { this.createButton( 'roads.png' , this.gLocale.get( 'Editor.Toolbar.Roads' ) ) }
                    { this.createButton( 'obstacles.png' , this.gLocale.get( 'Editor.Toolbar.Obstacles' ) ) }
  
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>

                    { this.createButton( 'water.png' , this.gLocale.get( 'Editor.Toolbar.Water' ) ) }
                    { this.createButton( 'grass.png' , this.gLocale.get( 'Editor.Toolbar.Grass' ) ) }
                    { this.createButton( 'dirt.png' , this.gLocale.get( 'Editor.Toolbar.Dirt' ) ) }
                    { this.createButton( 'snow.png' , this.gLocale.get( 'Editor.Toolbar.Snow' ) ) }
                    { this.createButton( 'swamp.png' , this.gLocale.get( 'Editor.Toolbar.Swamp' ) ) }
                    { this.createButton( 'lava.png' , this.gLocale.get( 'Editor.Toolbar.Lava' ) ) }
                    { this.createButton( 'rough.png' , this.gLocale.get( 'Editor.Toolbar.Rough' ) ) }
                    { this.createButton( 'desert.png' , this.gLocale.get( 'Editor.Toolbar.Desert' ) ) }
                    { this.createButton( 'sand.png' , this.gLocale.get( 'Editor.Toolbar.Sand' ) ) }
                    
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>

                    { this.createButton( 'objects.png' , this.gLocale.get( 'Editor.Toolbar.Objects' ) ) }
                    { this.createButton( 'towns.png' , this.gLocale.get( 'Editor.Toolbar.Towns' ) ) }
                    { this.createButton( 'heroes.png' , this.gLocale.get( 'Editor.Toolbar.Heroes' ) ) }
                    { this.createButton( 'artifacts.png' , this.gLocale.get( 'Editor.Toolbar.Artifacts' ) ) }
                    { this.createButton( 'resources.png' , this.gLocale.get( 'Editor.Toolbar.Resources' ) ) }
                    { this.createButton( 'monsters.png' , this.gLocale.get( 'Editor.Toolbar.Monsters' ) ) }

                </ToolbarGroup>
            </Toolbar>
        );
    }

    private createButton( iconImageSrc: string , hint: string ): JSX.Element {
        return (
            <IconButton className="toolbar-button" tooltip={ hint }>
                <img src={ this.gPaths.getResourceDir() + '/img/editor/' + iconImageSrc }
                    style={ { width: 24 , height: 24 } }/>
            </IconButton>
        );
    }

}
