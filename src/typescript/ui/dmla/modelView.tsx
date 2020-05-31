import { Component } from "react";
import React from "react";
import { TreeNodeView } from "./treeNodeView";
import { Model } from "../../model/data/dmla/Model";
import  '../../../css/model.css';
import { proxy } from "../../network/proxy";

export class ModelView extends Component<{model:Model},{}>{   
    state={model:this.props.model,showRoot:true}
    
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
      

    componentDidMount() {
        proxy.addEventListener("wholeModelUpdated", (model) => {
            this.setState({showRoot:false,model:model});
        }, this);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Model state is updated!");
        if(!this.state.showRoot){
            this.setState({showRoot:true});
        }
    }

    componentWillUnmount() {
        proxy.removeAllEventListener(this);
    }

    render(){
        return(
            <div className="model">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                {this.state.showRoot && <TreeNodeView key={this.state.model.root} treeNode={this.state.model.root}/>}
            </div>
        )
    }
}