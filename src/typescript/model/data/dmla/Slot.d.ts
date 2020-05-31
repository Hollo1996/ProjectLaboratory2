import { Cardinality } from "./constrait/Cardinality";
import { Type } from "./constrait/Type";
import { OperationSignature } from "./constrait/OperationSigniture";

export interface Slot {
    id:number;
    name:string;
    superId:number;
    superName:string;
    type:Type;
    cardinality:Cardinality;
    operationSignature:OperationSignature;
    customConstraits:Constrait[];
    values:Entity[];
    isOpen:Boolean;
    isOperationsOpen:Boolean;
}