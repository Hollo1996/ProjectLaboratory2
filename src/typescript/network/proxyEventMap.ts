//import { MessageDto } from "../model/chat";

import { Model } from "../model/data/dmla/Model";
import { Entity } from "../model/data/dmla/Entity";

export interface ProxyEventMap
{
    "login": () => void;
    "modelListed": (models:Model[]) => void;
    "modelAdded": (model:Model) => void;
    "modelUpdated": (model:Model) => void;
    "modelRemoved": (id:number) => void;
    "modelDetail": (model:Model) => void;
    "wholeModelUpdated": (model:Model) => void;
    /*"entityAdded": (entity:Entity) => void;
    "entityUpdated": (entity:Entity) => void;
    "entityRemoved": (id:number) => void;*/
}