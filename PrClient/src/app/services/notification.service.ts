import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

 activateNotifications(activate: number){
    return this.http.post('http://localhost:54183/api/notifications',activate)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }
}
