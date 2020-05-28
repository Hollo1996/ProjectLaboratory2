import { Component } from "react";
import React from "react";
import { Model } from "../../model/data/dmla/Model";
import { ModelHandlerView } from "./modelHandlerView";

export class ModelRepresentationView extends Component<{owner:ModelHandlerView,model:Model},{model:Model}>{
    state={model:this.props.model,modelNameSize:9}
    render(){
        return(<table className="model">
                    <tr>
                        <td><input 
                            onInput={this.onModelNameChange}
                            placeholder="modelName"
                            size={this.state.modelNameSize}
                            /></td>
                        <td><button className="round">
                            <i className="fa fa-pencil"></i>
                        </button></td>
                        <td><button className="round">
                            <i className="fa fa-trash"></i>
                        </button></td>
                    </tr>
                </table>)
    }

    onModelNameChange(e){
        this.state.modelNameSize=e.target.value.size;
    }

}