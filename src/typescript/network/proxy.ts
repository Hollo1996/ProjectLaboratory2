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
    //inbox: InboxDto | null = null;

    constructor() {
        super();
        //add mock websocket
        this.ws = new MockWebSocket("wss://raja.aut.bme.hu/chat/");
        //this.ws.addEventListener("open", () => {});
        
        this.ws.addEventListener("message", (e) => {
            let p = <IncomingPacket>JSON.parse(e.data);
            switch (p.type) {
                case "error":
                    alert(p.message);
                    break;
                case "login":
                    //this.inbox = p.inbox;
                    this.dispatch("login");
                    break;
                /*case "message":
                    let cid = p.channelId;
                    this.inbox!.conversations.find(x => x.channelId === cid)?.lastMessages.push(p.message);
                    this.dispatch("message", cid, p.message);
                    break;*/
                /*case "conversationAdded":
                    this.inbox!.conversations.push(p.conversation);
                    this.dispatch("conversation", p.conversation.channelId);
                    break;*/
            }
        },this);
    }

    //Adding mock
    //generating events
    sendPacket(packet: OutgoingPacket) {
        this.ws.send(JSON.stringify(packet));
    }
}

export var proxy = new Proxy();