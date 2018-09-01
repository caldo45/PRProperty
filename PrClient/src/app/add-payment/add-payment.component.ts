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

  ngOnInit(): void {
  }

  constructor(private http: HttpClient, private papa: Papa, private fileService: FileService, private contractService: ContractsService ) { }

  onChange(files: File[], payments) {
    if (files[0]) {
      this.payments = [];
      console.log(files[0]);
      this.papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          console.table(result.data);
          this.payments = result.data as Payment[];
        }
      });
    }
  }

  postPayments(payments){
    this.contractService.postPayments(payments);
    console.log(payments);
  }
}