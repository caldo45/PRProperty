import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  uploadFiles(formData: FormData): Observable<HttpResponse<string>>{
  const uploadReq = new HttpRequest('POST', `http://localhost:54183/api/user/UploadFile`, formData, {
    reportProgress: true,
  });

  let url = 'http://localhost:54183/api/user/UploadFile';

  return this.http.post<HttpResponse<string>>(url, formData)
    
}


  postClient(file: File){
    return this.http.post('http://localhost:54183/api/user/file',file)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }
}
