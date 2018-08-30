import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { RoomImage } from '../models/roomImage';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http:HttpClient) { }

  getRoomsByProperty(propertyId: number): Observable<Room[]>{
    let url = 'http://localhost:54183/api/rooms/byProperty'+propertyId;
    return this.http.get<Room[]>(url);
  }

  getRoom(id: number): Observable<Room>{
    let url = 'http://localhost:54183/api/rooms/'+id;
    return this.http.get<Room>(url);
  }

  getRoomPhotos(id: number): Observable<RoomImage[]>{
    let url = 'http://localhost:54183/api/rooms/images/'+id;
    return this.http.get<RoomImage[]>(url);
  }

  postRoom(room: Room){
    return this.http.post('http://localhost:54183/api/rooms',room)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }
}
