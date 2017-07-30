import ITerrainData from '../../Types/ITerrainData';
import Terrain from '../../Types/Terrain';
import Arrays from '../../Support/Arrays';

const TerrainData: ITerrainData[] = new Array<ITerrainData>( 9 );

// Water
TerrainData[ Terrain.WATER ] = {
    color: { r: 140 , g: 175 , b: 230 , a: 255 } ,
    terrain: Terrain.WATER ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 16 , 29 ) ,
    decorationTiles: Arrays.createRange( 16 , 29 ) ,
    basicBorders: {
        vertical: Arrays.createRange( 0 , 3 ) ,
        outerCorner: Arrays.createRange( 4 , 7 ) ,
        horizontal: Arrays.createRange( 8 , 11 ) ,
        innerCorner: Arrays.createRange( 12 , 15 ) ,
    } ,
    junctionBorders: {
        vertical: Arrays.createRange( 0 , 3 ) ,
        outerCorner: Arrays.createRange( 4 , 7 ) ,
        horizontal: Arrays.createRange( 8 , 11 ) ,
        innerCorner: Arrays.createRange( 12 , 15 ) ,
    } ,
    multiBorders: [] ,
};

TerrainData[ Terrain.GRASS ] = {
    color: { r: 130 , g: 168 , b: 109 , a: 255 } ,
    terrain: Terrain.GRASS ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 68 , 75 ) ,
    decorationTiles: Arrays.createRange( 76 , 91 ) ,
    basicBorders: {
        vertical: Arrays.createRange( 46 , 49 ) ,
        outerCorner: Arrays.createRange( 50 , 53 ) ,
        horizontal: Arrays.createRange( 54 , 57 ) ,
        innerCorner: Arrays.createRange( 58 , 61 ) ,
    } ,
    junctionBorders: {
        vertical: Arrays.createRange( 30 , 33 ) ,
        outerCorner: Arrays.createRange( 34 , 37 ) ,
        horizontal: Arrays.createRange( 38 , 41 ) ,
        innerCorner: Arrays.createRange( 42 , 45 ) ,
    } ,
    multiBorders: Arrays.createRange( 62 , 67 ) ,
};

TerrainData[ Terrain.DIRT ] = {
    color: { r: 168 , g: 137 , b: 109 , a: 255 } ,
    terrain: Terrain.DIRT ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 337 , 344 ) ,
    decorationTiles: Arrays.createRange( 345 , 360 ) ,
    basicBorders: {
        vertical: Arrays.createRange( 321 , 324 ) ,
        outerCorner: Arrays.createRange( 325 , 328 ) ,
        horizontal: Arrays.createRange( 329 , 332 ) ,
        innerCorner: Arrays.createRange( 333 , 336 ) ,
    } ,
    junctionBorders: {
        vertical: [] ,
        outerCorner: [] ,
        horizontal: [] ,
        innerCorner: [] ,
    } ,
    multiBorders: [] ,
};

TerrainData[ Terrain.SNOW ] = {
    color: { r: 224 , g: 224 , b: 224 , a: 255 } ,
    terrain: Terrain.SNOW ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 130 , 137 ) ,
    decorationTiles: Arrays.createRange( 138 , 145 ) ,
    basicBorders: {
        vertical: Arrays.createRange( 108 , 111 ) ,
        outerCorner: Arrays.createRange( 112 , 115 ) ,
        horizontal: Arrays.createRange( 116 , 119 ) ,
        innerCorner: Arrays.createRange( 120 , 123 ) ,
    } ,
    junctionBorders: {
        vertical: Arrays.createRange( 92 , 95 ) ,
        outerCorner: Arrays.createRange( 96 , 99 ) ,
        horizontal: Arrays.createRange( 100 , 103 ) ,
        innerCorner: Arrays.createRange( 104 , 107 ) ,
    } ,
    multiBorders: Arrays.createRange( 124 , 129 ) ,
};

