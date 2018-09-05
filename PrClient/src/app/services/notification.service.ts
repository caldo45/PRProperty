import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { ContractNotification } from '../models/ContractNotification';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getContractNotifications(): Observable<ContractNotification[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/notifications';
    return this.http.get<ContractNotification[]>(url, httpOptions);
  }

 activateNotifications(activate: number){
       const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post( environment.baseUrl + '/api/notifications',activate, httpOptions);
    }

    markContractNotificationAsRead(contractNotification: ContractNotification){
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + localStorage.getItem('access_token')
        })
      };
      return this.http.post(environment.baseUrl +'/api/notifications/asRead',contractNotification, httpOptions)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    
    }
}
