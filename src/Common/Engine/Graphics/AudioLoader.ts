import Injectable from '../../IOC/Injectable';
import Snd from '../Data/Snd';
import Inject from '../../IOC/Inject';
import Agg from '../Data/Agg';

@Injectable() 
class AudioLoader {

    @Inject( Agg )
    private gAgg: Agg;

    @Inject( Snd )
    private gSnd: Snd;

    public async getSoundAsDataUrl( sndFileName: string ): Promise<string> {
        const sndFile: Buffer = await this.gAgg.getFile( sndFileName );
        const waveFile: Buffer = await this.gSnd.getWav( sndFile );
        const blob: Blob = new Blob( [waveFile.buffer] , { type: 'audio/wav' } );
        return window.URL.createObjectURL( blob );
    }

}

export default AudioLoader;