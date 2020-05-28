import { Entity } from "../../model/data/dmla/Entity";

export type OutgoingPacket =
    { type: "login", email: string, password: string, staySignedIn: boolean } |
    { type: "loginWithToken", token: string } |
    { type: "register", email: string, password: string, displayName: string, staySignedIn: boolean }|
    { type: "modelListRequest", token: string }|
    { type: "modelCreateRequest", token: string}|
    { type: "modelMetaUpdateRequest", token: string, model: Model }|
    { type: "modelRemoveRequest", token: string, modelId: number }|
    { type: "modelDetailsRequest", token: string, modelId: number }|
    { type: "createEntityRequest", token: string, superId: number }|
    { type: "updateEntityRequest", token: string, entity: Entity }|
    { type: "removeEntityRequest", token: string, entityId: number } ;