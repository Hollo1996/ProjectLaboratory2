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
        superSize: this.props.entity.super? this.props.entity.super.length:5,
        isOpen:false
    }

    render(){
        return(
        <table id="entity">
                <tr>
                    {this.state.isOpen&&
                        <td rowSpan={2}>
                            <button className="btntall" onClick={e =>this.onClose()}>
                                <i className="fa fa-arrow-up"></i>
                            </button>
                        </td> 
                    }     
                    {!this.state.isOpen&&  
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
                    <td className="backgroundend"><div className="btnend">
                        <button className="btnround">
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </div></td>
                </tr>
                {this.state.isOpen&& 
                    <tr>
                        <td colSpan={3}>
                            <table id="slot">
                                {this.state.entity.slots.map(slot =>
                                    <SlotView slot={slot} owner={this} />
                                )}
                                <tr>
                                    <td colSpan={2}>
                                        <button className="btnlong" onClick={e=>this.onSlotClick()}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </td>
                                </tr> 
                            </table>
                        </td>
                    </tr>
                }
        </table>)
    }

    onOpen(){
        this.setState({isOpen:true})
    }

    onClose(){
        this.setState({isOpen:false})
    }

    nameChange(e){
        this.setState({entity: {name:e.target.value},nameSize: e.target.value.length> 4? e.target.value.length:4})
    }

    superChange(e){
        this.setState({entity: {super: e.target.value},superSize: e.target.value.length>4? e.target.value.length:4})
    }

    onBlur(){
        proxy.sendPacket({
            type:"updateEntityRequest",
            token:proxy.getToken(),
            entity:this.state.entity
        })
    }

    setSlot(slot:Slot){
        let slots = this.state.entity.slots
        let ix = slots.indexOf(slots.find(item=>item.id===slot.id))
        slots[ix]=slots
        this.setState({entity:{slots:slots}})
    }

    onSlotClick(){
        let slots = this.state.entity.slots
        slots.push({id:0,
            name:"",
            superId:0,
            superName:"",
            type:{id:0,
                name:"",
                value:"",
                entityId:0,
                entityName:""},
            cardinality:{id:0,
                name:"",
                value:"",
                from:0,
                to:0,
                toInf:false},
            operationSignature:{id:0,
                name:"",
                value:"",
                items:[]},
            customConstraits:[],
            values:[]})

        this.setState({entity:{slots:slots}})

        proxy.sendPacket(
            {
                type:"updateEntityRequest",
                token: proxy.getToken(),
                entity: this.state.entity
            }
        )
    }
}