import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from '../services/file.service';
import { Papa } from 'ngx-papaparse';
import { Payment } from '../models/payment';
import { ContractsService } from '../services/contracts.service';


@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  public progress: number;
  public message: string;
  csvFile: File;
  payments: Payment[] = [];
  dataList: Payment[];
  path: String;
  success = true;
  saveSuccess: boolean;
  userMessage: string = null;

  ngOnInit(): void {
  }

  constructor(private http: HttpClient, private papa: Papa, private fileService: FileService, private contractService: ContractsService ) { }

  /** File Parsing */
  onChange(files: File[], payments) {
    var ext ="";
    /**check file is of type CSV */
    for (let file of files){
      var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
    }
    if(ext == "csv"){
        if (files[0]) {
          this.payments = [];
          console.log(files[0]);
          /** Setting for PapaParse - Header - true, column headers included, skip empty rows - true */
          this.papa.parse(files[0], {
            header: true,
            skipEmptyLines: true,
            complete: (result, file) => {
              console.table(result.data);
              /** Cast as type Payment[] */
              this.payments = result.data as Payment[];
            }
          });
        }
      }else{
        this.success = false;
        this.message = "Please Ensure File is of Type CSV";
      }
    }

  postPayments(payments){
    this.contractService.postPayments(payments)
    .subscribe( res => {  
      console.log(res);
        this.saveSuccess = true;
        this.userMessage = 'Payments Successfully Uploaded';
      
      // {
      //   console.log(res)
      //   this.saveSuccess = false;
      //   this.userMessage = 'Following References could not be found: '+res;
      // }

  }, err => {
            this.saveSuccess = false;
            this.userMessage = 'Payment Not Added. Unknown References: '+err;
        }
       
 );
}
}