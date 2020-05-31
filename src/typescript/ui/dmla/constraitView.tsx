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
            <tr className="spacer">
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
                {!this.state.constrait.isOperationsOpen &&
                    <td><table id="modelmenu"><tr>
                        <td className="backgroundend">
                            <button className="btnround" onClick={e=>this.onSwitchOptions()}>
                                <i className="fa fa-ellipsis-h"></i>
                            </button>
                        </td>
                        <td className="spacer"></td>
                    </tr></table></td>
                }
                {this.state.constrait.isOperationsOpen && <>
                    <td className="backgroundend"><table id="modelmenu"><tr>
                        <td>
                            <button className="btnround" onClick={e=>this.onSwitchOptions()}>
                                <i className="fa fa-ellipsis-h"></i>
                            </button>
                        </td>
                        <td><div className="btnstart">
                            <button className="btnround" onClick={e=>this.moveConstraitUp()}>
                                <i className="fa fa-arrow-up"></i>
                            </button>
                        </div></td>
                        <td><div className="btnmiddle">
                            <button className="btnround" onClick={e=>this.moveConstraitDown()}>
                                <i className="fa fa-arrow-down"></i>
                            </button>
                        </div></td>
                        <td><div className="btnend">
                            <button className="btnround" onClick={e=>this.deleteConstrait()}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div></td>
                    </tr></table></td>
                </>}
            </tr>
        );
    }

    deleteConstrait(): void {
        this.props.owner.deleteConstrait(this.state.constrait)
    }

    moveConstraitUp(): void {
        this.props.owner.moveConstraitUp(this.state.constrait)
    }

    moveConstraitDown(): void {
        this.props.owner.moveConstraitDown(this.state.constrait)
    }

    onSwitchOptions() {
        let constrait = this.state.constrait
        constrait.isOperationsOpen = !constrait.isOperationsOpen
        this.props.owner.setConstrait(constrait)
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
