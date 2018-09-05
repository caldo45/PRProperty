import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http:HttpClient) { }

  uploadFiles(formData: FormData): Observable<HttpResponse<string>>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
  const uploadReq = new HttpRequest('POST', environment.baseUrl + `/api/images/UploadFile`, formData, {
    reportProgress: true,
  });

  let url = environment.baseUrl + '/api/images/UploadFile';

  return this.http.post<HttpResponse<string>>(url, formData, httpOptions);
    
}


  postClient(file: File){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post(environment.baseUrl + '/api/user/file',file, httpOptions)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }
}
