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

    /**
     * Returns a string with position.
     */
    public toString(): string {
        return `[${this.x},${this.y}]`;
    }

    /**
     * Returns new point with x=0 y=0
     */
    public static zero(): Point {
        return new Point( 0.000 , 0.000 );
    }

    /**
     * Checks if point value is less than another point value.
     * @param point 
     */
    public isLessThan( point: Point ): boolean {
        return ( this.x < point.x || this.y < point.y );
    }

    /**
     * Checks if point value is greater than another point value.
     * @param point 
     */
    public isGreaterThan( point: Point ): boolean {
        return ( this.x > point.x || this.y > point.y );
    }

    /**
     * Subtracts particular value from x and y positions
     * @param value 
     */
    public subtract( value: number ): Point {
        return new Point( this.x - value , this.y - value );
    }

    /**
     * Adds particular value to x and y positions
     * @param value 
     */
    public add( value: number ): Point {
        return new Point( this.x + value , this.y + value );
    }

}

export default Point;
