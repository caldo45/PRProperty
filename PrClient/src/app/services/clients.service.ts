import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
import { Client } from '../models/client';
import { ClientType } from '../models/clientType';
import { AuthService } from './auth.service';
import { environment } from '../environment';
import { NextOfKin } from '../models/nextOfKin';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http:HttpClient, private authService: AuthService) { }

  getClients(): Observable<Client[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };  
    let url =  environment.baseUrl + '/api/user';
    return this.http.get<Client[]>(url, httpOptions);
  }

  getClientsByType(clientTypeId: number): Observable<Client[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/user/getbytype'+clientTypeId;
    return this.http.get<Client[]>(url, httpOptions);
  }

  getClient(id: number): Observable<Client>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/user/'+id;
    return this.http.get<Client>(url, httpOptions);
  }

  getClientTypes(): Observable<ClientType[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    const url =environment.baseUrl + '/api/clientTypes';

    return this.http.get<ClientType[]>(url, httpOptions);
  }

  getNextOfKin(clientId: number): Observable<NextOfKin>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    const url =environment.baseUrl + '/api/nextOfKin'+clientId;

    return this.http.get<NextOfKin>(url, httpOptions);
  }

  postClient(client: Client) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post(environment.baseUrl + '/api/user', client, httpOptions);
    }

    deleteClient(client: Client): Observable<Client> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + localStorage.getItem('access_token')
        })
      };
      return this.http.post<Client>(environment.baseUrl + '/api/user/delete', client, httpOptions);
      }
  }
