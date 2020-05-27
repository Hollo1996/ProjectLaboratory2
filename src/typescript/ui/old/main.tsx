//import { ConversationDto } from "../../model/chat";
import React, { Component } from "react";
import { proxy } from "../../network/proxy";
import { RightPane } from "./rightPane";
import { LeftPane } from "./leftPane";

export class Main extends Component {/*
    state = { selectedConversation: undefined as (ConversationDto | undefined) };

    render() {
        let className = "main row " + (this.state.selectedConversation ? "right" : "left");
        return (
            <div className={className}>
                <LeftPane
                    inbox={proxy.inbox!}
                    selectedConversation={this.state.selectedConversation}
                    onSelect={c => this.setState({ selectedConversation: c })} />
                <RightPane conversation={this.state.selectedConversation}
                    onBack={() => this.setState({ selectedConversation: undefined })} />
            </div>
        );
    }*/
}
