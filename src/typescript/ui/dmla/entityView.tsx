import { Component } from "react";
import { SlotView } from "./slotView";
import React from "react";
import { Entity } from "../../model/data/dmla/Entity";
import { proxy } from "../../network/proxy";
import { Slot } from "../../model/data/dmla/Slot";

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
                    <td className="btntall" rowSpan={3}>
                        <button className="btntall"><i className="fa fa-arrow-up"></i></button>
                    </td>                
                    <td className="middlebackground"><div className="inputstart">
                        <input 
                            onInput={this.nameChange}
                            onBlur={this.onBlur}
                            placeholder="name"
                            value={this.state.entity.name}
                            size={this.state.nameSize}
                        />  
                    </div></td>
                    <td className="middlebackground">
                        <input 
                            onInput={this.superChange}
                            onBlur={this.onBlur}
                            placeholder="super"
                            value={this.state.entity.super}
                            size={this.state.superSize}
                        />
                    </td>
                    <td className="middlebackground"><div className="btnstart">
                        <button className="btnlong">
                            <i className="fa fa-arrows-alt"></i>
                        </button>
                    </div></td>
                    <td className="endbackground">
                        <button className="btn">
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </td>
                </tr>
                {this.state.entity.slots.map(slot =>
                    <SlotView slot={slot} owner={this} />
                )} 
        </table>)
    }

    nameChange(e){
        this.setState({entity: {name:e.target.value},nameSize: e.target.value.size})
    }

    superChange(e){
        this.setState({entity: {super: e.target.value},superSize: e.target.value.size})
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
}