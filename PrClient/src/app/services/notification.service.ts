import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { ContractNotification } from '../models/ContractNotification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getContractNotifications(): Observable<ContractNotification[]>{
    let url =  environment.baseUrl + '/api/notifications';
    return this.http.get<ContractNotification[]>(url);
  }

 activateNotifications(activate: number){
    return this.http.post( environment.baseUrl + '/api/notifications',activate)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }

    markContractNotificationAsRead(contractNotification: ContractNotification){
      return this.http.post('http://localhost:54183/api/notifications/asRead',contractNotification)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    
    }
}
