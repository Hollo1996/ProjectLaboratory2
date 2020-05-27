import { TextInputOptions } from "./textInputOptions";

export interface TextInputAndButtonOptions extends TextInputOptions
{
buttonContent?: string;
onClick?: ( text: string ) => boolean | void;
}