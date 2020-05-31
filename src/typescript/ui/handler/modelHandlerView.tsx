import { Component } from "react";
import React from "react";
import { ModelRepresentationView } from "./modelRepresentationView";
import { proxy } from "../../network/proxy";
import { Model } from "../../model/data/dmla/Model";
import  '../../../css/modelHandler.css';

export class ModelHandlerView extends Component<{},{}>{
    state={userNameSize:8,models:[] as Model[],showList:true}
    
    componentDidMount() {
        proxy.addEventListener("modelListed", (models) => {
            this.setState({models:models})
        }, this);
        proxy.addEventListener("modelAdded", (model) => {
            let models=this.state.models
            models.push(model)
            this.setState({models:models})
        }, this);
        proxy.addEventListener("modelRemoved", (modelId) => {
            let models=this.state.models.filter(item=>item.id!==modelId)
            this.setState({models:models,showList:false})
        }, this);
        proxy.addEventListener("modelUpdated", (model) => {
            let oldmodel = this.state.models.find(item=>item.id!==model.id)
            if(oldmodel){
                let modelIx = this.state.models.indexOf(oldmodel)
                let models = this.state.models
                models[modelIx]=model
                this.setState({models:models})
            }
        }, this);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("List state is updated!");
        if(!this.state.showList){
            this.setState({showList:true});
        }
    }

    componentWillUnmount() {
        proxy.removeAllEventListener(this);
    }

    render(){
        return(
            <div className="handler">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <table className="handlerouter"><tbody>
                <tr className="handler"><td className="handler" colSpan={2}>
                <table className="handlerheader"><tbody>
                    <tr className="handler"><td>
                        <b>Welcome</b>
                        <input 
                            className="handler"
                            onChange={e=>this.onUserNameChange(e.target.value)} 
                            placeholder="userName"
                            size={this.state.userNameSize} 
                        />
                        <b>!</b>
                        </td></tr>
                        <tr className="handler"><td className="handler">
                            <b>Your models</b>
                        </td></tr>
                    </tbody></table>
                </td></tr>
                <tr className="handler"><td className="handler">
                <button className="handlerlong" onClick={e => this.onAdd()}>
                    <i className="fa fa-plus"></i>
                </button>
                </td></tr>
                {this.state.models.map((model,index) =>
                    <tr key={model.id} className="handler"><td className="handler">
                        <ModelRepresentationView  owner={this} model={model}>
                        </ModelRepresentationView>
                    </td><td className="spacer"></td></tr>
                )}
                
            </tbody></table></div>
        )
    }

    onUserNameChange(e:string){
        this.setState({userNameSize:e.length})
    }

    onDelete(modelId:number){
        proxy.sendPacket({
            type:"modelRemoveRequest",
            token:proxy.getToken(),
            modelId: modelId         
        })
    }

    onAdd(){
        proxy.sendPacket(
            {
                type:"modelCreateRequest",
                token: proxy.getToken()
            }
        )
    }
}