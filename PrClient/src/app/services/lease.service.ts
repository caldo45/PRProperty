import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lease } from '../models/lease';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  constructor(private http:HttpClient) { }

  getLeases(): Observable<Lease[]> {
    let url = 'http://localhost:54183/api/lease';
    return this.http.get<Lease[]>(url);
  }

  getActiveLeaseProperty(propertyId: number): Observable<Lease>{
    let url = 'http://localhost:54183/api/lease/';
    return this.http.get<Lease>(url);
  }

  getActiveLeases(): Observable<Lease[]>{
    let url = 'http://localhost:54183/api/lease/active';
    return this.http.get<Lease[]>(url);
  }

}
