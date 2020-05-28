import { Component } from "react";

export class ConstraitView extends Component{
    state = {type: "", cardinality: ""};

    render() {
        return (
            <table id="constrait">
                <tr>
                    <td class="startbackground"><div class="inputround">
                        <input oninput="if(this.value.length != 0)
                                                                this.size=this.value.length;
                                                            else
                                                                this.size=this.placeholder.length;"
                            placeholder= "type"
                            size="4" 
                            value= {this.state.type} />
                    </div></td>
                    <td class="middlebackground">
                        <input oninput="if(this.value.length != 0)
                                                                this.size=this.value.length;
                                                            else
                                                                this.size=this.placeholder.length;"
                            placeholder="cardinality"
                            size="11" 
                            value= {this.state.cardinality} />
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