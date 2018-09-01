import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

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
}
