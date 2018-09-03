import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { RoomImage } from '../models/roomImage';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http:HttpClient) { }

  getRoomsByProperty(propertyId: number): Observable<Room[]>{
    let url =  environment.baseUrl + '/api/rooms/byProperty'+propertyId;
    return this.http.get<Room[]>(url);
  }

  getRoom(id: number): Observable<Room>{
    let url =  environment.baseUrl + '/api/rooms/'+id;
    return this.http.get<Room>(url);
  }

  getRoomPhotos(id: number): Observable<RoomImage[]>{
    let url =  environment.baseUrl + '/api/rooms/images/'+id;
    return this.http.get<RoomImage[]>(url);
  }

  getRoomsImage(propertyId: number): Observable<RoomImage[]>{
    let url =  environment.baseUrl + '/api/rooms/image/'+propertyId;
    return this.http.get<RoomImage[]>(url);
  }

  postRoom(room: Room){
    return this.http.post( environment.baseUrl + '/api/rooms',room)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }
}
