
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
    const imageData: string = await graphicsLoader.getAsDataUrl( 'UNICORN.ICN' , 4 );

    const image: HTMLImageElement = document.createElement( 'img' );
    image.src = imageData;
    //image.style.width = '60px';
    document.body.appendChild( image );

}

test();
