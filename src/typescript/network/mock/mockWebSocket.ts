import { EventProducer } from "../eventProducer";
import { IncomingPacket } from "../data/incomingPacket";
import { MockWebSocketEventMap } from "./mockWebSocketEventMap";
import { OutgoingPacket } from "../data/outgoingPacket";
import { UserDto } from "../../model/data/auth/userDto";
import { Model } from "../../model/data/dmla/Model";
import { Entity } from "../../model/data/dmla/Entity";
import { TreeNode } from "../../model/data/dmla/TreeNode";


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
        let p = JSON.parse(data) as OutgoingPacket;
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
                if(value===token)
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
        let index = this.users.findIndex(item => item.email===email && item.password===password)
        if(index===-1)
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

        let index = this.users.findIndex(item=> item.staySignedIn&&item.lastToken===token)
        
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
                models:this.models[user.id].map(item => {
                    let model = {
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
                    return model
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
                                superName:"Children",
                                type:{id:this.idCounter+5,timeStamp:"",entityId:this.idCounter+3,entityName:"ComplexEntity",value:"ComplexEntity",type:"type"},
                                cardinality:{id:this.idCounter+6,timeStamp:"",from:0,to:100,toInf:true,value:"0..*",type:"cardinality"},
                                operationSignature:{id:this.idCounter+7,timeStamp:"",items:[],value:"()",type:"operationSignature"},
                                customConstraits:[],
                                values:[],
                                isOpen:true,
                                isOperationsOpen:false
                            }
                        ],
                        isOpen:true,
                        isOperationsOpen:false
                    },
                    children:[]
                }
            }

            this.models[user.id].push(model)

            this.idCounter+=7

            this.modelListRequest(token)
        }
    }
    modelMetaUpdateRequest(token: string, model: Model) {
        let user = this.token2logedInUser(token)
        if(user){
            let models = this.models[user.id];
            let oldModel=models.find(item=>item.id===model.id);
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

                this.modelListRequest(token)
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
                let model=models.find(item=>item.id===modelId);
                if(!model){
                    this.sendPacket({
                        type:"error",
                        message:"No model maches update model id!"
                    })
                }
                else{
                    this.models[user.id]=models.filter(item=>item!==model)
                    
                    this.modelListRequest(token)
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
                let model=models.find(item=>item.id===modelId);
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
            if(node.entity.id===entityId){
                nodeResult = node;
            }
            else{
                let nodeTmp = this.findNodeByEntityId(entityId,node.children)
                if(nodeTmp)
                    nodeResult=nodeTmp
            }
        })
        return nodeResult

    }

    findModelByEntityId(entityId: number, models: Model[]){
        let modelResult :Model|undefined;
        models.forEach( model=>{
            let node = this.findNodeByEntityId(entityId,[model.root])
            if(node){
                modelResult = model;
            }
        })
        return modelResult

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
                        entity:{
                            id:this.idCounter+2,
                            name:"",
                            superId:superId,
                            super:node.entity.name,
                            slots:[],
                            isOpen:true,
                            isOperationsOpen:false
                        },
                        children:[]
                    }
                    
                    this.idCounter+=2

                    node.children.push(newNode)

                    let model = this.findModelByEntityId(superId,models)
                    if(model)
                        this.sendPacket({
                            type:"wholeModelUpdated",
                            model:model
                        })
                    /*
                    this.sendPacket({
                        type:"entityAdded",
                        entity:newNode.entity
                    })
                    */
                }
            }
        }
    }

    updateEntityRequest(token: string, entity: Entity) {

        entity.slots.forEach(slot=>{
            if(slot.id===-1){
                slot.id=this.idCounter+1
                this.idCounter+=1
            }
            if(slot.cardinality.id===-1){
                slot.cardinality.id=this.idCounter+1
                this.idCounter+=1
            }
            if(slot.type.id===-1){
                slot.type.id=this.idCounter+1
                this.idCounter+=1
            }
            if(slot.operationSignature.id===-1){
                slot.operationSignature.id=this.idCounter+1
                this.idCounter+=1
            }
            slot.customConstraits.forEach(constrait=>{
                if(constrait.id===-1){
                    constrait.id=this.idCounter+1
                    this.idCounter+=1
                }
            })
        })

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
                    node.entity=entity

                    let model = this.findModelByEntityId(entity.id,models)
                    if(model)
                        this.sendPacket({
                            type:"wholeModelUpdated",
                            model:model
                        })
                        /*
                    this.sendPacket({
                        type:"entityUpdated",
                        entity:entity
                    })*/
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
                    let model = this.findModelByEntityId(entityId,models)
                    let superNode = this.findNodeByEntityId(node.entity.superId,models.map(item=>item.root))
                    if(!superNode){
                        this.sendPacket({
                            type:"error",
                            message:"No node found with the super of entity!"
                        })
                    }
                    else{
                        superNode.children=superNode.children.filter(item=>item!==node)
                    }
                    if(model)
                        this.sendPacket({
                            type:"wholeModelUpdated",
                            model:model
                        })
                    /*
                    this.sendPacket({
                        type:"entityRemoved",
                        entityId:entityId
                    })*/
                }
            }
        }
    }

    sendPacket(packet: IncomingPacket) {
        this.dispatch("message",JSON.stringify(packet))
    }

}