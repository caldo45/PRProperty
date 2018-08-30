import { Contract } from "./contract";

export class Payment {
    id: number;
    amount: number;
    date: Date;
    reference: string;
    contractId: number;
    contract: Contract;

}
