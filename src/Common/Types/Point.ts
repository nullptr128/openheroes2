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

    public isLessThan( point: Point ): boolean {
        return ( this.x < point.x || this.y < point.y );
    }

    public isGreaterThan( point: Point ): boolean {
        return ( this.x > point.x || this.y > point.y );
    }

    public subtract( value: number ): Point {
        return new Point( this.x - value , this.y - value );
    }

    public add( value: number ): Point {
        return new Point( this.x + value , this.y + value );
    }

}

export default Point;
