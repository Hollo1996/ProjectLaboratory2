import { Component } from "react";
import React from "react";
import { TreeNode } from "../../model/data/dmla/TreeNode";
import { EntityView } from "./entityView";
import  '../../../css/model.css';

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
                <tbody>
                    <tr>
                        <td colSpan={1}>
                            <EntityView entity={this.state.treeNode.entity}/>
                        </td>
                        <td className="spacer" colSpan={this.state.treeNode.children.length}></td>
                    </tr>
                    <tr className="spacer">
                        {this.state.treeNode.children.map((item,index) =>
                            <td key={index}>
                                <TreeNodeView treeNode={item}/>
                            </td>
                        )}
                        <td className="spacer"></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}