import { EventProducer } from "./eventProducer";
import { ProxyEventMap } from "./proxyEventMap";
//import { InboxDto } from "./data/inboxDto";
import { IncomingPacket } from "./data/incomingPacket";
import { OutgoingPacket } from "./data/outgoingPacket";
import { MockWebSocket } from "./mock/mockWebSocket";

class Proxy extends EventProducer<ProxyEventMap>
{
    //mock websocket
    private ws: MockWebSocket;
    

    constructor() {
        super();
        //add mock websocket
        this.ws = new MockWebSocket("wss://raja.aut.bme.hu/chat/");
        this.token="";
        
        this.ws.addEventListener("message", (e) => {
            let p = JSON.parse(e) as IncomingPacket;
            switch (p.type) {
                case "error":
                    alert(p.message);
                    break;
                case "login":
                    this.token = p.token
                    this.dispatch("login");
                    break;
                case "modelList":
                    this.dispatch("modelListed",p.models);
                    break;
                case "modelAdded":
                    this.dispatch("modelAdded",p.model);
                    break;
                case "modelUpdated":
                    this.dispatch("modelUpdated",p.model);
                    break;
                case "modelRemoved":
                    this.dispatch("modelRemoved",p.modelId);
                    break;
                case "modelDetail":
                    this.dispatch("modelDetail",p.model);
                    break;
                case "wholeModelUpdated":
                    this.dispatch("wholeModelUpdated",p.model);
                    break;
                /*
                case "entityAdded":
                    this.dispatch("entityAdded",p.entity);
                    break;
                case "entityUpdated":
                    this.dispatch("entityUpdated",p.entity);
                    break;
                case "entityRemoved":
                    this.dispatch("entityRemoved",p.entityId);
                    break;
                    */
            }
        },this);
    }

    //Adding mock
    //generating events
    private token:string;

    getToken(){
        return this.token;
    }

    sendPacket(packet: OutgoingPacket) {
        this.ws.send(JSON.stringify(packet));
    }
}

export var proxy = new Proxy();