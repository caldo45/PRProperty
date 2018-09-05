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
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/properties';
    return this.http.get<Property[]>(url, httpOptions);
  }

  getProperty(id: number): Observable<Property>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/properties/'+id;
    return this.http.get<Property>(url, httpOptions);
  }

  getPropertiesByLandlord(landlordId: number): Observable<Property[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/properties/byLandlord'+landlordId;
    return this.http.get<Property[]>(url, httpOptions);
  }

  getPropertyImages(propertyId: number): Observable<PropertyImage[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/properties/images/'+propertyId;
    return this.http.get<PropertyImage[]>(url, httpOptions);
  }

  getAllPropertiesImages(): Observable<PropertyImage>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/properties/allImages';
    return this.http.get<PropertyImage>(url, httpOptions);
  }

  getImageForEachProperty(): Observable<PropertyImage[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/properties/imageForEach';
    return this.http.get<PropertyImage[]>(url, httpOptions);
  }

  postProperty(property: Property){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post( environment.baseUrl + '/api/properties',property, httpOptions)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
        console.log(err);
       }
       );
    }

    deletePropertyImage(image: PropertyImage){
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + localStorage.getItem('access_token')
        })
      };
      return this.http.post( environment.baseUrl + '/api/properties/deleteImage',image, httpOptions);
      
    }
}
