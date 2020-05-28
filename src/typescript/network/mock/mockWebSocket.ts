import { EventProducer } from "../eventProducer";
import { IncomingPacket } from "../data/incomingPacket";
import { MockWebSocketEventMap } from "./mockWebSocketEventMap";
import { OutgoingPacket } from "../data/outgoingPacket";
import { UserDto } from "../../model/data/auth/userDto";


export class MockWebSocket extends EventProducer<MockWebSocketEventMap>{

    url : string;
    users: UserDto[] = [];
    logins = new Map<string,string>();
    
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
        }
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
        this.logins[JSON.stringify(this.users[index])]=token
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
            this.logins[JSON.stringify(this.users[index])]=token
            this.sendPacket({
                type:"login",
                token:token
            })
        }
    }

    register(email: string, password: string, displayName: string, staySignedIn: boolean){
        this.users.push({
            id:this.users[this.users.length-1].id+1,
            displayName:displayName,
            email:email,
            password:password,
            staySignedIn:staySignedIn,
            lastToken:""
        })

        this.sendPacket({
            type:"user",
            user:this.users[this.users.length-1]
        })
    }

    sendPacket(packet: IncomingPacket) {
        this.dispatch("message",JSON.stringify(packet))
    }

}