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
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {

  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private clientService: ClientsService, private roomService: RoomService, private contractService: ContractsService) { }

  @ViewChild('addContractForm') form;

  properties: Property[];
  propertyId: 0;
  rooms: Room[];
  room: Room;
  tenant: Client;
  clientId: number;
  client: Client;
  contract: Contract;
  paymentTypes: PaymentType[];
  depositPaid: number;
  loading = false;
  userMessage: string = null;
  saveSuccess: boolean;
  

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

  addContract(contract: Contract) {
    if(this.form.invalid){
      this.saveSuccess = false;
      this.userMessage = "Add Contract Failed - Check fields are Valid "
    } else{
      this.userMessage = null;
        this.contractService.postContract(this.contract)
        .subscribe( res => {
          this.saveSuccess = true;
          this.userMessage = 'Contract Details Saved';
      },
      err => {
          this.saveSuccess = false;
          this.userMessage = 'Error Saving Contract Details, Please Ensure that Contract does not overlap with another for same room';
      }
     );
    }

}

addUser(client: Client) {
  if(this.form.invalid){
    this.saveSuccess = false;
    this.userMessage = 'Please Check Details and Try Again';
  }
  else {
    this.userMessage = null;
    this.client.imagePath = "default/defaultImage.jpg";
    this.client.clientTypeId = +this.client.clientTypeId;
    this.clientService.postClient(client)
      .subscribe( res => {
          this.saveSuccess = true;
          this.userMessage = 'Client Details Saved';
      },
      err => {
          this.saveSuccess = false;
          this.userMessage = 'Error Saving Client Details';
      }
     );
  }
 
}


  getRooms(propertyId, rooms){
    this.roomService.getRoomsByProperty(this.propertyId)
    .subscribe(response => this.rooms = response);
  }
}
