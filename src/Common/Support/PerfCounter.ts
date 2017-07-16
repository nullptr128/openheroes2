
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
