import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ClientType } from '../models/ClientType';
import { Client } from '../models/client';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  clientTypes: ClientType[];

  client: Client;
  uploadSuccess: number;

  constructor(private clientService: ClientsService) { }

  ngOnInit() {
    this.clientService.getClientTypes()
    .subscribe(response => this.clientTypes = response);
    this.client = new Client();
  }

  addUser(client: Client, uploadSuccess) {
    this.client.clientTypeId = +this.client.clientTypeId;
    console.log(client);
    this.clientService.postClient(client)
    ;
  }

}
