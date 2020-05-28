import { Constrait } from "../Constrait";

export interface Cardinality extends Constrait {
    from:number;
    to:number;
    toInf:boolean;
}