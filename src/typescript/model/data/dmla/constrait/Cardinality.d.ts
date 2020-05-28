import { Constrait } from "../Constrait";

export interface Cardinality extends Constrait {
    [x: string]: any;
    from:number;
    to:number;
    toInf:boolean;
}