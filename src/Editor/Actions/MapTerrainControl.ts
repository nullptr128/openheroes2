/**
 * OpenHeroes2
 * 
 * This class handles user actions when user is in terrain placing mode.
 * It handles things like selecting terrain, painting tiles, etc.
 */

import Injectable from '../../Common/IOC/Injectable';
import Events from '../../Common/Engine/Events/Events';
import Inject from '../../Common/IOC/Inject';
import EEditorTabChanged from '../Events/EEditorTabChanged';
import EditorActiveTab from '../Types/EditorActiveTab';
import EditorBrushTilePipeline from '../Render/MapDisplay/EditorBrushTilePipeline';
import EditorStore from '../Core/EditorStore';
import EditorTerrainBrushSize from '../Types/EditorTerrainBrushSize';
import MapDisplay from '../../Common/Render/MapDisplay/MapDisplay';
import IMapDisplayMouse from '../../Common/Render/MapDisplay/IMapDisplayMouse';
import Point from '../../Common/Types/Point';
import Terrain from '../../Common/Types/Terrain';
import TerrainData from '../../Common/Game/Terrain/TerrainData';
import Arrays from '../../Common/Support/Arrays';
import Tools from '../../Common/Support/Tools';
import AutoBorder from '../Utils/AutoBorder/AutoBorder';
import AutoFixer from '../Utils/AutoBorder/AutoFixer';
import MinimapDisplay from '../../Common/Render/Minimap/MinimapDisplay';

@Injectable()
class MapTerrainControl {

    @Inject( Events )
    private gEvents: Events;

    @Inject( EditorBrushTilePipeline )
    private gEditorBrushTilePipeline: EditorBrushTilePipeline;

    @Inject( EditorStore )
    private gEditorStore: EditorStore;

    @Inject( MapDisplay )
    private gMapDisplay: MapDisplay;

    @Inject( MinimapDisplay )
    private gMinimapDisplay: MinimapDisplay;

    @Inject( AutoBorder )
    private gAutoBorder: AutoBorder;

    @Inject( AutoFixer )
    private gAutoFixer: AutoFixer;

    private fIsActive: boolean;

    private fBorderFrom: Point;
    private fBorderTo: Point;

    private fVariableBrushOrigin: Point = new Point(-9999,-9999);
    private fVariableBrushFinish: Point = new Point(-9999,-9999);
    
    /**
     * Initializes MapTerrainControl module
     */
    public initialize(): void {

        this.gEvents.on( EEditorTabChanged , data => {
            if ( data.activeTab == EditorActiveTab.TERRAIN ) {
                this.onActivate();
            } else {
                this.onDeactivate();
            }
        } );

        this.gMapDisplay.onMouseDown( mouse => this.startDrawing(mouse) );
        this.gMapDisplay.onMouseMove( mouse => this.continueDrawing(mouse) );
        this.gMapDisplay.onMouseUp( mouse => this.finishDrawing(mouse) );

    }

    /**
     * Returns brush size in tiles based on selected option in UI
     */
    public getBrushSize(): number {

        const brushSize: EditorTerrainBrushSize = this.gEditorStore.ui.getTerrainBrushSize();
        
        switch ( brushSize ) {
            case EditorTerrainBrushSize.SINGLE:
                return 1;
            case EditorTerrainBrushSize.DOUBLE: 
                return 3;
            case EditorTerrainBrushSize.TRIPLE:
                return 5;
            default:
                return 0;
        }

    }

    public getVariableBrushBounds(): { from: Point , to: Point } {
        return {
            from: new Point( 
                Math.min( this.fVariableBrushOrigin.x , this.fVariableBrushFinish.x ) ,
                Math.min( this.fVariableBrushOrigin.y , this.fVariableBrushFinish.y )
            ) ,
            to: new Point(
                Math.max( this.fVariableBrushOrigin.x , this.fVariableBrushFinish.x ) ,
                Math.max( this.fVariableBrushOrigin.y , this.fVariableBrushFinish.y )
            ) ,
        };
    };

    public isVariableBrush(): boolean {
        return this.gEditorStore.ui.getTerrainBrushSize() === EditorTerrainBrushSize.CUSTOM;
    }

    /**
     * Called when MapTerrainControl is activated
     */
    public onActivate(): void {
        this.gEditorBrushTilePipeline.hide();
        this.fIsActive = true;
    }

    /**
     * Called when MapTerrainControl is deactivated
     */
    public onDeactivate(): void {
        this.gEditorBrushTilePipeline.hide();
        this.fIsActive = false;
    }

    /**
     * Updates highlight of current brush on map and handles
     * user clicks.
     * @param mouse 
     */
    public update( mouse: IMapDisplayMouse ): void {

        if ( this.fIsActive ) {

            if ( this.isVariableBrush() ) {

                const bounds = this.getVariableBrushBounds();

                this.gEditorBrushTilePipeline.set(
                    bounds.from.x ,
                    bounds.from.y ,
                    bounds.to.x ,
                    bounds.to.y ,
                );

            } else {

                this.gEditorBrushTilePipeline.set(
                    mouse.mapTilePosition.x - Math.floor( this.getBrushSize() / 2.000 ) ,
                    mouse.mapTilePosition.y - Math.floor( this.getBrushSize() / 2.000 ) ,
                    mouse.mapTilePosition.x - Math.floor( this.getBrushSize() / 2.000 ) + this.getBrushSize() - 1,
                    mouse.mapTilePosition.y - Math.floor( this.getBrushSize() / 2.000 ) + this.getBrushSize() - 1 ,
                );

                this.gEditorBrushTilePipeline.show();

                if ( mouse.buttons.left ) {
                    this.placePrimaryTile( mouse.mapTilePosition );
                } else if ( mouse.buttons.right ) {
                    this.placeSecondaryTile( mouse.mapTilePosition );
                }

            }

        }

    }

