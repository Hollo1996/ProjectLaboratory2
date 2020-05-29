import { Model } from "../../model/data/dmla/Model";
import { Entity } from "../../model/data/dmla/Entity";

export type IncomingPacket =
{ type: "error", message: string } |
{ type: "login", token: string } |
{ type: "user", user: UserDto } |
{ type: "modelList", models: Model[] } |
{ type: "modelAdded", model: Model } |
{ type: "modelUpdated", model: Model } |
{ type: "modelRemoved", modelId: number } |
{ type: "modelDetail", model: Model } |
{ type: "wholeModelUpdated", model: Model } 
/*{ type: "entityAdded", entity: Entity }|
{ type: "entityUpdated", entity: Entity }|
{ type: "entityRemoved", entityId: number }*/;