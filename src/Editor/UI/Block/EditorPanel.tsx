
import * as React from 'react';
import Minimap from '../Widgets/Minimap';
import EditorActiveTab from '../../Types/EditorActiveTab';
import EInject from '../../Core/EInject';
import EditorStore from '../../Core/EditorStore';
import Events from '../../../Common/Engine/Events/Events';
import Nullable from '../../../Common/Support/Nullable';
import TabOptsTerrain from '../TabOpts/TabOptsTerrain';
import EEditorTabChanged from '../../Events/EEditorTabChanged';

interface IEditorPanelState {
    activeTab: EditorActiveTab;
}

export default class EditorPanel extends React.Component<{},IEditorPanelState> {

    @EInject( Events )
    private gEvents: Events;

    @EInject( EditorStore )
    private gStore: EditorStore;

    private fHandler: any;

    state = {
        activeTab: EditorActiveTab.TERRAIN
    };

    public getActiveTabElement(): Nullable<JSX.Element> {

        if ( this.state.activeTab == EditorActiveTab.TERRAIN ) {
            return <TabOptsTerrain/>
        }

        return null;

    }

    public render(): JSX.Element {

        const activeTabElement: Nullable<JSX.Element> = this.getActiveTabElement();

        return (
            <div className="editor-panel">
                <div className="editor-panel-minimap">
                    <Minimap/>
                </div>
                <div className="editor-panel-tab-element">
                    { activeTabElement }
                </div>
            </div>
        );
    }

    public componentDidMount(): void {
        this.setState( {
            activeTab: this.gStore.ui.getActiveTab()
        } );
        this.gEvents.on( EEditorTabChanged , params => this.setState( { activeTab: params.activeTab } ) );
    }   

}
