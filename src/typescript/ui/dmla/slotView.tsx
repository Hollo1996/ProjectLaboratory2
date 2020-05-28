import { Component } from "react";
import { ConstraitView } from "./constraitView";

export class SlotView extends Component{
    state={name:"", type:"", super:"", cardinality:"", opened:false};

    render(){
        return(
            
            <table id="slot">
            <tr>
                <td class="btntall" rowspan="2">
                    <button class="btntall">
                        <i class="fa fa-arrow-up"></i>
                    </button>
                </td>
                <td class="middlebackground"><div class="inputstart">
                    <input oninput="if(this.value.length != 0)
                                        this.size=this.value.length;
                                    else
                                        this.size=this.placeholder.length;" 
                    placeholder="name"
                    value={this.state.name}
                    size="4"/>
                </div></td>
                <td class="middlebackground">
                    <input oninput="if(this.value.length != 0)
                                        this.size=this.value.length;
                                    else
                                        this.size=this.placeholder.length;" 
                    placeholder="super"
                    value={this.state.super}
                    size="5"/>
                </td>
                <td class="middlebackground"><div class="inputround">
                    <input oninput="if(this.value.length != 0)
                                        this.size=this.value.length;
                                    else
                                        this.size=this.placeholder.length;" 
                    placeholder="type"
                    value={this.state.type}
                    size="4"/>
                </div></td>
                <td class="middlebackground">
                    <input oninput="if(this.value.length != 0)
                                        this.size=this.value.length;
                                    else
                                        this.size=this.placeholder.length;" 
                    placeholder="cardinality"
                    value={this.state.cardinality}
                    size="11"/>
                </td>
                <td class="endbackground">
                    <button class="btn"><i class="fa fa-ellipsis-h"></i></button>
                </td>
            </tr>
            <tr>
                <td colspan="4">

                <table id="constrait">
                    <tr>
                        <ConstraitView>
                            
                        </ConstraitView>
                        
                        
                        
                        
                        <td class="startbackground"><div class="inputround">
                            <input oninput="if(this.value.length != 0)
                                                this.size=this.value.length;
                                            else
                                                this.size=this.placeholder.length;" 
                            placeholder="type"
                            size="4"/>
                        </div></td>
                        <td class="middlebackground">
                            <input oninput="if(this.value.length != 0)
                                                this.size=this.value.length;
                                            else
                                                this.size=this.placeholder.length;" 
                            placeholder="cardinality"
                            size="11"/>
                        </td>
                        <td class="endbackground">
                            <button class="btn">
                                <i class="fa fa-ellipsis-h"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button style="width:100%" class="btnlong">
                                <i class="fa fa-plus"></i>
                            </button>
                        </td>
                    </tr>
                </table>

        );
    }
}