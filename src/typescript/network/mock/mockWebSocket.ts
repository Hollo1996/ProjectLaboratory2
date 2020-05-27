import { EventProducer } from "../eventProducer";
import { IncomingPacket } from "../data/incomingPacket";
import { MockWebSocketEventMap } from "./mockWebSocketEventMap";


export class MockWebSocket extends EventProducer<MockWebSocketEventMap>{
    url : string;
    constructor(url:string){
        super();
        this.url=url;

    }

    send(data:string){

    }

    sendPacket(packet: IncomingPacket) {
        
    }

}