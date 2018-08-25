import { Injectable } from '@angular/core';
import { Contract } from '../models/contract';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentType } from '../models/paymentType';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http:HttpClient) { }

  getContracts(): Observable<Contract[]> {
    let url = 'http://localhost:54183/api/contract';
    return this.http.get<Contract[]>(url);
  }

  getActiveContract(roomId: number): Observable<Contract>{
    let url = 'http://localhost:54183/api/contract/activeByRoom'+roomId;
    return this.http.get<Contract>(url);
  }

  getActiveContracts(propertyId: number): Observable<Contract[]>{
    let url = 'http://localhost:54183/api/contract/activeByProperty'+propertyId;
    return this.http.get<Contract[]>(url);
  }

  getActiveContractByClient(clientId: number): Observable<Contract>{
    let url = 'http://localhost:54183/api/contract/activeByProperty'+clientId;
    return this.http.get<Contract>(url);
  }

  getPaymentTypes(): Observable<PaymentType[]>{
    let url = 'http://localhost:54183/api/paymentTypes';
    return this.http.get<PaymentType[]>(url);
  }

  postContract(contract: Contract){
    return this.http.post('http://localhost:54183/api/contract',contract)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }
}
