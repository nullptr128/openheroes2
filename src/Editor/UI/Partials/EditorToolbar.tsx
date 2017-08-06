
import * as React from 'react';
import { Toolbar, ToolbarGroup , ToolbarSeparator } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paths from '../../../Common/Engine/Misc/Paths';
import EInject from '../../Core/EInject';
import Locale from '../../../Common/Engine/Misc/Locale';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditorStore from '../../Core/EditorStore';
import EditorActiveTab from '../../Types/EditorActiveTab';

interface EditorToolbarState {
    activeTab: EditorActiveTab;
}

export default class EditorToolbar extends React.Component {

    @EInject( Paths )
    private gPaths: Paths;

    @EInject( Locale )
    private gLocale: Locale;

    @EInject( EditorStore )
    private gStore: EditorStore;

    state: EditorToolbarState = {
        activeTab: this.gStore.ui.getActiveTab() ,
    };

    public render(): JSX.Element {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={ true } style={ { paddingLeft: '10px' } }>
                    
                    { this.createButton( 'terrain.png' , this.gLocale.get( 'Editor.Toolbar.Terrain' ) , EditorActiveTab.TERRAIN ) }
                    { this.createButton( 'rivers.png' , this.gLocale.get( 'Editor.Toolbar.Rivers' ) , EditorActiveTab.RIVERS ) }
                    { this.createButton( 'roads.png' , this.gLocale.get( 'Editor.Toolbar.Roads' ) , EditorActiveTab.ROADS ) }
                    { this.createButton( 'obstacles.png' , this.gLocale.get( 'Editor.Toolbar.Obstacles' ) , EditorActiveTab.OBSTACLES ) }
  
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>

                    { this.createButton( 'water.png' , this.gLocale.get( 'Editor.Toolbar.Water' ) , EditorActiveTab.WATER ) }
                    { this.createButton( 'grass.png' , this.gLocale.get( 'Editor.Toolbar.Grass' ) , EditorActiveTab.GRASS ) }
                    { this.createButton( 'dirt.png' , this.gLocale.get( 'Editor.Toolbar.Dirt' ) , EditorActiveTab.DIRT ) }
                    { this.createButton( 'snow.png' , this.gLocale.get( 'Editor.Toolbar.Snow' ) , EditorActiveTab.SNOW ) }
                    { this.createButton( 'swamp.png' , this.gLocale.get( 'Editor.Toolbar.Swamp' ) , EditorActiveTab.SWAMP ) }
                    { this.createButton( 'lava.png' , this.gLocale.get( 'Editor.Toolbar.Lava' ) , EditorActiveTab.LAVA ) }
                    { this.createButton( 'rough.png' , this.gLocale.get( 'Editor.Toolbar.Rough' ) , EditorActiveTab.ROUGH ) }
                    { this.createButton( 'desert.png' , this.gLocale.get( 'Editor.Toolbar.Desert' ) , EditorActiveTab.DESERT ) }
                    { this.createButton( 'sand.png' , this.gLocale.get( 'Editor.Toolbar.Sand' ) , EditorActiveTab.SAND ) }
                    
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>

                    { this.createButton( 'objects.png' , this.gLocale.get( 'Editor.Toolbar.Objects' ) , EditorActiveTab.OBJECTS ) }
                    { this.createButton( 'towns.png' , this.gLocale.get( 'Editor.Toolbar.Towns' ) , EditorActiveTab.TOWNS ) }
                    { this.createButton( 'heroes.png' , this.gLocale.get( 'Editor.Toolbar.Heroes' ) , EditorActiveTab.HEROES ) }
                    { this.createButton( 'artifacts.png' , this.gLocale.get( 'Editor.Toolbar.Artifacts' ) , EditorActiveTab.ARTIFACTS ) }
                    { this.createButton( 'resources.png' , this.gLocale.get( 'Editor.Toolbar.Resources' ) , EditorActiveTab.RESOURCES ) }
                    { this.createButton( 'monsters.png' , this.gLocale.get( 'Editor.Toolbar.Monsters' ) , EditorActiveTab.MONSTERS ) }

                </ToolbarGroup>
            </Toolbar>
        );
    }

    private createButton( iconImageSrc: string , hint: string , tabType: EditorActiveTab ): JSX.Element {

        let classNames: string[] = [ 'toolbar-button' ];
        if ( this.gStore.ui.getActiveTab() == tabType ) {
            classNames.push( 'is-active' );
        }

        return (
            <IconButton className={ classNames.join(' ') } tooltip={ hint } onClick={ () => this.changeTab( tabType ) }>
                <img src={ this.gPaths.getResourceDir() + '/img/editor/' + iconImageSrc }
                    style={ { width: 24 , height: 24 } }/>
            </IconButton>
        );
    }

    public changeTab( newTabType: EditorActiveTab ): void {
        this.setState( { activeTab: newTabType } );
        this.gStore.ui.setActiveTab( newTabType );
    }

}
