import Injectable from '../../Common/IOC/Injectable';
import Inject from '../../Common/IOC/Inject';
import Events from '../../Common/Engine/Events/Events';
import EEditorTabChanged from '../Events/EEditorTabChanged';
import EditorActiveTab from '../Types/EditorActiveTab';
import EditorBrushTilePipeline from '../Render/MapDisplay/EditorBrushTilePipeline';
import MapDisplay from '../../Common/Render/MapDisplay/MapDisplay';
import IMapDisplayMouse from '../../Common/Render/MapDisplay/IMapDisplayMouse';
import EditorStore from '../Core/EditorStore';
import ITile from '../../Common/Model/ITile';
import Nullable from '../../Common/Support/Nullable';
import Terrain from '../../Common/Types/Terrain';
import Point from '../../Common/Types/Point';
import Arrays from '../../Common/Support/Arrays';

@Injectable()
class MapRiverControl {

    @Inject( Events )
    private gEvents: Events;

    @Inject( EditorBrushTilePipeline )
    private gEditorBrushTilePipeline: EditorBrushTilePipeline;

    @Inject( MapDisplay )
    private gMapDisplay: MapDisplay;

    @Inject( EditorStore )
    private gStore: EditorStore;

    private fActive: boolean = false;
    private fDrawing: boolean = false;

    public initialize(): void {

        this.gEvents.on( EEditorTabChanged , data => {
            if ( data.activeTab == EditorActiveTab.RIVERS ) {
                this.onActivate();
            } else {
                this.onDeactivate();
            }
        } );

        this.gMapDisplay.onMouseMove( mouse => this.continueDrawing(mouse) );
        this.gMapDisplay.onMouseDown( mouse => this.startDrawing(mouse) );
        this.gMapDisplay.onMouseUp( mouse => this.finishDrawing(mouse) );

    }

    public onActivate(): void {
        this.gEditorBrushTilePipeline.show();
        this.fActive = true;
    }

    public onDeactivate(): void {
        this.gEditorBrushTilePipeline.hide();
        this.fActive = false;
    }

    public update( mouse: IMapDisplayMouse ): void {
        
        if ( this.fActive ) {
            
            this.gEditorBrushTilePipeline.set(
                mouse.mapTilePosition.x ,
                mouse.mapTilePosition.y ,
                mouse.mapTilePosition.x ,
                mouse.mapTilePosition.y ,
            );

            if ( this.fDrawing ) {
                if ( mouse.buttons.left ) {
                    this.drawRiver( mouse.mapTilePosition.x , mouse.mapTilePosition.y );
                } else if ( mouse.buttons.right ) {
                    this.eraseRiver( mouse.mapTilePosition.x , mouse.mapTilePosition.y );
                } 
                this.updateSpritesInSection( mouse.mapTilePosition.subtract( 3 ) , mouse.mapTilePosition.add( 3 ) );
                this.gMapDisplay.forceRedraw();
            }

        }

    }

