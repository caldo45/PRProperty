import { Client } from '../models/client';
import { Lease } from './lease';

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
    country: string;
    city: string;
    activeLease: number;
    lease: Lease;
    
}
