export interface Entity{
    id:number;
    name:string;
    superId:number;
    super:string;
    slots:Slot[];
}