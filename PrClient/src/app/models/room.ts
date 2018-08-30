import { Property } from "./property";
import { Contract } from "./contract";

export class Room {
    id: number;
    name: string;
    propertyId: number;
    property: Property;
    contract: Contract;
    activeContract: number;
    imagePath: string;

}
