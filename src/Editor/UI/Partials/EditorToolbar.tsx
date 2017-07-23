
import * as React from 'react';
import { Toolbar, ToolbarGroup , ToolbarSeparator } from 'material-ui/Toolbar';
import ToolbarButton from '../Widgets/ToolbarButton';

export default class EditorToolbar extends React.Component {

    public render(): JSX.Element {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={ true } style={ { paddingLeft: '10px' } }>
                    
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 50 }/>
                    <ToolbarButton icnFileName="STREAM.ICN" spriteIndex={ 3 }/>
                    <ToolbarButton icnFileName="ROAD.ICN" spriteIndex={ 0 }/>
                    
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>
                    
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 16 }/>
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 68 }/>
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 134 }/>
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 190 }/>
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 211 }/>
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 300 }/>
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 337 }/>
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 399 }/>
                    <ToolbarButton tilFileName="GROUND32.TIL" spriteIndex={ 415 }/>
                    
                    <ToolbarSeparator style={ { marginLeft: '10px' , marginRight: '10px' } }/>
                    
                    <ToolbarButton icnFileName="OBJNGRA2.ICN" spriteIndex={ 92 }/>
                    <ToolbarButton icnFileName="MINITOWN.ICN" spriteIndex={ 1 }/>
                    <ToolbarButton icnFileName="PHOENIX.ICN" spriteIndex={ 1 }/>
                    <ToolbarButton icnFileName="MINIHERO.ICN" spriteIndex={ 1 }/>
                    <ToolbarButton icnFileName="OBJNARTI.ICN" spriteIndex={ 19 }/>
                    <ToolbarButton icnFileName="OBJNRSRC.ICN" spriteIndex={ 1 }/>

                </ToolbarGroup>
            </Toolbar>
        );
    }

}
