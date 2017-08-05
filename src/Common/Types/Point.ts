/**
 * OpenHeroes2
 * 
 * This class holds arbitary position.
 */

class Point {
    
    public x: number;
    public y: number;

    constructor( x: number , y: number ) {
        this.x = x;
        this.y = y;
    }

    public toString(): string {
        return `[${this.x},${this.y}]`;
    }

    public static zero(): Point {
        return new Point( 0.000 , 0.000 );
    }

}

export default Point;
