/**
 * OpenHeroes2
 * 
 * This class is responsible for generating terrain borders on non-bordered map.
 * Method for generating borders is to pattern-match 2x2 or 3x3 map segments and
 * replace sprites.
 * 
 * IAutoBorderMatcher is a structure that is used to process tiles. Also particular
 * matchers are automatically rotated and scaled (as well as corresponding sprites),
 * in 4 variants.
 */

import Injectable from '../../../Common/IOC/Injectable';
import Inject from '../../../Common/IOC/Inject';
import EditorStore from '../../Core/EditorStore';
import Point from '../../../Common/Types/Point';
import WaterBorders from './WaterBorders';
import Nullable from '../../../Common/Support/Nullable';
import ITile from '../../../Common/Model/ITile';
import Arrays from '../../../Common/Support/Arrays';
import IAutoBorderProcessor from './IAutoBorderProcessor';
import TerrainOuterBorders from './TerrainOuterBorders';
import TerrainJunctionBorders from './TerrainJunctionBorders';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';
import TerrainMultiBorders from './TerrainMultiBorders';
import { IAutoBorderMatcher, IMatrix } from './IAutoBorderProcessor';
import BadTileBorders from './BadTileBorder';

type MatcherFunc = (matcher: IAutoBorderMatcher) => IAutoBorderMatcher;
interface IPipe {
    getMatcher: MatcherFunc;
    mirror: boolean;
    flip: boolean;
}

@Injectable()
class AutoBorder {

    @Inject( EditorStore )
    private gStore: EditorStore;

    private fBorderFrom: Point;
    private fBorderTo: Point;

