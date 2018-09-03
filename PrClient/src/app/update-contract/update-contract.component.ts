import { Component, OnInit } from '@angular/core';
import { Contract } from '../models/contract';
import { PaymentType } from '../models/paymentType';
import { Client } from '../models/client';
import { Room } from '../models/room';
import { Property } from '../models/property';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { ClientsService } from '../services/clients.service';
import { RoomService } from '../services/room.service';
import { ContractsService } from '../services/contracts.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css']
})
export class UpdateContractComponent implements OnInit {

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private propertyService: PropertyService, private clientService: ClientsService, private roomService: RoomService, private contractService: ContractsService) { }

  properties: Property[];
  propertyId: number;
  rooms: Room[];
  room: Room;
  tenant: Client;
  clientId: number;
  client: Client;
  contract: Contract;
  paymentTypes: PaymentType[];
  depositPaid: number;
  userMessage: string = null;
  contractId: number;


  ngOnInit() {
    let contractId = +this.route.snapshot.paramMap.get('id');
    this.contractService.getContract(contractId)
      .subscribe(response => {
        this.contract = response;
        this.propertyId = this.contract.room.propertyId;
        this.contract.dateFrom = this.datePipe.transform(this.contract.dateFrom, 'yyyy-MM-dd');
        this.contract.dateTo = this.datePipe.transform(this.contract.dateTo, 'yyyy-MM-dd');
        this.clientId = this.contract.clientId;
        this.roomService.getRoomsByProperty(this.propertyId)
          .subscribe(response => this.rooms = response);
        this.clientService.getClient(this.clientId)
        .subscribe(response => this.client = response);

      });
    this.propertyService.getProperties()
    .subscribe(response => {
      this.properties = response;
      this.clientService.getClient(this.clientId)
        .subscribe(response => this.client = response);
    });
    this.contractService.getPaymentTypes()
    .subscribe(response => this.paymentTypes = response)
  }

  log(paymentTypes){
    console.log(paymentTypes);
  }

  addContract(contract: Contract) {
    this.userMessage = null;
    console.log(contract);
      this.contractService.postContract(this.contract)
        .subscribe( res => 
        {
            this.userMessage = "Contract Added"
        },
        err => {
            this.userMessage = "Add Contract Failed - Check if Contract overlaps another for same room"
        }
        );;
}

  getRooms(propertyId, rooms){
    this.roomService.getRoomsByProperty(this.propertyId)
    .subscribe(response => this.rooms = response);
  }
}
