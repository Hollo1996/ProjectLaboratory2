import { Component } from "react";
import { ConstraitView } from "./constraitView";
import React from "react";
import { Slot } from "../../model/data/dmla/Slot";
import { EntityView } from "./entityView";
import { Constrait } from "../../model/data/dmla/Constrait";
import { Cardinality } from "../../model/data/dmla/constrait/Cardinality";
import { OperationSignature } from "../../model/data/dmla/constrait/OperationSigniture";
import  '../../../css/model.css';
import { proxy } from "../../network/proxy";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

export class SlotView extends Component<{owner:EntityView,slot:Slot},{}>{
    state = {
        slot: this.props.slot, 
        typeSize: this.props.slot.type? this.props.slot.type.value.length : 4, 
        cardinalitySize: this.props.slot.cardinality.value? this.props.slot.cardinality.value.length : 11,
        nameSize:this.props.slot.name? this.props.slot.name.length : 4, 
        superSize:this.props.slot.superName? this.props.slot.superName.length : 4,
    };
    render(){
        return(
            <>
                <tr className="spacer">
                    {this.state.slot.isOpen &&   
                        <td rowSpan={2}>
                            <button className="btntall" onClick={e =>this.onClose()}>
                                <i className="fa fa-arrow-up"></i>
                            </button>
                        </td>
                    }
                    {!this.state.slot.isOpen &&   
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
                {!this.state.slot.isOperationsOpen &&
                    <td className="backgroundend">
                        <button className="btnround" onClick={e=>this.onSwitchOptions()}>
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </td>
                }
                {this.state.slot.isOperationsOpen && <>
                    <td className="backgroundmiddle">
                        <button className="btnround" onClick={e=>this.onSwitchOptions()}>
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </td>
                    <td className="backgroundmiddle"><div className="btnstart">
                        <button className="btnround" onClick={e=>this.moveSlotUp()}>
                            <i className="fa fa-arrow-up"></i>
                        </button>
                    </div></td>
                    <td className="backgroundmiddle"><div className="btnmiddle">
                        <button className="btnround" onClick={e=>this.moveSlotDown()}>
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div></td>
                    <td className="backgroundend"><div className="btnend">
                        <button className="btnround" onClick={e=>this.deleteSlot()}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div></td>
                </>}
                </tr>
                {this.state.slot.isOpen &&            
                    <tr className="spacer">
                        <td colSpan={4}>
                            <table id="constrait"><tbody>
                                <ConstraitView 
                                    constrait={this.state.slot.type} 
                                    owner={this}
                                />
                                <ConstraitView 
                                    constrait={this.state.slot.cardinality} 
                                    owner={this}
                                />
                                {this.state.slot.customConstraits.map((constrait,index) =>
                                    <ConstraitView key="index" constrait={constrait} owner={this} />
                                )}   
                                <tr className="spacer">
                                    <td>
                                        <button 
                                            className="btnlong"
                                            onClick={e=>this.onConstraitClickPlus()}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                }
            </>
        );
    }

    deleteSlot(): void {
        this.props.owner.deleteSlot(this.state.slot)
    }

    moveSlotUp(): void {
        this.props.owner.moveSlotUp(this.state.slot)
    }

    moveSlotDown(): void {
        this.props.owner.moveSlotDown(this.state.slot)
    }

    onSwitchOptions() {
        let slot = this.state.slot
        slot.isOperationsOpen = !slot.isOperationsOpen
        this.props.owner.setSlot(slot)
    }

    deleteConstrait(constrait: Constrait) {
        let slot = this.state.slot
        let constraits = slot.customConstraits

        constraits = constraits.filter(item=>item!=constrait)
        slot.customConstraits=constraits
        this.props.owner.setSlot(slot)
    }

    moveConstraitUp(constrait: Constrait) {
        let slot = this.state.slot
        let constraits = slot.customConstraits
        let index = constraits.indexOf(constrait)

        if(index!==0 && index!==-1){
            let otherConstrait=constraits[index-1]
            constraits[index-1]=constrait
            constraits[index]=otherConstrait
            slot.customConstraits=constraits

            this.props.owner.setSlot(slot)
        }
    }

    moveConstraitDown(constrait: Constrait) {
        let slot = this.state.slot
        let constraits = slot.customConstraits
        let index = constraits.indexOf(constrait)
        if(index!==constraits.length-1 && index!==-1){
            let otherConstrait=constraits[index+1]
            constraits[index+1]=constrait
            constraits[index]=otherConstrait
            slot.customConstraits=constraits
            this.props.owner.setSlot(slot)  
        }
    }

    onOpen(){
        let slot = this.state.slot
        slot.isOpen=true
        this.props.owner.setSlot(slot)
    }

    onClose(){
        let slot = this.state.slot
        slot.isOpen=false
        this.props.owner.setSlot(slot)
    }
        
    typeChange(e){
        let slot = this.state.slot
        let type = slot.type
        type.value = e.target.value
        slot.type = type
        this.setState({slot: slot ,typeSize : e.target.value.length> 4? e.target.value.length:4})   
    }

    cardinalityChange(e){
        let slot = this.state.slot
        let cardinality = slot.cardinality
        cardinality.value = e.target.value
        slot.cardinality = cardinality
        this.setState({slot: slot,cardinalitySize : e.target.value.length> 11? e.target.value.length:11})        
    }

    nameChange(e){
        let slot = this.state.slot
        slot.name = e.target.value
        this.setState({slot: slot,nameSize: e.target.value.length> 4? e.target.value.length:4})
    }

    superChange(e){
        let slot = this.state.slot
        slot.superName = e.target.value
        this.setState({slot: slot,superSize: e.target.value.length> 4? e.target.value.length:4})
    }
    onBlur(){
        this.props.owner.setSlot(this.state.slot)
    }

    setConstrait(c:Constrait){
        let slot = this.state.slot
        switch(c.type){
            case "type":
                break;
            case "cardinality":
                slot.cardinality = c as Cardinality
                break;
            case "operationSignature":
                slot.operationSignature = c as OperationSignature
                break;
            default:
                let constraits = slot.customConstraits
                let constrait=constraits.find(item=>item.id===c.id)
                if(constrait){
                    let idx = constraits.indexOf(constrait)
                    constraits[idx]=c
                    slot.customConstraits=constraits
                }
                break;
        }
        this.forceUpdate()
        this.props.owner.setSlot(slot)
    }

    onConstraitClickPlus(){
        let slot = this.state.slot
        let cc = slot.customConstraits
        cc.push({id:-1, type:"", value:""})
        slot.customConstraits = cc
        this.props.owner.setSlot(this.state.slot)
        this.forceUpdate()
    }
}