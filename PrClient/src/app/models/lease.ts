import { Property } from "./property";
import { Client } from "./client";

export class Lease{
    id: number;
    propertyId: number;
    property: Property;
    dateFrom: string;
    dateTo: string;
    monthlyAmount: number;

    
}