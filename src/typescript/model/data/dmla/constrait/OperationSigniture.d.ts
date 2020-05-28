import { OperationSignatureItem } from "./OperationSignatureItem";
import { Constrait } from "../Constrait";

export interface OperationSignature extends Constrait {
    items:OperationSignatureItem[]
}