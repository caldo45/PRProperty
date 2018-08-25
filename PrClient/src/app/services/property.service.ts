import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) { }

  getProperties(): Observable<Property[]> {
    let url = 'http://localhost:54183/api/properties';
    return this.http.get<Property[]>(url);
  }

  getProperty(id: number): Observable<Property>{
    let url = 'http://localhost:54183/api/properties/'+id;
    return this.http.get<Property>(url);
  }

  getPropertiesByLandlord(landlordId: number): Observable<Property[]>{
    let url = 'http://localhost:54183/api/properties/byLandlord'+landlordId;
    return this.http.get<Property[]>(url);
  }

  postProperty(property: Property){
    return this.http.post('http://localhost:54183/api/properties',property)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }
}
