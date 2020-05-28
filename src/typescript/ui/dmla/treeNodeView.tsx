import { Component } from "react";
import { render } from "@testing-library/react";
import React from "react";
import { TreeNode } from "../../model/data/dmla/TreeNode";
import { EntityView } from "./entityView";

export class TreeNodeView extends Component<{treeNode:TreeNode},{}>
{
    state={treeNode:this.props.treeNode}
    render(){
        return(
            <table id="fa">
                <tr>
                    <td>
                        <EntityView entity={this.state.treeNode.data}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        {this.state.treeNode.children.map(item =>
                            <TreeNodeView treeNode={item}/>
                        )}
                    </td>
                </tr>
            </table>
        )
    }
}