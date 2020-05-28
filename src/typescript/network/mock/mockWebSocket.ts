import { EventProducer } from "../eventProducer";
import { IncomingPacket } from "../data/incomingPacket";
import { MockWebSocketEventMap } from "./mockWebSocketEventMap";
import { OutgoingPacket } from "../data/outgoingPacket";
import { UserDto } from "../../model/data/auth/userDto";
import { Model } from "../../model/data/dmla/Model";
import { Entity } from "../../model/data/dmla/Entity";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { TreeNode } from "../../model/data/dmla/TreeNode";
import { timingSafeEqual } from "crypto";


export class MockWebSocket extends EventProducer<MockWebSocketEventMap>{

    idCounter=0;
    url : string;
    users: UserDto[] = [];
    logins = new Map<string,string>();
    models = new Map<string,Model[]>();
    
    constructor(url:string){
        super();
        this.url=url;

    }

    send(data:string){
        let p = <OutgoingPacket>JSON.parse(data);
        switch (p.type) {
            case "login":
                this.login(p.email,p.password,p.staySignedIn);
                break;
            case "loginWithToken":
                this.loginWithToken(p.token);
                break;
            case "register":
                this.register(p.email,p.password,p.displayName,p.staySignedIn)
                break;
            case "modelListRequest":
                this.modelListRequest(p.token)
                break;
            case "modelCreateRequest":
                this.modelCreateRequest(p.token)
                break;
            case "modelMetaUpdateRequest":
                this.modelMetaUpdateRequest(p.token,p.model)
                break;
            case "modelRemoveRequest":
                this.modelRemoveRequest(p.token,p.modelId)
                break;
            case "modelDetailsRequest":
                this.modelDetailsRequest(p.token,p.modelId)
                break;
            case "createEntityRequest":
                this.createEntityRequest(p.token,p.superId)
                break;
            case "updateEntityRequest":
                this.updateEntityRequest(p.token,p.entity)
                break;
            case "removeEntityRequest":
                this.removeEntityRequest(p.token,p.entityId)
                break;
        }
    }

    token2logedInUser(token:string){
        let user:UserDto|undefined;
        this.logins.forEach((value,key) =>
            {
                if(value==token)
                    user = this.users.find(it=>it.id===key)
            }
        )
        if(!user)
            this.sendPacket({
                type:"error",
                message:"Unknown token!"
            })
        return user
    }

    login(email: string, password: string, staySignedIn: boolean){
        let index = this.users.findIndex(item => item.email==email && item.password==password)
        if(index==-1)
            this.sendPacket({
                type:"error",
                message:"Wrong email or password!"
            })
        else{  
        let token = Math.random().toString()
        this.users[index].lastToken=token
        this.users[index].staySignedIn=staySignedIn
        this.logins.set(this.users[index].id,token)
        this.sendPacket({
            type:"login",
            token:token
        })
        }
    }

    loginWithToken(token: string){
        let found = false

        let index = this.users.findIndex(item=> item.staySignedIn&&item.lastToken==token)
        
        if(!found){
            this.sendPacket({
                type:"error",
                message:"User is not loged in!"
            })
        }
        else{  
            let token = Math.random().toString()
            this.users[index].lastToken=token
            this.logins[this.users[index].id]=token
            this.sendPacket({
                type:"login",
                token:token
            })
        }
    }

    register(email: string, password: string, displayName: string, staySignedIn: boolean){
        let user = {
            id:(this.idCounter+1).toString(),
            displayName:displayName,
            email:email,
            password:password,
            staySignedIn:staySignedIn,
            lastToken:""
        }
        this.idCounter+=1
        this.users.push(user)

        this.models[user.id]=[];

        this.sendPacket({
            type:"user",
            user:this.users[this.users.length-1]
        })
    }
    
