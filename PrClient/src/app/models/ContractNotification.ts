import { ContractNotificationType } from "./ContractNotificationType";
import { Contract } from "./contract";

export class ContractNotification{
    id: number;
    contractId: number;
    markedRead: number;
    contractNotificationId: Number;
    contractNotificationType: ContractNotificationType
    contract: Contract;    
    dateAdded: Date;
}