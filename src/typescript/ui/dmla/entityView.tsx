import { Component } from "react";
import { SlotView } from "./slotView";
import React from "react";
import { Entity } from "../../model/data/dmla/Entity";
import { proxy } from "../../network/proxy";
import { Slot } from "../../model/data/dmla/Slot";
import  '../../../css/model.css';

export class EntityView extends Component<{entity:Entity},{}>{

    state = {
        entity: this.props.entity,
        nameSize: this.props.entity.name? this.props.entity.name.length : 4, 
        superSize: this.props.entity.super? this.props.entity.super.length:5
    }

    render(){
        return(
        <table id="entity"><tbody>
            <tr className="spacer">
                {this.state.entity.isOpen&&
                    <td rowSpan={2}>
                        <button className="btntall" onClick={e =>this.onClose()}>
                            <i className="fa fa-arrow-up"></i>
                        </button>
                    </td> 
                }     
                {!this.state.entity.isOpen&&  
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
                        onBlur={e=>this.onBlur()}
                        placeholder="name"
                        value={this.state.entity.name}
                        size={this.state.nameSize}
                    />  
                </div></td>
                <td className="backgroundmiddle">
                    <input 
                        className="model"
                        onChange={e=>this.superChange(e)}
                        onBlur={e=>this.onBlur()}
                        placeholder="super"
                        value={this.state.entity.super}
                        size={this.state.superSize}
                    />
                </td>
                <td className="backgroundmiddle"><div className="btnstart">
                    <button className="btnlong">
                        <i className="fa fa-arrows-alt"></i>
                    </button>
                </div></td>
                {!this.state.entity.isOperationsOpen &&
                    <td className="backgroundend"><div className="btnend">
                        <button className="btnround" onClick={e=>this.onSwitchOptions()}>
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </div></td>
                }
                {this.state.entity.isOperationsOpen && <>
                    <td className="backgroundmiddle"><div className="btnend">
                        <button className="btnround" onClick={e=>this.onSwitchOptions()}>
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </div></td>
                    <td className="backgroundmiddle"><div className="btnstart">
                        <button className="btnround" onClick={e=>this.addEntity()}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div></td>
                    <td className="backgroundend"><div className="btnend">
                        <button className="btnround" onClick={e=>this.deleteEntity()}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div></td>
                </>}
            </tr>
            {this.state.entity.isOpen&& 
                <tr className="spacer">
                    <td colSpan={3}>
                        <table id="slot"><tbody>
                            {this.state.entity.slots.map((slot,index) =>
                                <SlotView key={index} slot={slot} owner={this} />
                            )}
                            <tr className="spacer">
                                <td colSpan={2}>
                                    <button className="btnlong" onClick={e=>this.onSlotClick()}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </td>
                            </tr> 
                        </tbody></table>
                    </td>
                </tr>
            }
        </tbody></table>)
    }
    deleteEntity(): void {
        proxy.sendPacket({
            type:"removeEntityRequest",
            token:proxy.getToken(),
            entityId:this.state.entity.id
        })
    }

    addEntity(): void {
        proxy.sendPacket({
            type:"createEntityRequest",
            token:proxy.getToken(),
            superId:this.state.entity.id
        })
    }

    onSwitchOptions() {
        let entity = this.state.entity
        entity.isOperationsOpen = !entity.isOperationsOpen
        proxy.sendPacket({
            type:"updateEntityRequest",
            token:proxy.getToken(),
            entity:entity
        })
    }

    onOpen(){
        let entity = this.state.entity
        entity.isOpen=true
        proxy.sendPacket({
            type:"updateEntityRequest",
            token:proxy.getToken(),
            entity:entity
        })
    }

    onClose(){
        let entity = this.state.entity
        entity.isOpen=false
        proxy.sendPacket({
            type:"updateEntityRequest",
            token:proxy.getToken(),
            entity:entity
        })
    }
    
    deleteSlot(slot:Slot): void {
        let entity = this.state.entity
        let slots = entity.slots

        slots = slots.filter(item=>item!=slot)
        entity.slots=slots

        proxy.sendPacket(
            {
                type:"updateEntityRequest",
                token: proxy.getToken(),
                entity: entity
            }
        )
    }

    moveSlotUp(slot:Slot): void {
        let entity = this.state.entity
        let slots = entity.slots
        let index = slots.indexOf(slot)

        if(index!==0 && index!==-1){
            let otherSlot=slots[index-1]
            slots[index-1]=slot
            slots[index]=otherSlot
            entity.slots=slots

            proxy.sendPacket(
                {
                    type:"updateEntityRequest",
                    token: proxy.getToken(),
                    entity: entity
                }
            )
        }
    }
    
    moveSlotDown(slot:Slot): void {
        let entity = this.state.entity
        let slots = entity.slots
        let index = slots.indexOf(slot)
        if(index!==slots.length-1 && index!==-1){
            let otherSlot=slots[index+1]
            slots[index+1]=slot
            slots[index]=otherSlot
            entity.slots=slots

            proxy.sendPacket(
                {
                    type:"updateEntityRequest",
                    token: proxy.getToken(),
                    entity: entity
                }
            )
        }
    }

    nameChange(e){
        let entity = this.state.entity
        entity.name=e.target.value
        this.setState({entity: entity,nameSize: e.target.value.length> 4? e.target.value.length:4})
    }

    superChange(e){
        let entity = this.state.entity
        entity.super=e.target.value
        this.setState({entity: entity,superSize: e.target.value.length>4? e.target.value.length:4})
    }

    onBlur(){
        proxy.sendPacket({
            type:"updateEntityRequest",
            token:proxy.getToken(),
            entity:this.state.entity
        })
    }

    setSlot(slot:Slot){
        let entity= this.state.entity
        let slots = entity.slots
        let ix = slots.indexOf(slots.find(item=>item.id===slot.id))
        slots[ix]=slot
        entity.slots=slots
        proxy.sendPacket(
            {
                type:"updateEntityRequest",
                token: proxy.getToken(),
                entity: entity
            }
        )
    }

    onSlotClick(){
        let entity = this.state.entity
        let slots = entity.slots
        slots.push({
            id:-1,
            name:"",
            superId:-1,
            superName:"",
            type:{id:-1,
                type:"type",
                value:"",
                entityId:-1,
                entityName:""},
            cardinality:{id:-1,
                type:"cardinality",
                value:"0..*",
                from:0,
                to:1000,
                toInf:true},
            operationSignature:{id:-1,
                type:"operationSignature",
                value:"()",
                items:[]},
            customConstraits:[],
            values:[]})

        entity.slots=slots

        proxy.sendPacket(
            {
                type:"updateEntityRequest",
                token: proxy.getToken(),
                entity: entity
            }
        )
    }
}