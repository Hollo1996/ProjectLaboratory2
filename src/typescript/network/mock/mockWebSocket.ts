import { EventProducer } from "../eventProducer";
import { IncomingPacket } from "../data/incomingPacket";
import { MockWebSocketEventMap } from "./mockWebSocketEventMap";
import { OutgoingPacket } from "../data/outgoingPacket";
import { UserDto } from "../../model/data/auth/userDto";


export class MockWebSocket extends EventProducer<MockWebSocketEventMap>{

    url : string;
    users: UserDto[] = [];
    
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

    }

    loginWithToken(token: string){

    }

    register(email: string, password: string, displayName: string, staySignedIn: boolean){

    }

    sendPacket(packet: IncomingPacket) {
        
    }

}