    /**
     * Borderizes rectangle section of map.
     * @param fromPos top/left point of rectangle
     * @param toPos bottom/right point of rectangle
     */
    public borderizeMapSection( fromPos: Point , toPos: Point ): void {

        const cacheWidth: number = toPos.x - fromPos.x + 2;
        const cacheHeight: number = toPos.y - fromPos.y + 2;
        this.fBorderFrom = new Point( fromPos.x , fromPos.y );
        this.fBorderTo = new Point( toPos.x , toPos.y );

        for( let x = fromPos.x+1 ; x <= toPos.x-1 ; ++x ) {
            for( let y = fromPos.y+1 ; y <= toPos.y-1 ; ++y ) {
                this.reinitTile( x , y );
            }
        }

        for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
            for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                this.borderizeTile( x , y );
            }
        }

    }

    /**
     * Unborderizes tile from position x/y
     * @param x tile-x position
     * @param y tile-y position
     */
    public reinitTile( x: number , y: number ): void {
        const tile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x , y );
        if ( tile ) {
            this.gStore.map.setTileTerrain(
                tile.x ,
                tile.y ,
                tile.terrain ,
                Arrays.randomElement( TerrainData[ tile.terrain ].basicTiles )
            );
            this.gStore.map.setTileBorderPriority( tile.x , tile.y , -1 );
        }
    }

    /**
     * Borderizes tile on position x/y, piping them through autoborder
     * processors.
     * @param x tile-x position
     * @param y tile-y position
     */
    public borderizeTile( x: number , y: number ): void {

        const processors: IAutoBorderProcessor[] = [
            ...BadTileBorders ,
            WaterBorders ,
            ...TerrainOuterBorders ,
            ...TerrainJunctionBorders ,
            ...TerrainMultiBorders ,
        ];

        processors.forEach( p => this.borderizeWith( x , y , p ) );

    }

    /**
     * Returns an x/y point from matrix array that has either 4 (2x2)
     * or 9 (3x3) elements.
     * @param matrix array of elements
     * @param i index of element to convert
     */
    private getMatrixPoint( matrix: IMatrix<any> , i: number ): Point {
        if ( matrix.length == 4 ) {
            return new Point( i % 2 , Math.floor( i / 2.00 ) );
        } else if ( matrix.length == 9 ) {
            return new Point( i % 3 , Math.floor( i / 3.00 ) );
        } else {
            throw new Error( 'Invalid matrix length' );
        }
    }

    /**
     * Flips matcher arrays vertically.
     * @param matcher matcher
     */
    private flipMatcher( matcher: IAutoBorderMatcher ): IAutoBorderMatcher {

        if ( matcher.in.length == 4 ) {

            // 0,1,   -> 2,3
            // 2,3    -> 0,1

            return {
                in: [ matcher.in[2] , matcher.in[3] ,
                    matcher.in[0] , matcher.in[1] ] ,
                out: [ matcher.out[2] , matcher.out[3] ,
                    matcher.out[0] , matcher.out[1] ] ,
                priority: matcher.priority ,
            };

        } else if ( matcher.in.length == 9 ) {

            // 0,1,2      6,7,8
            // 3,4,5  ->  3,4,5
            // 6,7,8      0,1,2

            return {
                in: [ matcher.in[6] , matcher.in[7] , matcher.in[8] ,
                      matcher.in[3] , matcher.in[4] , matcher.in[5] ,
                      matcher.in[0] , matcher.in[1] , matcher.in[2] ] ,

                out: [ matcher.out[6] , matcher.out[7] , matcher.out[8] ,
                      matcher.out[3] , matcher.out[4] , matcher.out[5] ,
                      matcher.out[0] , matcher.out[1] , matcher.out[2] ] ,

                priority: matcher.priority ,
            };

        } else {
            throw new Error( 'Invalid matcher length.' );
        }

    }

    /**
     * Mirrors matcher arrays horizontally
     * @param matcher 
     */
    private mirrorMatcher( matcher: IAutoBorderMatcher ): IAutoBorderMatcher {

        if ( matcher.in.length == 4 ) {

            // 0,1   ->   1,0
            // 2,3   ->   3,2

            return {
                in: [ matcher.in[1] , matcher.in[0] ,
                    matcher.in[3] , matcher.in[2] ] ,
                out: [ matcher.out[1] , matcher.out[0] ,
                    matcher.out[3] , matcher.out[2] ] ,
                priority: matcher.priority ,
            };

        } else if ( matcher.in.length == 9 ) {

            // 0,1,2      2,1,0
            // 3,4,5  ->  5,4,3
            // 6,7,8      8,7,6

            return {
                in: [ matcher.in[2] , matcher.in[1] , matcher.in[0] ,
                      matcher.in[5] , matcher.in[4] , matcher.in[3] ,
                      matcher.in[8] , matcher.in[7] , matcher.in[6] ] ,
                out: [ matcher.out[2] , matcher.out[1] , matcher.out[0] ,
                       matcher.out[5] , matcher.out[4] , matcher.out[3] ,
                       matcher.out[8] , matcher.out[7] , matcher.out[6] ] ,
                priority: matcher.priority ,
            };

        } else {
            throw new Error( 'Invalid matcher length.' );
        }

    }

    /**
     * Flips and mirrors matcher arrays in both axes
     * @param matcher 
     */
    private flipMirrorMatcher( matcher: IAutoBorderMatcher ): IAutoBorderMatcher {
        return this.flipMatcher( this.mirrorMatcher( matcher ) );
    }

    /**
     * Borderizes target tile in x/y position using auto border processor
     * @param x tile-x
     * @param y tile-y
     * @param processor 
     */
    private borderizeWith( x: number , y: number , processor: IAutoBorderProcessor ): void {

        // we will generate 4 variants for every matcher:
        //  standard
        //  mirrored
        //  flipped
        //  mirrored+flipped
        //
        const pipes: IPipe[] = [
            { getMatcher: matcher => matcher , mirror: false , flip: false } ,
            { getMatcher: matcher => this.mirrorMatcher( matcher ) , mirror: true , flip: false } ,
            { getMatcher: matcher => this.flipMatcher( matcher ) , mirror: false , flip: true } ,
            { getMatcher: matcher => this.flipMirrorMatcher( matcher ) , mirror: true , flip: true }
        ]

        processor.matchers.forEach( matcher => {

            // if it should not be transformed (NOT USED ANYMORE)
            if ( matcher.noTransform ) {
                // then just use standard variant
                this.internalProcessMatcher(
                    x , y , processor , matcher , !!matcher.outMirror , !!matcher.outFlip
                );
            } else {
                // else, process 4 variants of matcher
                pipes.forEach( pipe => {
                    this.internalProcessMatcher( 
                        x , y , processor , pipe.getMatcher(matcher) , pipe.mirror , pipe.flip
                    );
                } );
            }
        } );

    }

    /**
     * Returns tile border priority previously stored using setBorderedPriority
     * @param tileX tile-x position
     * @param tileY tile-y position
     */
    private getBorderedPriority( tileX: number , tileY: number ): number {
        const cacheX: number = tileX - this.fBorderFrom.x;
        const cacheY: number = tileY - this.fBorderFrom.y;
        const tile = this.gStore.map.getMapTileOrNull( tileX , tileY );
        if ( tile ) {
            return tile.borderPriority;
        } else {
            return -1;
        }
    }

    /**
     * Sets tile border priority for later. This is used to make sure that
     * less-priority borders wont overwrite higher-priority ones (mostly corner ones).
     * @param tileX tile-x position
     * @param tileY tile-y position
     * @param priority new priority
     */
    private setBorderedPriority( tileX: number , tileY: number , priority: number ): void {
        const cacheX: number = tileX - this.fBorderFrom.x;
        const cacheY: number = tileY - this.fBorderFrom.y;
        this.gStore.map.setTileBorderPriority( tileX , tileY , priority );
    }

    /**
     * Processes matcher over specific tile.
     * @param x x position of tile
     * @param y y position of tile
     * @param processor auto border processor to use
     * @param matcher matcher of auto border processor to use
     * @param mirror shold output sprites be mirrored?
     * @param flip should output sprites be flipped?
     */
    private internalProcessMatcher( x: number , y: number , processor: IAutoBorderProcessor , matcher: IAutoBorderMatcher , mirror: boolean , flip: boolean ) {

        /**
         * First of all, we are going to process "in" input array to check if this tile combination
         * satifies this matcher.
         */
        for( let i = 0 ; i < matcher.in.length ; ++i ) {
            
            const point: Point = this.getMatrixPoint( matcher.in , i );

            if ( this.gStore.map.isValidTile( point.x + x , point.y + y ) ) {                
                const tile: ITile = this.gStore.map.getMapTile( point.x + x , point.y + y );
                const source = processor.sources[ matcher.in[i] ];
            
                if ( !source( tile.terrain ) ) {
                    return;
                }

            } else {

                const source = processor.sources[ matcher.in[i] ];
                if ( !source( null ) ) {
                    return;
                }

            }

        }

        /**
         * If we made it up to this point, it means that currently processing tile matcher
         * matcher's pattern.
         */
        for( let i = 0 ; i < matcher.in.length ; ++i ) {

            const point: Point = this.getMatrixPoint( matcher.in , i );
            const isValid: boolean = this.gStore.map.isValidTile( point.x + x , point.y + y );
            const priority: number = this.getBorderedPriority( point.x + x , point.y + y );
            const isOnEdge: boolean = (
                point.x + x === this.fBorderFrom.x ||
                point.y + y === this.fBorderFrom.y ||
                point.x + x === this.fBorderTo.x ||
                point.y + y === this.fBorderTo.y
            );

            // proceed only if tile exists, has lower priority and also we exclude edges
            // of target border rectangle from processing
            if ( isValid && matcher.priority > priority && !isOnEdge ) {
                const tile: ITile = this.gStore.map.getMapTile( point.x + x , point.y + y )!;

                const output = processor.outputs[ matcher.out[i] ];
                if ( output ) {
                    this.setBorderedPriority( point.x + x , point.y + y , matcher.priority );
                    this.gStore.map.setTileTerrain(
                        tile.x , 
                        tile.y ,
                        output.terrainOverride !== undefined ? output.terrainOverride : tile.terrain ,
                        Arrays.randomElement( output.sprites ) ,
                        mirror ,
                        flip ,
                    );
                }
            }

        }

    }

}

export default AutoBorder;
