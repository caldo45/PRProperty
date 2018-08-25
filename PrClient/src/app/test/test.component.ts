import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from '../services/file.service';
import { Papa } from 'ngx-papaparse';
import { Payment } from '../models/payment';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],

})


export class TestComponent implements OnInit {

  ngOnInit(): void {

    
  }
  public progress: number;
  public message: string;
  csvFile: File;
  payments: Payment[];
  dataList : Payment[];
  path: String;

  
  
  constructor(private http: HttpClient, private papa: Papa, private fileService: FileService, ) { }

  upload(files, path) {
    if (files.length === 0)
      return;
    console.log(files);


    const formData = new FormData();

    formData.append('propertyId', 'john');

    for (let file of files)
      formData.append(file.name, file);

    this.fileService.uploadFiles(formData)
      .subscribe(response => {
        path = response;
        console.log(path);
      })

    // this.http.request(uploadReq).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.progress = Math.round(100 * event.loaded / event.total);
    //   else if (event.type === HttpEventType.Response)
    //     this.message = event.body.toString();
    // });
  }


  onChange(files: File[], payments){
  
    if(files[0]){
      console.log(files[0]);
      this.papa.parse(files[0], {
        header: false,
        skipEmptyLines: true,
        complete: (result,file) => {
          console.log(result.data);
          this.dataList = result.data;
          this.payments = this.dataList;
          console.log(payments); 
        }
      });
    }
  }
  

}
