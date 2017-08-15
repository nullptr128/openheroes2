/**
 * OpenHeroes2
 * 
 * This interface defines structure of sprite-number list
 * for terrain borders.
 */

interface ITerrainBorders {
    vertical: number[] ,
    horizontal: number[] ,
    outerCorner: number[] ,
    innerCorner: number[] ,
}

export default ITerrainBorders;
