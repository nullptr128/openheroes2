
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
    console.log( await graphicsLoader.getH2Sprites( 'MOUSE.ICN' ) );

}

test();
