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
            <table id="constrait">
                <tr>
                    <td className="startbackground"><div className="inputround">
                        <input onInput={this.typeChange}
                            placeholder= "type"
                            size={this.state.typeSize}
                            value= {this.state.constrait.type} />
                    </div></td>
                    <td className="middlebackground">
                        <input onInput={this.valueChange}
                            placeholder="value"
                            size={this.state.valueSize} 
                            value= {this.state.constrait.value} />
                    </td>
                    <td className="endbackground">
                        <button className="btn">
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button style={{width:"100%"}} className="btnlong">
                            <i className="fa fa-plus"></i>
                        </button>
                    </td>
                </tr>
            </table>
        );
    }
    
    typeChange(e){
        this.setState({typeSize : e.target.value.size})   
    }

    valueChange(e){
        this.setState({valueSize : e.target.value.size})        
    }

    onBlure(){
        this.props.owner.setConstrait(this.state.constrait)
    }
}