import { ClientType } from "./ClientType";

export class Client {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    email: string;
    imagePath: string;
    clientTypeId: number;
    clientType: ClientType;
}
