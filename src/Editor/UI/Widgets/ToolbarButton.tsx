
import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import IcnImage from '../Misc/IcnImage';
import TilImage from '../Misc/TilImage';

interface ToolbarButtonProps {
    source?: string;
    icnFileName?: string;
    tilFileName?: string;
    spriteIndex?: number;
}

const ToolbarButton: React.SFC<ToolbarButtonProps> = (props) => {

    let image: JSX.Element | null = null;

    if ( props.source ) {
        image = (<img className="toolbar-button-image" src={ props.source }/>);
    } else if ( props.icnFileName && props.spriteIndex !== undefined ) {
        image = (<IcnImage className="toolbar-button-image" icnFileName={ props.icnFileName } spriteIndex={ props.spriteIndex }/>);
    } else if ( props.tilFileName && props.spriteIndex !== undefined ) {
        image = (<TilImage className="toolbar-button-image" tilFileName={ props.tilFileName } spriteIndex={ props.spriteIndex }/>);
    }

    if ( image ) {
        return (
            <IconButton className="toolbar-button">
                { image }
            </IconButton>
        );
    } else {
        return null;
    }

};

export default ToolbarButton;
