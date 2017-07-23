
import * as React from "react";
import GraphicsLoader from '../../../Common/Engine/Graphics/GraphicsLoader';
import EInject from '../../Core/EInject';

interface IcnImageProps {
    icnFileName: string;
    spriteIndex: number;
    className?: string;
}

interface IcnImageImageState {
    source: string;
}

export default class IcnImage extends React.Component<IcnImageProps,IcnImageImageState> {

    @EInject( GraphicsLoader )
    private gGraphicsLoader: GraphicsLoader;

    public state = {
        source: ''
    };

    public async componentDidMount(): Promise<void> {
        const dataUrl: string = await this.gGraphicsLoader.getIcnAsDataUrl( this.props.icnFileName , this.props.spriteIndex );
        this.setState( { source: dataUrl } );
    }

    public render(): JSX.Element {
        return <img className={ this.props.className } src={ this.state.source }/>
    }   

}