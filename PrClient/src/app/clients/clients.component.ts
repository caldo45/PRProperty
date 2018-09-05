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
      this.filteredClients = this.clients;
      this.loading = false; 

      });
    
  }


  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredClients= this.listFilter ? this.performFilter(this.listFilter) : this.clients;
  }
 

  performFilter(filterBy: string): Client[] {
    filterBy = filterBy.toLocaleLowerCase();
    let filtered = this.clients.filter((client: Client) =>
      client.firstName.toLocaleLowerCase().indexOf(filterBy) > -1);
    return filtered;
  }



}
