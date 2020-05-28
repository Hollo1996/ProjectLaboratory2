//import { MessageDto } from "../model/chat";

import { Model } from "../model/data/dmla/Model";
import { Entity } from "../model/data/dmla/Entity";

export interface ProxyEventMap
{
    "login": () => void;
    "modelListed": (data:Model[]) => void;
    "modelAdded": (data:Model) => void;
    "modelUpdated": (data:Model) => void;
    "modelRemoved": (id:string) => void;
    "modelDetail": (data:Model) => void;
    "entityAdded": (data:Entity) => void;
    "entityUpdated": (data:Entity) => void;
    "entityRemoved": (id:string) => void;
}