import { Component } from "react";
import { ConstraitView } from "./constraitView";
import React from "react";
import { Slot } from "../../model/data/dmla/Slot";
import { proxy } from "../../network/proxy";
import { EntityView } from "./entityView";
import { Constrait } from "../../model/data/dmla/Constrait";
import { Type } from "../../model/data/dmla/constrait/Type";
import { Cardinality } from "../../model/data/dmla/constrait/Cardinality";
import { OperationSignature } from "../../model/data/dmla/constrait/OperationSigniture";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

export class SlotView extends Component<{owner:EntityView,slot:Slot},{}>{
    state = {
        slot: this.props.slot, 
        typeSize: 4, 
        cardinalitySize: 11,
        nameSize:4, 
        superSize:4
    };
    render(){
        return(
                <tr>
                    <td colSpan={3}>
                        <table id="slot">
                            <tr>
                                <td className="btntall" rowSpan={2}>
                                    <button className="btntall">
                                        <i className="fa fa-arrow-up"></i>
                                    </button>
                                </td>
                                <td className="middlebackground"><div className="inputstart">
                                    <input 
                                        onInput={this.nameChange}
                                        onBlur={this.onBlur}
                                        placeholder="name"
                                        value={this.state.slot.name}
                                        size={this.state.nameSize}
                                    />
                                </div></td>
                                <td className="middlebackground">
                                    <input 
                                        onInput={this.superChange}
                                        onBlur={this.onBlur}
                                        placeholder="super"
                                        value={this.state.slot.superName}
                                        size={this.state.superSize}
                                    />
                                </td>
                                <td className="middlebackground"><div className="inputround">
                                    <input 
                                        onInput={this.typeChange}
                                        onBlur={this.onBlur}
                                        placeholder= "type"
                                        size={this.state.typeSize}
                                        value= {this.state.slot.type.entityName} 
                                    />
                                </div></td>
                                <td className="middlebackground">
                                    <input 
                                        onInput={this.cardinalityChange}
                                        onBlur={this.onBlur}
                                        placeholder="cardinality"
                                        size={this.state.cardinalitySize} 
                                        value= {
                                            this.state.slot.cardinality.from.toString()
                                            +".."+
                                            this.state.slot.cardinality.toInf? "*" :
                                            this.state.slot.cardinality.to.toString()
                                            } />
                                </td>
                                <td className="endbackground">
                                    <button className="btn"><i className="fa fa-ellipsis-h"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <table id="constrait">
                                        <ConstraitView 
                                            constrait={this.state.slot.type} 
                                            owner={this}
                                        />
                                        <ConstraitView 
                                            constrait={this.state.slot.cardinality} 
                                            owner={this}
                                        />
                                        {this.state.slot.customConstraits.map(constrait =>
                                            <ConstraitView constrait={constrait} owner={this} />
                                        )}   
                                        <tr>
                                            <td>
                                                <button 
                                                    className="btnlong"
                                                    onClick={this.onConstraitClickPlus}>
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
        );
    }
        
    typeChange(e){
        this.setState({slot: {type: {value:e.target.value}},typeSize : e.target.value.size})   
    }

    cardinalityChange(e){
        this.setState({slot: {cardinality: {value:e.target.value}},cardinalitySize : e.target.value.size})        
    }

    nameChange(e){
        this.setState({slot: {name:e.target.value},nameSize: e.target.value.size})
    }

    superChange(e){
        this.setState({slot: {super: e.target.value},superSize: e.target.value.size})
    }
    onBlur(e){
        this.props.owner.setSlot(this.state.slot)
    }

    setConstrait(constrait:Constrait){
        let c = constrait
        switch(constrait.id){
            case this.state.slot.type.id:
                this.setState({slot:{type:(c as Type)}})
                break;
            case this.state.slot.cardinality.id:
                this.setState({slot:{cardinality:c as Cardinality}})
                break;
            case this.state.slot.operationSignature.id:
                this.setState({slot:{operationSignature:c as OperationSignature}})
                break;
            default:
                let constrait=this.state.slot.customConstraits.find(item=>item.id===constrait.id)
                if(constrait){
                    let idx = this.state.slot.customConstraits.indexOf(constrait)
                    let constraits = this.state.slot.customConstraits
                    constraits[idx]=constrait
                    this.setState({slot:{customConstraits:constraits}})
                }
                break;
        }
    }
    onConstraitClickPlus(e){
        this.state.slot.customConstraits.push({id:0, type:"", value:""})
        this.props.owner.setSlot(this.state.slot)
    }
}