import { Component } from "react";
import { render } from "@testing-library/react";
import React from "react";
import { TreeNode } from "../../model/data/dmla/TreeNode";
import { EntityView } from "./entityView";
import  '../../../css/model.css';
import { proxy } from "../../network/proxy";

export class TreeNodeView extends Component<{treeNode:TreeNode},{}>
{
    state={treeNode:this.props.treeNode}
    /*
    componentDidMount() {
        proxy.addEventListener("entityUpdated", (entity) => {
            if(entity.id=this.state.treeNode.entity.id){
                let treeNode = this.state.treeNode
                treeNode.entity=entity
                this.setState({treeNode:treeNode})
                this.forceUpdate()
            }
        }, this);
        proxy.addEventListener("entityAdded", (entity) => {
            if(entity.superId===this.state.treeNode.entity.id){
                let treeNode = this.state.treeNode
                let children = treeNode.children
                children.push({
                    id:-1,
                    entity:entity,
                    children:[]
                })
                treeNode.children=children
                this.setState({treeNode:treeNode})
            }
        }, this);

        proxy.addEventListener("entityRemoved", (entityId) => {
            let treeNode = this.state.treeNode
            let children = treeNode.children
            let child = children.find(item=>item.entity.id==entityId)
            if(child){
                let filtered= children.filter(item=>item!==child)
                treeNode.children=filtered
                this.setState({treeNode:treeNode})
            }
        }, this);
    }

    componentWillUnmount() {
        proxy.removeAllEventListener(this);
    }
*/

    render(){
        return(
            <table id="fa">
                <tr>
                    <td>
                        <EntityView entity={this.state.treeNode.entity}/>
                    </td>
                </tr>
                <tr>
                    {this.state.treeNode.children.map(item =>
                        <td>
                            <TreeNodeView treeNode={item}/>
                        </td>
                    )}
                </tr>
            </table>
        )
    }
}