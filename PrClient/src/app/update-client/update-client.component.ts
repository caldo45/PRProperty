import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ClientType } from '../models/ClientType';
import { Client } from '../models/client';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  clientTypes: ClientType[];
  testDate: Date;
  delete = false;
  deleted = false;
  client: Client;
  saveSuccess: boolean;
  userMessage: string = null;
  deletedClient: Client;
  deleteFailed = false;
  @ViewChild('addUserForm') form;

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
    if(this.form.invalid){
      this.saveSuccess = false;
      this.userMessage = 'Please Check Fields are Valid';
    }else{
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

  removeClientDetails(client: Client){
    this.client.firstName = "Details Removed";
    this.client.lastName = "Details Removed";
    this.client.dob = "1900-01-01";
    this.client.email = "Details Removed";
    this.client.phone = "00";
    this.client.imagePath = "default/defaultImage.jpg";
  }

  deleteTrue(){
    this.delete = true;
  }

  cancelDelete(){
    this.delete = false;
  }


  deleteClient(client){
    this.clientService.deleteClient(client)
        .subscribe( res => {
            this.deletedClient = res;
            if(this.deletedClient.id ==0){
                this.deleted = true;
                this.userMessage = 'Property Deleted';
            }else{
                this.deleteFailed = true;
                this.userMessage = 'Error Deleting Client Details, Please Ensure Client Has No Contracts or Properties';
            }
        });
      }
}
