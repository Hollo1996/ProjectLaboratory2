import { Component } from "react";
import React from "react";
import { Model } from "../../model/data/dmla/Model";
import { ModelHandlerView } from "./modelHandlerView";
import { proxy } from "../../network/proxy";
import  '../../../css/modelHandler.css';

export class ModelRepresentationView extends Component<{owner:ModelHandlerView,model:Model},{}>{
    state={model:this.props.model,modelNameSize:9}
    render(){
        return(<table className="handlermodel"><tbody>
                    <tr>
                        <td><input 
                            className="handler"
                            onChange={e=>this.onModelNameChange(e.target.value)}
                            onBlur={e=>this.onBlur(e.target.value)}
                            placeholder="modelName"
                            size={this.state.modelNameSize}
                            /></td>
                        <td><button className="handlerround" onClick={e => this.onOpen()}> 
                            <i className="fa fa-pencil"></i>
                        </button></td>
                        <td><button className="handlerround" onClick={e => this.onDelete()}>
                            <i className="fa fa-trash"></i>
                        </button></td>
                    </tr>
                </tbody></table>)
    }

    onBlur(e:string){
        proxy.sendPacket({
            type:"modelMetaUpdateRequest",
            token:proxy.getToken(),
            model:this.state.model            
        })
    }

    onDelete(){
        this.props.owner.onDelete(this.state.model.id)
    }

    onOpen(){
        proxy.sendPacket({
            type:"modelDetailsRequest",
            token:proxy.getToken(),
            modelId:this.state.model.id       
        })
    }

    onModelNameChange(e:string){
        this.setState({model:this.state.model,modelNameSize : e==="" ? 9 : e.length})
    }

}