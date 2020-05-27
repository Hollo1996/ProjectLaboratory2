import { Constrait } from "../Constrait";

export interface Type extends Constrait {
    entityId:Type;
    entityName:string;
}