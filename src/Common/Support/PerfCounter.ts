/**
 * OpenHeroes2
 * 
 * This helper class calculates how many seconds 
 * have passed from last 'checkpoint'. It can be 
 * used to debug how much time certain process 
 * takes.
 * 
 * Example usage:
 * 
 * async function someWork() {
 *   const counter: PerfCounter = new PerfCounter();
 *   await Tools.sleep( 2000 );
 *   console.log( counter.delta() ); // will output around 2.00
 *   await Tools.sleep( 3000 );
 *   console.log( counter.delta() ); // will output around 3.00
 * } 
 */

class PerfCounter {

    private fStoredTime: number = new Date().getTime();

    public delta(): string {
        const now: number = new Date().getTime();
        const result: number = now - this.fStoredTime;
        this.fStoredTime = now;
        return ( result / 1000.0 ).toFixed(2);
    }

}

export default PerfCounter;
