import { Component } from "react";
import { ConstraitView } from "./constraitView";
import React from "react";
import { Slot } from "../../model/data/dmla/Slot";
import { EntityView } from "./entityView";
import { Constrait } from "../../model/data/dmla/Constrait";
import { Type } from "../../model/data/dmla/constrait/Type";
import { Cardinality } from "../../model/data/dmla/constrait/Cardinality";
import { OperationSignature } from "../../model/data/dmla/constrait/OperationSigniture";
import  '../../../css/model.css';

export class SlotView extends Component<{owner:EntityView,slot:Slot},{}>{
    state = {
        slot: this.props.slot, 
        typeSize: this.props.slot.type? this.props.slot.type.value.length : 4, 
        cardinalitySize: this.props.slot.cardinality.value? this.props.slot.cardinality.value.length : 11,
        nameSize:this.props.slot.name? this.props.slot.name.length : 4, 
        superSize:this.props.slot.superName? this.props.slot.superName.length : 4,
        isOpen:false
    };
    render(){
        return(
            <>
                <tr>
                    {this.state.isOpen &&   
                        <td rowSpan={2}>
                            <button className="btntall" onClick={e =>this.onClose()}>
                                <i className="fa fa-arrow-up"></i>
                            </button>
                        </td>
                    }
                    {!this.state.isOpen &&   
                        <td className="backgroundstart"><div className="btnstart">
                            <button className="btnround" onClick={e =>this.onOpen()}>
                                <i className="fa fa-arrow-down"></i>
                            </button>
                        </div></td>
                    }
                    <td className="backgroundmiddle"><div className="inputstart">
                        <input 
                            className="model"
                            onChange={e=>this.nameChange(e)}
                            onBlur={e =>this.onBlur()}
                            placeholder="name"
                            value={this.state.slot.name}
                            size={this.state.nameSize}
                        />
                    </div></td>
                    <td className="backgroundmiddle">
                        <input 
                            className="model"
                            onChange={e=>this.superChange(e)}
                            onBlur={e =>this.onBlur()}
                            placeholder="super"
                            value={this.state.slot.superName}
                            size={this.state.superSize}
                        />
                    </td>
                    <td className="backgroundmiddle"><div className="inputround">
                        <input 
                            className="model"
                            onChange={e=>this.typeChange(e)}
                            onBlur={e =>this.onBlur()}
                            placeholder= "type"
                            size={this.state.typeSize}
                            value= {this.state.slot.type.value} 
                        />
                    </div></td>
                    <td className="backgroundmiddle">
                        <input 
                            className="model"
                            onChange={e=>this.cardinalityChange(e)}
                            onBlur={e =>this.onBlur()}
                            placeholder="cardinality"
                            size={this.state.cardinalitySize} 
                            value= {this.state.slot.cardinality.value} />
                    </td>
                    <td className="backgroundend">
                        <button className="btnround"><i className="fa fa-ellipsis-h"></i></button>
                    </td>
                </tr>
                {this.state.isOpen &&            
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
                                            onClick={e=>this.onConstraitClickPlus()}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                }
            </>
        );
    }

    onOpen(){
        this.setState({isOpen:true})
    }

    onClose(){
        this.setState({isOpen:false})
    }
        
    typeChange(e){
        this.setState({slot: {type: {value:e.target.value}},typeSize : e.target.value.length> 4? e.target.value.length:4})   
    }

    cardinalityChange(e){
        this.setState({slot: {cardinality: {value:e.target.value}},cardinalitySize : e.target.value.length> 11? e.target.value.length:11})        
    }

    nameChange(e){
        this.setState({slot: {name: e.target.value},nameSize: e.target.value.length> 4? e.target.value.length:4})
    }

    superChange(e){
        this.setState({slot: {super: e.target.value},superSize: e.target.value.length> 4? e.target.value.length:4})
    }
    onBlur(){
        this.props.owner.setSlot(this.state.slot)
    }

    setConstrait(c:Constrait){
        switch(c.id){
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
                let constraits = this.state.slot.customConstraits
                let constrait=constraits.find(item=>item.id===c.id)
                if(constrait){
                    let idx = constraits.indexOf(constrait)
                    constraits[idx]=c
                    this.setState({slot:{customConstraits:constraits}})
                }
                break;
        }
    }
    onConstraitClickPlus(){
        let cc = this.state.slot.customConstraits
        cc.push({id:0, type:"", value:""})
        this.setState({customConstraits:cc})
        this.props.owner.setSlot(this.state.slot)
    }
}