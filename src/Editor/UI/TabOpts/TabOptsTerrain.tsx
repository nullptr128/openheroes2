
import * as React from 'react';
import EditorTerrainBrushSize from '../../Types/EditorTerrainBrushSize';
import IconButton from 'material-ui/IconButton';
import Nullable from '../../../Common/Support/Nullable';
import FontIcon from 'material-ui/FontIcon';
import EInject from '../../Core/EInject';
import EditorStore from '../../Core/EditorStore';
import Locale from '../../../Common/Engine/Misc/Locale';
import Terrain from '../../../Common/Types/Terrain';
import Paths from '../../../Common/Engine/Misc/Paths';

interface TabOptsTerrainState {
    brushSize: EditorTerrainBrushSize;
    terrainType: Terrain;
}

export default class TabOptsTerrain extends React.Component<{},TabOptsTerrainState> {

    @EInject( EditorStore )
    private gStore: EditorStore;

    @EInject( Locale )
    private gLocale: Locale;

    @EInject( Paths )
    private gPaths: Paths;

    state = {
        brushSize: EditorTerrainBrushSize.SINGLE,
        terrainType: Terrain.WATER,
    };

    private buildBrushButton( icon: string , brushSize: EditorTerrainBrushSize , tooltip: string ): JSX.Element {

        let className: Nullable<string> = ( brushSize == this.state.brushSize ? 'toolbar-button is-active' : 'toolbar-button' );

        return (
            <IconButton className={ className } onClick={ () => this.actionSelectBrushSize(brushSize) } tooltip={ tooltip }>
                <FontIcon className={ icon }/>
            </IconButton>
        );
    }

    private buildBrushButtons(): JSX.Element {
        return (
            <div className="brush-buttons">
                { this.buildBrushButton( 'icon icon-brush-1' , EditorTerrainBrushSize.SINGLE , this.gLocale.get( 'Editor.BrushSize.Single' ) ) }
                { this.buildBrushButton( 'icon icon-brush-2' , EditorTerrainBrushSize.DOUBLE , this.gLocale.get( 'Editor.BrushSize.Double' ) ) }
                { this.buildBrushButton( 'icon icon-brush-3' , EditorTerrainBrushSize.TRIPLE , this.gLocale.get( 'Editor.BrushSize.Triple' ) ) }
                { this.buildBrushButton( 'icon icon-brush-4' , EditorTerrainBrushSize.CUSTOM , this.gLocale.get( 'Editor.BrushSize.Custom' ) ) }
            </div>
        );
    }

    private buildTerrainButton( iconImageSrc: string , terrainType: Terrain , tooltip: string ): JSX.Element {
        
        let className: Nullable<string> = ( terrainType == this.state.terrainType ? 'toolbar-button is-active' : 'toolbar-button' );

        return (
            <IconButton className={ className } onClick={ () => this.actionSelectTerrainType(terrainType) } tooltip={ tooltip }>
                <img src={ this.gPaths.getResourceDir() + '/img/editor/' + iconImageSrc }
                    style={ { width: 24 , height: 24 } }/>
            </IconButton>
        );

    }

    private buildTerrainButtons(): JSX.Element {
        return (
            <div className="terrain-buttons">
                { this.buildTerrainButton( 'water.png' , Terrain.WATER , this.gLocale.get( 'Editor.Toolbar.Water' ) ) }
                { this.buildTerrainButton( 'grass.png' , Terrain.GRASS , this.gLocale.get( 'Editor.Toolbar.Grass' ) ) }
                { this.buildTerrainButton( 'dirt.png' , Terrain.DIRT , this.gLocale.get( 'Editor.Toolbar.Dirt' ) ) }
                { this.buildTerrainButton( 'snow.png' , Terrain.SNOW , this.gLocale.get( 'Editor.Toolbar.Snow' ) ) }
                { this.buildTerrainButton( 'swamp.png' , Terrain.SWAMP , this.gLocale.get( 'Editor.Toolbar.Swamp' ) ) }
                { this.buildTerrainButton( 'lava.png' , Terrain.LAVA , this.gLocale.get( 'Editor.Toolbar.Lava' ) ) }
                { this.buildTerrainButton( 'rough.png' , Terrain.ROUGH , this.gLocale.get( 'Editor.Toolbar.Rough' ) ) }
                { this.buildTerrainButton( 'desert.png' , Terrain.DESERT , this.gLocale.get( 'Editor.Toolbar.Desert' ) ) }
                { this.buildTerrainButton( 'sand.png' , Terrain.SAND , this.gLocale.get( 'Editor.Toolbar.Sand' ) ) }
            </div>
        );
    }

    public componentDidMount(): void {
        this.setState( {
            brushSize: this.gStore.ui.getTerrainBrushSize(),
        } );
    }

    public render(): JSX.Element {
        return (
            <div className="tab-opts-terrain">
                { this.buildBrushButtons() }
                { this.buildTerrainButtons() }
            </div>
        );
    }

    public actionSelectBrushSize( brushSize: EditorTerrainBrushSize ): void {
        this.gStore.ui.setTerrainBrushSize( brushSize );
        this.setState( { brushSize } );
    }

    public actionSelectTerrainType( terrainType: Terrain ): void {
        this.gStore.ui.setTerrainBrushType( terrainType );
        this.setState( { terrainType } );
    }

}