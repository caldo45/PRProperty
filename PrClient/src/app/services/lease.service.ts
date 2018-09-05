import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lease } from '../models/lease';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  constructor(private http:HttpClient) { }

  getLeases(): Observable<Lease[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/lease';
    return this.http.get<Lease[]>(url, httpOptions);
  }

  getLease(leaseId: number): Observable<Lease> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/lease/'+leaseId;
    return this.http.get<Lease>(url, httpOptions);
  }

  getLeasesProperty(propertyId: number): Observable<Lease[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/lease/byProperty' + propertyId;
    return this.http.get<Lease[]>(url, httpOptions);
  }

  getActiveLeaseProperty(propertyId: number): Observable<Lease>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/lease/activeByProperty'+propertyId;
    return this.http.get<Lease>(url, httpOptions);
  }

  getActiveLeases(): Observable<Lease[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/lease/active';
    return this.http.get<Lease[]>(url, httpOptions);
  }

  postLease(lease: Lease){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post(environment.baseUrl + '/api/lease', lease, httpOptions);
  }

  getUpcomingLeasesByProperty(propertyId: number): Observable<Lease[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/lease/upcomingByProperty'+propertyId;
    return this.http.get<Lease[]>(url, httpOptions);
  }

  getOldLeasesByProperty(propertyId: number): Observable<Lease[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/lease/upcomingByProperty'+propertyId;
    return this.http.get<Lease[]>(url, httpOptions);
  }

}