    /**
     * Called when user started to draw tiles
     * @param mouse 
     */
    public startDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fIsActive ) {

            if ( this.isVariableBrush() ) {
                this.fVariableBrushOrigin = new Point( mouse.mapTilePosition.x , mouse.mapTilePosition.y );
                this.fVariableBrushFinish = new Point( mouse.mapTilePosition.x , mouse.mapTilePosition.y );
                this.gEditorBrushTilePipeline.show();
            }

            this.fBorderFrom = new Point( mouse.mapTilePosition.x , mouse.mapTilePosition.y );
            this.fBorderTo = new Point( mouse.mapTilePosition.x , mouse.mapTilePosition.y );

        }
        
        this.update( mouse );
    }

    /**
     * Called when user moves mouse when holding mouse button
     * @param mouse 
     */
    public continueDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fIsActive && ( mouse.buttons.left || mouse.buttons.right ) ) {

            this.fBorderFrom.x = Math.min( this.fBorderFrom.x , mouse.mapTilePosition.x );
            this.fBorderFrom.y = Math.min( this.fBorderFrom.y , mouse.mapTilePosition.y );
            this.fBorderTo.x = Math.max( this.fBorderTo.x , mouse.mapTilePosition.x );
            this.fBorderTo.y = Math.max( this.fBorderTo.y , mouse.mapTilePosition.y );

            if ( this.isVariableBrush() ) {
                this.fVariableBrushFinish.x = mouse.mapTilePosition.x;
                this.fVariableBrushFinish.y = mouse.mapTilePosition.y;
            }

        }

        this.update( mouse );

    }

    /**
     * Called when user released mouse button and finished drawing.
     * @param mouse 
     */
    public finishDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fIsActive ) {

            if ( this.isVariableBrush() ) {

                const bounds = this.getVariableBrushBounds();

                const fromPos: Point = new Point( bounds.from.x , bounds.from.y );
                const toPos: Point = new Point( bounds.to.x , bounds.to.y );

                const terrainType: Terrain = this.gEditorStore.ui.getTerrainBrushType();

                for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
                    for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                        const spriteId: number = this.getSpriteId( terrainType );
                        this.gEditorStore.map.setTileTerrain( x , y , terrainType , spriteId );
                    }
                }

                this.gEditorBrushTilePipeline.hide();

                this.gAutoFixer.fixMapSection( fromPos.subtract(1) , toPos.add(1) );
                this.gAutoBorder.borderizeMapSection( fromPos.subtract(5) , toPos.add(5) );
                this.gMapDisplay.forceRedraw();
                this.gMinimapDisplay.redrawMap();


            } else {

                const fromPos: Point = this.fBorderFrom.subtract( 5 );
                const toPos: Point = this.fBorderTo.add( 5 );

                this.gAutoFixer.fixMapSection( fromPos.subtract(1) , toPos.add(1) );
                this.gAutoBorder.borderizeMapSection( fromPos , toPos );
                this.gMapDisplay.forceRedraw();
                this.gMinimapDisplay.redrawMap();
                
            }

        }

    }

    /**
     * Places tile stored on left mouse button
     * @param mapPos 
     */
    private placePrimaryTile( mapPos: Point ): void {
        this.internalPlaceTile( mapPos , this.gEditorStore.ui.getTerrainBrushType() );
    }

    /**
     * Places tile stored on right mouse button
     * @param mapPos 
     */
    private placeSecondaryTile( mapPos: Point ): void {
        this.internalPlaceTile( mapPos , this.gEditorStore.ui.getTerrainAltBrushType() );
    }

    /**
     * Returns sprite id for particular terrain type
     * @param terrainType 
     */
    private getSpriteId( terrainType: Terrain ): number {

        if ( Tools.random( 1 , 100 ) < 10 ) {
            return Arrays.randomElement( TerrainData[ terrainType ].decorationTiles );
        } else {
            return Arrays.randomElement( TerrainData[ terrainType ].basicTiles );
        }

    }

    /**
     * Places tile on map
     * @param mapPos 
     * @param terrainType 
     */
    private internalPlaceTile( mapPos: Point , terrainType: Terrain ): void {

        const brushSize: number = this.getBrushSize();
        const startX: number = mapPos.x - Math.floor( brushSize / 2.000 );
        const startY: number = mapPos.y - Math.floor( brushSize / 2.000 );
        const endX: number = startX + brushSize;
        const endY: number = startY + brushSize;

        for( let x = startX ; x < endX ; ++x ) {
            for( let y = startY ; y < endY ; ++y ) {
                const spriteId: number = this.getSpriteId( terrainType );
                this.gEditorStore.map.setTileTerrain( x , y , terrainType , spriteId );
            }
        }

        this.gMapDisplay.forceRedraw();

    }

}

export default MapTerrainControl;
