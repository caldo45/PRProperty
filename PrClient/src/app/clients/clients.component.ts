import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { ClientType } from '../models/ClientType';
import { environment } from '../environment';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  _listFilter: string;
  filteredClients: Client[] = [];
  filters: {clientType:string} = {clientType:""};
  clientTypes: ClientType[];
  loading: boolean = false;
  

  constructor(private clientsService:ClientsService) { 
  this.filteredClients = this.clients;
  this._listFilter = null;
  }

  ngOnInit() {
    this.loading = true;
    this.clientsService.getClients()
      .subscribe(response => {
      this.clients = response;
      for(let client of this.clients){
        client.imagePath = environment.imageRoot + client.imagePath;
      }
      console.log(this.clients);    
      this.clientsService.getClientTypes()
          .subscribe(response => {
            this.clientTypes = response;
            console.log(this.clientTypes);
            if(response && response[0]){
              this.filters.clientType = response[0].id.toString();
              this.filteredClients = this.performFilter("");
              console.log(this.filteredClients);             
            } 
            this.loading = false;
        });
      });
    
  }

  changeClientType(clientType: ClientType){
    this.filters.clientType = clientType.id.toString();
    this.filteredClients = this.listFilter ? this.performFilter(this.listFilter) : this.performFilter("");
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredClients= this.listFilter ? this.performFilter(this.listFilter) : this.performFilter("");
  }
 

  performFilter(filterBy: string): Client[] {
    filterBy = filterBy.toLocaleLowerCase();
    console.log(this.clients);
    let filtered = this.clients.filter((client: Client) =>
      client.firstName.toLocaleLowerCase().indexOf(filterBy) > -1 && client.clientType.id.toString() === this.filters.clientType);
    return filtered;
  }



}
