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
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/rooms/byProperty'+propertyId;
    return this.http.get<Room[]>(url, httpOptions);
  }

  getRoom(id: number): Observable<Room>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/rooms/'+id;
    return this.http.get<Room>(url, httpOptions);
  }

  getRoomPhotos(id: number): Observable<RoomImage[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/rooms/images/'+id;
    return this.http.get<RoomImage[]>(url, httpOptions);
  }

  getRoomsImage(propertyId: number): Observable<RoomImage[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/rooms/image/'+propertyId;
    return this.http.get<RoomImage[]>(url, httpOptions);
  }

  postRoom(room: Room){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post( environment.baseUrl + '/api/rooms',room, httpOptions)
    }

    deleteRoomImage(image: RoomImage){
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + localStorage.getItem('access_token')
        })
      };
      return this.http.post( environment.baseUrl + '/api/rooms/deleteImage',image, httpOptions);
      
    }
}