    public startDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fActive ) {
            this.fDrawing = true;
            this.update( mouse );
        }

    }

    public continueDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fActive ) {
            this.update( mouse );
        }

    }

    public finishDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fActive ) {
            this.fDrawing = false;
            this.update( mouse );
        }

    }

    public drawRiver( x: number , y: number ): void {
        const tile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x , y );
        if ( tile && tile.terrain !== Terrain.WATER ) {
            this.gStore.map.setTileRiver( x , y , 3 );
        }
    }

    public eraseRiver( x: number , y: number ): void {
        this.gStore.map.setTileRiver( x , y , null );
    }

    public updateSpritesInSection( fromPos: Point , toPos: Point ): void {

        for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
            for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                this.updateSprites( x , y );
            }
        }

    }

    public updateSprites( x: number , y: number ): void {

        const tiles: Nullable<ITile>[] = [];
        for( let i = 0 ; i <= 8 ; ++i ) {
            const tile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x + i % 3 , y + Math.floor( i / 3 ) );
            tiles.push( tile );
        }

        const riversToAdd: { x: number , y: number , sprite: number }[] = [];

        if ( this.match( tiles , [ '?' , 'R' , '?' ,
                                   'R' , 'R' , 'R' ,
                                   '?' , 'R' , '?' ] ) ) {

            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 6 } );

        } else if ( this.match( tiles , [ '?' , 'R' , '?' ,
                                          'R' , 'R' , 'R' ,
                                          '?' , 'N' , '?' ] ) ) {

            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 8 } );

        } else if ( this.match( tiles , [ '?' , 'R' , '?' ,
                                          'R' , 'R' , 'N' ,
                                          '?' , 'R' , '?' ] ) ) {

            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 10 } );

        } else if ( this.match( tiles , [ '?' , 'R' , '?' ,
                                          'N' , 'R' , 'R' ,
                                          '?' , 'R' , '?' ] ) ) {

            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 9 } );

        } else if ( this.match( tiles , [ '?' , 'N' , '?' ,
                                          'R' , 'R' , 'R' ,
                                          '?' , 'R' , '?' ] ) ) {

            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 11 } );

        } else if ( this.match( tiles , [ '?' , 'R' , '?' ,
                                          'N' , 'R' , 'N' ,
                                          '?' , 'R' , '?' ] ) ) {

            const riverSprite: number = ( y % 2 == 0 ) ? 3 : 12;
            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: riverSprite } );

        } else if ( this.match( tiles , [ '?' , 'N' , '?' ,
                                          'R' , 'R' , 'R' ,
                                          '?' , 'N' , '?' ] ) ) {

            const riverSprite: number = ( x % 2 == 0 ) ? 2 : 5;
            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: riverSprite } );                                            
                                              
        } else if ( this.match( tiles , [ '?' , 'N' , '?' ,
                                          '?' , 'R' , 'R' ,
                                          '?' , 'R' , '?' ] ) ) {
         
            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 1 } );
                                    
        } else if ( this.match( tiles , [ '?' , 'N' , '?' ,
                                          'R' , 'R' , '?' ,
                                          '?' , 'R' , '?' ] ) ) {
        
            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 0 } );

        } else if ( this.match( tiles , [ '?' , 'R' , '?' ,
                                          'R' , 'R' , '?' ,
                                          '?' , 'N' , '?' ] ) ) {

            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 7 } );

        }  else if ( this.match( tiles , [ '?' , 'R' , '?' ,
                                           '?' , 'R' , 'R' ,
                                           '?' , 'N' , '?' ] ) ) {

            riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 4 } );
        } else if ( tiles[4] && tiles[4]!.river !== null ) {

            const up: boolean = ( tiles[1] !== null && tiles[1]!.river !== null );
            const down: boolean = ( tiles[7] !== null && tiles[7]!.river !== null );
            const left: boolean = ( tiles[3] !== null && tiles[3]!.river !== null );
            const right: boolean = ( tiles[5] !== null && tiles[5]!.river !== null );

            if ( up || down ) {
                riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 3 } );
            } else if ( left || right ) {
                riversToAdd.push( { x: x + 1 , y: y + 1 , sprite: 2 } );
            }

        }

        riversToAdd.forEach( r => this.gStore.map.setTileRiver( r.x , r.y , r.sprite ) );

    }

    private match( tiles: Nullable<ITile>[] , pattern: string[] ): boolean {

        for( let i = 0 ; i < tiles.length ; ++i ) {
            
            if ( pattern[i] == '?' ) {
                continue;
            }

            if ( pattern[i] == 'R' && tiles[i] && tiles[i]!.river !== null ) {
                continue;
            }

            if ( pattern[i] == 'N' && ( !tiles[i] || tiles[i]!.river === null ) ) {
                continue;
            }

            return false;

        }

        return true;

    }

}

export default MapRiverControl;
