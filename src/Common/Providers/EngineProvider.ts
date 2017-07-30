/**
 * OpenHeroes2
 * 
 * Prepares container for Engine usage, registering
 * various graphics/audio/file related classes.
 */

import Container from '../IOC/Container';
import Agg from '../Engine/Data/Agg';
import Pal from '../Engine/Data/Pal';
import Engine from '../Engine/Engine';
import BinaryFile from '../Engine/Files/BinaryFile';
import Files from '../Engine/Files/Files';
import GraphicsLoader from '../Engine/Graphics/GraphicsLoader';
import Icn from '../Engine/Data/Icn';
import Til from '../Engine/Data/Til';
import Snd from '../Engine/Data/Snd';
import AudioLoader from '../Engine/Audio/AudioLoader';
import Paths from '../Engine/Misc/Paths';
import Locale from '../Engine/Misc/Locale';
import Events from '../Events/Events';
import Render from '../Engine/Render/Render';
import Resources from '../Engine/Resource/Resources';
import Textures from '../Engine/Resource/Textures';

export default function EngineProvider( container: Container ): void {
    container.bind( Agg );
    container.bind( Pal );
    container.bind( Icn );
    container.bind( Til );
    container.bind( Snd );
    container.bind( Engine );
    container.bind( BinaryFile );
    container.bind( Files );
    container.bind( GraphicsLoader );
    container.bind( AudioLoader );
    container.bind( Paths );
    container.bind( Locale );
    container.bind( Events );
    container.bind( Render );
    container.bind( Resources );
    container.bind( Textures );
}