TerrainData[ Terrain.SWAMP ] = {
    color: { r:  82 , g:  89 , b:  77 , a: 255 } ,
    terrain: Terrain.SWAMP ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 184 , 191 ) ,
    decorationTiles: Arrays.createRange( 192 , 207 ) ,
    basicBorders: {
        vertical: Arrays.createRange( 162 , 165 ) ,
        outerCorner: Arrays.createRange( 166 , 169 ) ,
        horizontal: Arrays.createRange( 170 , 173 ) ,
        innerCorner: Arrays.createRange( 174 , 177 ) ,
    } ,
    junctionBorders: {
        vertical: Arrays.createRange( 146 , 149 ) ,
        outerCorner: Arrays.createRange( 150 , 153 ) ,
        horizontal: Arrays.createRange( 154 , 157 ) ,
        innerCorner: Arrays.createRange( 158 , 161 ) ,
    } ,
    multiBorders: Arrays.createRange( 178 , 183 ) ,
};

TerrainData[ Terrain.LAVA ] = {
    color: { r:  91 , g:  80 , b:  80 , a: 255 } ,
    terrain: Terrain.LAVA ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 246  , 253 ) ,
    decorationTiles: Arrays.createRange( 254 , 261 ) ,
    basicBorders: {
        vertical: Arrays.createRange( 224 , 227 ) ,
        outerCorner: Arrays.createRange( 228 , 231 ) ,
        horizontal: Arrays.createRange( 132 , 235 ) ,
        innerCorner: Arrays.createRange( 236 , 239 ) ,
    } ,
    junctionBorders: {
        vertical: Arrays.createRange( 208 , 211 ) ,
        outerCorner: Arrays.createRange( 212 , 215 ) ,
        horizontal: Arrays.createRange( 216 , 219 ) ,
        innerCorner: Arrays.createRange( 220 , 223 ) ,
    } ,
    multiBorders: Arrays.createRange( 240 , 245 ) ,
};

TerrainData[ Terrain.ROUGH ] = {
    color: { r: 196 , g: 173 , b: 123 , a: 255 } ,
    terrain: Terrain.ROUGH ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 399 , 406 ) ,
    decorationTiles: Arrays.createRange( 407 , 414 ) ,
    basicBorders: {
        vertical: Arrays.createRange( 377 , 380 ) ,
        outerCorner: Arrays.createRange( 381 , 384 ) ,
        horizontal: Arrays.createRange( 385 , 388 ) ,
        innerCorner: Arrays.createRange( 389 , 392 ) ,
    } ,
    junctionBorders: {
        vertical: Arrays.createRange( 361 , 364 ) ,
        outerCorner: Arrays.createRange( 365 , 368 ) ,
        horizontal: Arrays.createRange( 369 , 372 ) ,
        innerCorner: Arrays.createRange( 373 , 376 ) ,
    } ,
    multiBorders: Arrays.createRange( 393 , 398 ) ,
};

TerrainData[ Terrain.DESERT ] = {
    color: { r: 216 , g: 213 , b: 151 , a: 255 } ,
    terrain: Terrain.DESERT ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 300 , 307 ) ,
    decorationTiles: Arrays.createRange( 308 , 320 ) ,
    basicBorders: {
        vertical: Arrays.createRange( 278 , 281 ) ,
        outerCorner: Arrays.createRange( 282 , 285 ) ,
        horizontal: Arrays.createRange( 286 , 289 ) ,
        innerCorner: Arrays.createRange( 290 , 293 ) ,
    } ,
    junctionBorders: {
        vertical: Arrays.createRange( 262 , 265 ) ,
        outerCorner: Arrays.createRange( 266 , 269 ) ,
        horizontal: Arrays.createRange( 270 , 273 ) ,
        innerCorner: Arrays.createRange( 274 , 277 ) ,
    } ,
    multiBorders: Arrays.createRange( 294 , 299 ) ,
};

TerrainData[ Terrain.SAND ] = {
    color: { r: 244 , g: 231 , b: 183 , a: 255 } ,
    terrain: Terrain.SAND ,
    tilFile: 'GROUND32.TIL' ,
    basicTiles: Arrays.createRange( 415 , 422 ) ,
    decorationTiles: Arrays.createRange( 423 , 431 ) ,
    basicBorders: {
        vertical: [] ,
        outerCorner: [] ,
        horizontal: [] ,
        innerCorner: [] ,
    } ,
    junctionBorders: {
        vertical: [] ,
        outerCorner: [] ,
        horizontal: [] ,
        innerCorner: [] ,
    } ,
    multiBorders: [] ,
};

export default TerrainData;
