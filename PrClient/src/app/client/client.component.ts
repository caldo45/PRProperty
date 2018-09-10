import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../models/client';
import { Property } from '../models/property';
import { PropertyService } from '../services/property.service';
import { Contract } from '../models/contract';
import { ContractsService } from '../services/contracts.service';
import { environment } from '../environment';
import { AuthService } from '../services/auth.service';

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
  loading = false;
  clientId: number;

  constructor(private route: ActivatedRoute, private clientService: ClientsService, private propertyService: PropertyService, private contractService: ContractsService, public authService: AuthService) {
   }

  ngOnInit() {
    this.loading = true;
    this.clientId = +this.route.snapshot.paramMap.get('id');
    console.log(this.clientId);
    this.propertyService.getPropertiesByLandlord(this.clientId)
    .subscribe(response => { 
         this.properties = response;
    });
    this.clientService.getClient(this.clientId)
    .subscribe(response => { this.client = response;
                            this.client.imagePath = environment.imageRoot + this.client.imagePath;
                                     this.contractService.getActiveContractByClient(this.clientId)
                                          .subscribe(response => { this.activeContract = response;
                                           if(this.client.clientTypeId == 1){
                                                 this.contractService.getUpcomingByClient(this.clientId)
                                                     .subscribe(response => this.upcomingContracts = response);
                                                 this.contractService.getOldByClient(this.clientId)
                                               .subscribe(response => this.oldContracts = response);
                                             }
                                         });
                                 });
    this.loading = false;
  }

}
