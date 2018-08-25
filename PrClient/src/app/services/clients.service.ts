import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
import { Client } from '../models/client';
import { ClientType } from '../models/clientType';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http:HttpClient) { }

  getClients(): Observable<Client[]>{
    let url = 'http://localhost:54183/api/user';
    return this.http.get<Client[]>(url);
  }

  getClientsByType(clientTypeId: number): Observable<Client[]> {
    let url = 'http://localhost:54183/api/user/getbytype'+clientTypeId;
    return this.http.get<Client[]>(url);
  }

  getClient(id: number): Observable<Client>{
    let url = 'http://localhost:54183/api/user/'+id;
    return this.http.get<Client>(url);
  }

  getClientTypes(): Observable<ClientType[]>{
    let url = 'http://localhost:54183/api/clientTypes';
    return this.http.get<ClientType[]>(url);
  }

  postClient(client: Client, uploadSuccess: number){
    return this.http.post('http://localhost:54183/api/user',client)
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
