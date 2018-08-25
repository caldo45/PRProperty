import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';
import { Room } from '../models/room';
import { Client } from '../models/client';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import { RoomService } from '../services/room.service';
import { Contract } from '../models/contract';
import { PaymentType } from '../models/paymentType';
import { ContractsService } from '../services/contracts.service';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {

  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private clientService: ClientsService, private roomService: RoomService, private contractService: ContractsService) { }

  properties: Property[];
  propertyId: 0;
  rooms: Room[];
  tenant: Client;
  clientId: number;
  client: Client;
  contract: Contract;
  paymentTypes: PaymentType[];


  ngOnInit() {
    let clientId = +this.route.snapshot.paramMap.get('id');
    this.contract = new Contract();
    this.contract.clientId = clientId;
    this.propertyService.getProperties()
    .subscribe(response => {
      this.properties = response;
      this.clientService.getClient(clientId)
        .subscribe(response => this.client = response);
    });
    this.contractService.getPaymentTypes()
    .subscribe(response => this.paymentTypes = response)
  }

  log(paymentTypes){
    console.log(paymentTypes);
  }

  addContract(contract: Contract) {
    console.log(contract);
   this.contractService.postContract(contract);
  }

  getRooms(propertyId, rooms){
    this.roomService.getRoomsByProperty(this.propertyId)
    .subscribe(response => this.rooms = response);
  }
}
