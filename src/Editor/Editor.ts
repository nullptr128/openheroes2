
import Container from '../Common/IOC/Container';
import EngineProvider from '../Common/Providers/EngineProvider';
import GraphicsLoader from '../Common/Engine/Graphics/GraphicsLoader';
import Agg from '../Common/Engine/Data/Agg';
import Engine from '../Common/Engine/Engine';

const container: Container = new Container();
container.use( EngineProvider );

async function test() {

    await container.get( Engine ).initialize();

    const graphicsLoader: GraphicsLoader = container.get( GraphicsLoader );
    const imageData: string = await graphicsLoader.getAsDataUrl( 'MOUSE.ICN' , 0 );

    const image: HTMLImageElement = document.createElement( 'img' );
    image.src = imageData;
    document.body.appendChild( image );

}

test();
