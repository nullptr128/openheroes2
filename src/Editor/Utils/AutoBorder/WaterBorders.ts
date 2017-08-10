import IAutoBorderMatrix from './IAutoBorderMatrix';
import Terrain from '../../../Common/Types/Terrain';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';
import ITerrainBorders from '../../../Common/Types/ITerrainBorders';

const water = TerrainData[ Terrain.WATER ];

const WaterBorders: IAutoBorderMatrix[] = [

    // top corner
    {
        source: [
           null , Terrain.WATER , null ,
           null , { not: Terrain.WATER } , null ,
           null , null , null ,
        ] ,
        out: [
            null , { sprites: water.basicBorders.vertical , flip: true } , null ,
            null , null , null ,
            null , null , null , 
        ] ,
    } ,

    // bottom corner
    {
        source: [
            null , { not: Terrain.WATER } , null ,
            null , Terrain.WATER , null ,
            null , null , null ,
        ] ,
        out: [
            null , null , null ,
            null , { sprites: water.basicBorders.vertical } , null ,
            null , null , null ,
        ] ,
    } ,

    // left corner
    {
        source: [
            null , null , null ,
            Terrain.WATER , { not: Terrain.WATER } , null ,
            null , null , null ,
        ] ,
        out: [
            null , null , null ,
            { sprites: water.basicBorders.horizontal } , null , null ,
            null , null , null,
        ] ,
    } ,

    // right corner
    {
        source: [
            null , null , null ,
            { not: Terrain.WATER } , Terrain.WATER , null ,
            null , null , null ,
        ] ,
        out: [
            null , null , null ,
            null , { sprites: water.basicBorders.horizontal , mirror: true } , null ,
            null , null , null ,
        ] ,
    } ,

    // top-left corner
    {
        source: [
            Terrain.WATER , Terrain.WATER , null ,
            Terrain.WATER , { not: Terrain.WATER } , null ,
            null , null , null ,
        ] , 
        out: [
            { sprites: water.basicBorders.innerCorner , flip: true } , null , null ,
            null , null , null ,
            null , null , null ,
        ] ,
    } ,

    // top-right corner
    {
        source: [
            Terrain.WATER , Terrain.WATER , null ,
            { not: Terrain.WATER } , Terrain.WATER , null ,
            null , null , null ,
        ] ,
        out: [
            null , { sprites: water.basicBorders.innerCorner , mirror: true , flip: true } , null ,
            null , null , null ,
            null , null , null ,
        ] ,
    } ,

    // bottom-left corner
    {
        source: [
            Terrain.WATER , { not: Terrain.WATER } , null ,
            Terrain.WATER , Terrain.WATER , null ,
            null , null , null ,
        ] ,
        out: [
            null , null , null ,
            { sprites: water.basicBorders.innerCorner } , null , null ,
            null , null , null
        ] ,
    } ,

    // bottom-right crner
    {
        source: [
            { not: Terrain.WATER } , Terrain.WATER , null ,
            Terrain.WATER , Terrain.WATER , null ,
            null , null , null ,
        ] ,
        out: [
            null , null , null ,
            null , { sprites: water.basicBorders.innerCorner , mirror: true } , null ,
            null , null , null ,
        ] ,
    } ,    

    // top-left inner corner
    {
        source: [
            Terrain.WATER , { not: Terrain.WATER } , null ,
            { not: Terrain.WATER } , { not: Terrain.WATER } , null ,
            null , null , null ,
        ] ,
        out: [
            { sprites: water.basicBorders.outerCorner , flip: true } , null , null ,
            null , null , null ,
            null , null , null ,
        ] ,
    } ,

    // top-right inner corner
    {
        source: [
            { not: Terrain.WATER } , Terrain.WATER , null ,
            { not: Terrain.WATER } , { not: Terrain.WATER } , null ,
            null , null , null ,
        ] ,
        out: [
            null , { sprites: water.basicBorders.outerCorner , mirror: true , flip: true } , null ,
            null , null , null ,
            null , null , null ,
        ] ,
    } ,

    // bottom-left inner corner
    {
        source: [
            { not: Terrain.WATER } , { not: Terrain.WATER } , null ,
            Terrain.WATER , { not: Terrain.WATER } , null ,
            null , null , null ,
        ] ,
        out: [
            null , null , null ,
            { sprites: water.basicBorders.outerCorner } , null , null ,
            null , null , null ,
        ] ,
    } ,

    // bottom-right inner corner
    {
        source: [
            { not: Terrain.WATER } , { not: Terrain.WATER } , null ,
            { not: Terrain.WATER } , Terrain.WATER , null ,
            null , null , null ,
        ] ,
        out: [
            null , null , null ,
            null , { sprites: water.basicBorders.outerCorner , mirror: true } , null ,
            null , null , null ,
        ] ,
    } ,

];

export default WaterBorders;
