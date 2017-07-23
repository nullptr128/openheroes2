
import * as React from "react";
import GraphicsLoader from '../../../Common/Engine/Graphics/GraphicsLoader';
import EInject from '../../Core/EInject';

interface TilImageProps {
    tilFileName: string;
    spriteIndex: number;
    className?: string;
}

interface TilImageImageState {
    source: string;
}

export default class TilImage extends React.Component<TilImageProps,TilImageImageState> {

    @EInject( GraphicsLoader )
    private gGraphicsLoader: GraphicsLoader;

    public state = {
        source: ''
    };

    public async componentDidMount(): Promise<void> {
        const dataUrl: string = await this.gGraphicsLoader.getTilAsDataUrl( this.props.tilFileName , this.props.spriteIndex );
        this.setState( { source: dataUrl } );
    }

    public render(): JSX.Element {
        return <img className={ this.props.className } src={ this.state.source }/>
    }   

}