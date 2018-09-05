import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../models/client';
import { Property } from '../models/property';
import { PropertyService } from '../services/property.service';
import { Contract } from '../models/contract';
import { ContractsService } from '../services/contracts.service';
import { environment } from '../environment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client: Client;
  properties: Property[];
  activeContract: Contract;
  oldContracts: Contract[];
  upcomingContracts: Contract[];

  constructor(private route: ActivatedRoute, private clientService: ClientsService, private propertyService: PropertyService, private contractService: ContractsService) {
   }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(id)
    .subscribe(response => { this.client = response;
                            this.client.imagePath = environment.imageRoot + this.client.imagePath;
                            this.propertyService.getPropertiesByLandlord(id)
                             .subscribe(response => { 
                             this.properties = response;
                             this.contractService.getActiveContractByClient(id)
                             .subscribe(response => { this.activeContract = response;
                              console.log(this.activeContract);
                              if(this.client.clientTypeId == 1){
                                  this.contractService.getUpcomingByClient(id)
                                      .subscribe(response => this.upcomingContracts = response);
                                 this.contractService.getOldByClient(id)
                                      .subscribe(response => this.oldContracts = response);
                              }
                             });
                             });
    });
  }

}