    modelListRequest(token: string) {
        let user = this.token2logedInUser(token)
        if(user)
            this.sendPacket({
                type:"modelList",
                models:this.models[user.id].map(item=>{
                        let model ={
                            id:item.id,
                            name:item.name,
                            superId:item.superId,
                            super:item.super,
                            root:{
                                id:item.root.id,
                                entity:item.root.entity,
                                children:[]
                            }
                        }
                    })
            })
    }
    modelCreateRequest(token: string) {
        let user = this.token2logedInUser(token)
        if(user){
            let model:Model={
                id:this.idCounter+1,
                name:"",
                superId:-1,
                super:"",
                root:{
                    id:this.idCounter+2,
                    entity:{
                        id:this.idCounter+3,
                        name:"ComplexEntity",
                        superId:this.idCounter+2,
                        super:"ComplexEntity",
                        slots:[
                            {
                                id:this.idCounter+4,
                                name:"Children",
                                superId:this.idCounter+4,
                                super:"Children",
                                type:{id:this.idCounter+5,timeStamp:"",entityId:this.idCounter+3,entityName:"ComplexEntity"},
                                cardinality:{id:this.idCounter+6,timeStamp:"",from:0,to:100,toInf:true},
                                operationSignature:{id:this.idCounter+7,timeStamp:"",items:[]},
                                customConstraits:[],
                                values:[]
                            }
                        ]
                    },
                    children:[]
                }
            }

            this.idCounter+=7

            this.sendPacket({
                type:"modelAdded",
                model:model
            })
        }
    }
    modelMetaUpdateRequest(token: string, model: Model) {
        let user = this.token2logedInUser(token)
        if(user){
            let models = this.models[user.id];
            let oldModel:Model=models.find(item=>item.id==model.id);
            if(!oldModel){
                this.sendPacket({
                    type:"error",
                    message:"No model maches update model id!"
                })
            }
            else{

                oldModel.name=model.name;
                oldModel.super=model.super;
                oldModel.superId=model.superId;

                this.sendPacket({
                    type:"modelUpdated",
                    model:oldModel
                })
            }
        }
    }
    modelRemoveRequest(token: string, modelId: number) {
        let user = this.token2logedInUser(token)
        if(user){
            let models:Model[] = this.models[user.id];
            if(!models){
                this.sendPacket({
                    type:"error",
                    message:"No model array maches user id!"
                })
            }
            else{
                let model=models.find(item=>item.id==modelId);
                if(!model){
                    this.sendPacket({
                        type:"error",
                        message:"No model maches update model id!"
                    })
                }
                else{
                    this.models[user.id]=models.filter(item=>item!=model)
                    this.sendPacket({
                        type:"modelRemoved",
                        modelId:modelId
                    })
                }
            }
        }
    }
    modelDetailsRequest(token: string, modelId: number) {
        let user = this.token2logedInUser(token)
        if(user){
            let models:Model[] = this.models[user.id];
            if(!models){
                this.sendPacket({
                    type:"error",
                    message:"No model array maches user id!"
                })
            }
            else{
                let model=models.find(item=>item.id==modelId);
                if(!model){
                    this.sendPacket({
                        type:"error",
                        message:"No model maches update model id!"
                    })
                }
                else{
                    this.sendPacket({
                        type:"modelDetail",
                        model:model
                    })
                }
            }
        }
    }

    findNodeByEntityId(entityId: number, nodes: TreeNode[]){
        let nodeResult :TreeNode|undefined;
        nodes.forEach( node=>{
            if(node.data.id===entityId){
                nodeResult = node;
            }
            else{
                nodeResult = this.findNodeByEntityId(entityId,node.children)
            }
        })
        return nodeResult

    }

    createEntityRequest(token: string, superId: number) {
        let user = this.token2logedInUser(token);
        if(user){
            let models:Model[] = this.models[user.id];
            if(!models){
                this.sendPacket({
                    type:"error",
                    message:"No model array maches user id!"
                })
            }
            else{
                let node = this.findNodeByEntityId(superId,models.map(item=>item.root))
                if(!node){
                    this.sendPacket({
                        type:"error",
                        message:"No node found with entity of given id!"
                    })
                }
                else{
                    let newNode={
                        id:this.idCounter+1,
                        data:{
                            id:this.idCounter+2,
                            name:"",
                            superId:superId,
                            super:node.data.name,
                            slots:[]
                        },
                        children:[]
                    }
                    
                    id:this.idCounter+=2

                    node.children.push(newNode)

                    this.sendPacket({
                        type:"entityAdded",
                        entity:newNode.data
                    })
                }
            }
        }
    }

    updateEntityRequest(token: string, entity: Entity) {
        let user = this.token2logedInUser(token);
        if(user){
            let models:Model[] = this.models[user.id];
            if(!models){
                this.sendPacket({
                    type:"error",
                    message:"No model array maches user id!"
                })
            }
            else{
                let node = this.findNodeByEntityId(entity.id,models.map(item=>item.root))
                if(!node){
                    this.sendPacket({
                        type:"error",
                        message:"No node found with entity of given id!"
                    })
                }
                else{
                    node.data=entity

                    this.sendPacket({
                        type:"entityAdded",
                        entity:entity
                    })
                }
            }
        }
    }
    removeEntityRequest(token: string, entityId: number) {
        let user = this.token2logedInUser(token);
        if(user){
            let models:Model[] = this.models[user.id];
            if(!models){
                this.sendPacket({
                    type:"error",
                    message:"No model array maches user id!"
                })
            }
            else{
                let node = this.findNodeByEntityId(entityId,models.map(item=>item.root))
                if(!node){
                    this.sendPacket({
                        type:"error",
                        message:"No node found with entity of given id!"
                    })
                }
                else{
                    let superNode = this.findNodeByEntityId(entityId,models.map(item=>item.root))
                    if(!superNode){
                        this.sendPacket({
                            type:"error",
                            message:"No node found with the super of entity!"
                        })
                    }
                    else{
                        superNode.children=superNode.children.filter(item=>item!=node)
                    }

                    this.sendPacket({
                        type:"entityRemoved",
                        entityId:entityId
                    })
                }
            }
        }
    }

    sendPacket(packet: IncomingPacket) {
        this.dispatch("message",JSON.stringify(packet))
    }

}