
import Container from '../Common/IOC/Container';
import EngineProvider from '../Common/Providers/EngineProvider';
import GraphicsLoader from '../Common/Engine/Graphics/GraphicsLoader';
import Agg from '../Common/Engine/Data/Agg';
import Engine from '../Common/Engine/Engine';
import PerfCounter from '../Common/Support/PerfCounter';

const container: Container = new Container();
container.use( EngineProvider );

async function test() {

    await container.get( Engine ).initialize();

    const graphicsLoader: GraphicsLoader = container.get( GraphicsLoader );
    const imageData: string = await graphicsLoader.getIcnAsDataUrl( 'UNICORN.ICN' , 4 );
    const tilData: string = await graphicsLoader.getTilAsDataUrl( 'GROUND32.TIL' , 48 );

    const image: HTMLImageElement = document.createElement( 'img' );
    image.src = imageData;
    //image.style.width = '60px';
    document.body.appendChild( image );

    const til: HTMLImageElement = document.createElement( 'img' );
    til.src = tilData;
    document.body.appendChild( til );

}

test();
