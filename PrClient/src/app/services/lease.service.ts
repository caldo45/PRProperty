import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lease } from '../models/lease';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  constructor(private http:HttpClient) { }

  getLeases(): Observable<Lease[]> {
    let url =  environment.baseUrl + '/api/lease';
    return this.http.get<Lease[]>(url);
  }

  getLeasesProperty(propertyId: number): Observable<Lease[]>{
    let url =  environment.baseUrl + '/api/lease/byProperty' + propertyId;
    return this.http.get<Lease[]>(url);
  }

  getActiveLeaseProperty(propertyId: number): Observable<Lease>{
    let url =  environment.baseUrl + '/api/lease/activeByProperty'+propertyId;
    return this.http.get<Lease>(url);
  }

  getActiveLeases(): Observable<Lease[]>{
    let url =  environment.baseUrl + '/api/lease/active';
    return this.http.get<Lease[]>(url);
  }

  postLease(lease: Lease){
    return this.http.post(environment.baseUrl + '/api/lease', lease)
    .subscribe( res =>
      {console.log(res);})
  }

}
