import { Component } from "react";
import React from "react";
import { TreeNodeView } from "./treeNodeView";
import { Model } from "../../model/data/dmla/Model";
import  '../../../css/model.css';

export class ModelView extends Component<{model:Model},{}>{   
    state={model:this.props.model}

    render(){
        return(
            <TreeNodeView treeNode={this.state.model.root}/>
        )
    }
}