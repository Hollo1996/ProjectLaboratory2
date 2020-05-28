import { Component } from "react";
import React from "react";

export class ConstraitView extends Component{
    state = {type: "", cardinality: "", typeSize: 4, cardinalitySize: 11};

    render() {
        return (
            <table id="constrait">
                <tr>
                    <td className="startbackground"><div className="inputround">
                        <input onInput={this.typeChange}
                            placeholder= "type"
                            size={this.state.typeSize}
                            value= {this.state.type} />
                    </div></td>
                    <td className="middlebackground">
                        <input onInput={this.typeChange}
                            placeholder="cardinality"
                            size={this.state.cardinalitySize} 
                            value= {this.state.cardinality} />
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
        this.setState({typeSize : e.value.size})   
    }

    cardinalityChange(e){
        this.setState({cardinalitySize : e.value.size})        
    }
}