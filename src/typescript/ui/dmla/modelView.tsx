import { Component } from "react";
import React from "react";
import { TreeNodeView } from "./treeNodeView";
import { proxy } from "../../network/proxy";
import { Model } from "../../model/data/dmla/Model";

export class ModelView extends Component<{model:Model},{}>{   
    state={model:this.props.model}
    
    componentDidMount() {
        proxy.addEventListener("modelDetail", (model) => {
            this.setState({model:model})
        }, this);
    }

    componentWillUnmount() {
        proxy.removeAllEventListener(this);
    }

    render(){
        proxy.sendPacket(
            {
                type:"modelDetailsRequest",
                token:proxy.getToken(),
                modelId:this.state.model.id
            }
        )
        return(
            <TreeNodeView treeNode={this.state.model.root}/>
        )
    }
}