import { Component } from "react";
import React from "react";
import { TreeNodeView } from "./treeNodeView";
import { Model } from "../../model/data/dmla/Model";
import  '../../../css/model.css';

export class ModelView extends Component<{model:Model},{}>{   
    state={model:this.props.model}

    render(){
        return(
            <div className="model">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <TreeNodeView treeNode={this.state.model.root}/>
            </div>
        )
    }
}