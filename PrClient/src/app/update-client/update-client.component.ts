import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ClientType } from '../models/ClientType';
import { Client } from '../models/client';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  clientTypes: ClientType[];
  testDate: Date;

  client: Client;
  saveSuccess: bool;
  userMessage: string = null;

  constructor(private route: ActivatedRoute, private clientService: ClientsService, private datePipe: DatePipe) { }

  ngOnInit() {
    const clientId = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClientTypes()
    .subscribe(response => { this.clientTypes = response;
      this.clientService.getClient(clientId)
        .subscribe(clientResponse => {
          this.client = clientResponse;
          this.client.dob = this.datePipe.transform(this.client.dob, 'yyyy-MM-dd');
        });
      });
  }

  addUser(client: Client) {
    this.userMessage = null;
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
