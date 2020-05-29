import { Component } from "react";
import React from "react";
import { SlotView } from "./slotView";
import { Constrait } from "../../model/data/dmla/Constrait";
import  '../../../css/model.css';

export class ConstraitView extends Component<{constrait:Constrait,owner:SlotView},{}>{
    state = {
        constrait: this.props.constrait, 
        typeSize: this.props.constrait.type? this.props.constrait.type.length : 4, 
        valueSize: this.props.constrait.value? this.props.constrait.value.length : 5};

    render() {
        return (
            <tr>
                <td className="backgroundstart"><div className="inputround">
                    <input className="model"
                        onChange={e=>this.typeChange(e)}
                        onBlur={e=>this.onBlure()}
                        placeholder= "type"
                        size={this.state.typeSize}
                        value= {this.state.constrait.type} />
                </div></td>
                <td className="backgroundmiddle">
                    <input className="model"
                        onChange={e=>this.valueChange(e)}
                        onBlur={e=>this.onBlure()}
                        placeholder="value"
                        size={this.state.valueSize} 
                        value= {this.state.constrait.value} />
                </td>
                <td className="backgroundend">
                    <button className="btnround">
                        <i className="fa fa-ellipsis-h"></i>
                    </button>
                </td>
            </tr>
        );
    }
    
    typeChange(e){
        let constrait = this.state.constrait
        constrait.type=e.target.value
        this.setState({constrait:constrait,typeSize : e.target.value.length> 4? e.target.value.length:4})   
    }

    valueChange(e){
        let constrait = this.state.constrait
        constrait.value=e.target.value
        this.setState({constrait:constrait,valueSize : e.target.value.length> 5? e.target.value.length:5})        
    }

    onBlure(){
        this.props.owner.setConstrait(this.state.constrait)
    }
}