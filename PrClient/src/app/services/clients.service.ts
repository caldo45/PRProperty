import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
import { Client } from '../models/client';
import { ClientType } from '../models/clientType';
import { AuthService } from './auth.service';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http:HttpClient, private authService: AuthService) { }

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
  //  console.log(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    const url = 'http://localhost:54183/api/clientTypes';
    return this.http.get<ClientType[]>(url, httpOptions);
  }

  postClient(client: Client) {
    return this.http.post('http://localhost:54183/api/user', client);
    }
  }
