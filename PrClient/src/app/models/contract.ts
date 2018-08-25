import { Client } from "./client";
import { Room } from "./room";
import { PaymentType } from "./paymentType";

export class Contract {
    id: number;
    roomId: number;
    room: Room;
    clientId: number;
    tenant: Client;
    dateFrom: Date;
    dateTo: Date;
    monthlyAmount: number;
    paymentDate: number;
    paymentTypeId: number;
    paymentType: PaymentType;
    depositPaid: Boolean;
    paymentReference: String;
}
