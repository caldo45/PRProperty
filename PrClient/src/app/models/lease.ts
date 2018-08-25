import { Property } from "./property";
import { Client } from "./client";

export class Lease{
    id: number;
    propertyId: number;
    property: Property;
    dateFrom: Date;
    dateTo: Date;
    monthlyAmount: number;
    tenantId: number;
    tenant: Client;
    
}