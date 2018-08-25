import { Client } from '../models/client';

export class Property {
    id: number;
    firstLineAddress: string;
    secondLineAddress: string;
    postcode: string;
    landlordId: number;
    client: Client;
    firstName: string;
    latitude: number;
    longitude: number;
    imagePath: string;
    landlord: Client;
}
