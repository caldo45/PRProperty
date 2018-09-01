import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ClientType } from '../models/ClientType';
import { Client } from '../models/client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  clientTypes: ClientType[];

  client: Client;
  uploadSuccess: number;

  constructor(private route: ActivatedRoute, private clientService: ClientsService) { }

  ngOnInit() {
    let clientId = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClientTypes()
    .subscribe(response => { this.clientTypes = response;
    this.clientService.getClient(clientId)
      .subscribe(response => this.client = response)
    });
  }

  addUser(client: Client, uploadSuccess) {
    this.client.clientTypeId = +this.client.clientTypeId;
    console.log(client);
    this.clientService.postClient(client, uploadSuccess)
    ;
  }

}