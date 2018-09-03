import { Client } from "./client";
import { Room } from "./room";
import { PaymentType } from "./paymentType";

export class Contract {
    id: number;
    roomId: number;
    room: Room;
    clientId: number;
    tenant: Client;
    dateFrom: string;
    dateTo: string;

    monthlyAmount: number;
    paymentDate: number;
    paymentTypeId: number;
    paymentType: PaymentType;
    depositPaid: boolean;
    paymentReference: String;
}
