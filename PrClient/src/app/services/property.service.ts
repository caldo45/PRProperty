import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
import { PropertyImage } from '../models/propertyImage';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) { }

  getProperties(): Observable<Property[]> {
    let url =  environment.baseUrl + '/api/properties';
    return this.http.get<Property[]>(url);
  }

  getProperty(id: number): Observable<Property>{
    let url =  environment.baseUrl + '/api/properties/'+id;
    return this.http.get<Property>(url);
  }

  getPropertiesByLandlord(landlordId: number): Observable<Property[]>{
    let url =  environment.baseUrl + '/api/properties/byLandlord'+landlordId;
    return this.http.get<Property[]>(url);
  }

  getPropertyImages(propertyId: number): Observable<PropertyImage[]>{
    let url =  environment.baseUrl + '/api/properties/images/'+propertyId;
    return this.http.get<PropertyImage[]>(url);
  }

  getPropertyImage(propertyId: number): Observable<PropertyImage>{
    let url =  environment.baseUrl + '/api/properties/image/'+propertyId;
    return this.http.get<PropertyImage>(url);
  }

  postProperty(property: Property){
    return this.http.post( environment.baseUrl + '/api/properties',property)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }

    deletePropertyImage(image: PropertyImage){
      return this.http.post( environment.baseUrl + '/api/properties/deleteImage',image)
        .subscribe(response => console.log(response));
    }
}
