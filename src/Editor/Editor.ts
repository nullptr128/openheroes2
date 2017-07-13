
import Files from '../Common/Engine/Files/Files';
import BinaryFile from '../Common/Engine/Files/BinaryFile';
import Container from '../Common/IOC/Container';
import Agg from '../Common/Engine/Data/Agg';

const container: Container = new Container();
container.bind( Files );
container.bind( Agg );

async function test() {

    try {
        
        const agg: Agg = container.get( Agg );
        await agg.loadAggFile( './h2data/Heroes2.agg' );
        await agg.loadAggFile( './h2data/Heroes2x.agg' );

    } catch( err ) {
        console.log( 'Err:' , err );
    }

}

test();
