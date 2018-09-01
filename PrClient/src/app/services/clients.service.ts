import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
import { Client } from '../models/client';
import { ClientType } from '../models/clientType';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http:HttpClient) { }

  getClients(): Observable<Client[]>{
    let url =  environment.baseUrl + '/api/user';
    return this.http.get<Client[]>(url);
  }

  getClientsByType(clientTypeId: number): Observable<Client[]> {
    let url =  environment.baseUrl + '/api/user/getbytype'+clientTypeId;
    return this.http.get<Client[]>(url);
  }

  getClient(id: number): Observable<Client>{
    let url =  environment.baseUrl + '/api/user/'+id;
    return this.http.get<Client>(url);
  }

  getClientTypes(): Observable<ClientType[]>{
    let url =  environment.baseUrl + '/api/clientTypes';
    return this.http.get<ClientType[]>(url);
  }

  postClient(client: Client, uploadSuccess: number){
    return this.http.post( environment.baseUrl + '/api/user',client)
      .subscribe( res => 
        {console.log(res);
          uploadSuccess = 1;
       },
      err => {
        console.log("Error Occured");
        uploadSuccess = 0;
       }
       );
    }
  }
