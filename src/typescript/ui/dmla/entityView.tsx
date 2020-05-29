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
        nameSize:4, 
        superSize:4
    }

    render(){
        return(
        <table id="entity">
                <tr>
                    <td rowSpan={3}>
                        <button className="btntall"><i className="fa fa-arrow-up"></i></button>
                    </td>                
                    <td className="backgroundmiddle"><div className="inputstart">
                        <input 
                            className="model"
                            onChange={this.nameChange}
                            onBlur={this.onBlur}
                            placeholder="name"
                            value={this.state.entity.name}
                            size={this.state.nameSize}
                        />  
                    </div></td>
                    <td className="backgroundmiddle">
                        <input 
                            className="model"
                            onChange={this.superChange}
                            onBlur={this.onBlur}
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
                    <td className="backgroundend">
                        <button className="btnround">
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </td>
                </tr>
                {this.state.entity.slots.map(slot =>
                    <SlotView slot={slot} owner={this} />
                )}
                <tr>
                    <td colSpan={2}>
                        <button className="btnlong" onClick={e=>this.onSlotClick}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </td>
                </tr> 
        </table>)
    }

    nameChange(e){
        this.setState({entity: {name:e.target.value},nameSize: e.target.value.length> 4? e.target.value.length:4})
    }

    superChange(e){
        this.setState({entity: {super: e.target.value},superSize: e.target.value.length>4? e.target.value.length:4})
    }

    onBlur(e){
        proxy.sendPacket({
            type:"updateEntityRequest",
            token:proxy.getToken(),
            entity:this.state.entity
        })
    }

    setSlot(slot:Slot){
        this.setState({entity:{slot}})
    }

    onSlotClick(e){
        this.state.entity.slots.push({id:0,
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
                items:null},
            customConstraits:null,
            values:null})
        proxy.sendPacket(
            {
                type:"updateEntityRequest",
                token: proxy.getToken(),
                entity: this.state.entity
            }
        )
    }
}