import { Injectable } from '@angular/core';
import { Contract } from '../models/contract';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentType } from '../models/paymentType';
import { Payment } from '../models/payment';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http:HttpClient) { }

  getContracts(): Observable<Contract[]> {
    let url = environment.baseUrl + '/api/contract';
    return this.http.get<Contract[]>(url);
  }

  getActiveContract(roomId: number): Observable<Contract>{
    let url = environment.baseUrl + '/api/contract/activeByRoom'+roomId;
    return this.http.get<Contract>(url);
  }

  getActiveContracts(propertyId: number): Observable<Contract[]>{
    let url = environment.baseUrl + '/api/contract/activeByProperty'+propertyId;
    return this.http.get<Contract[]>(url);
  }

  getActiveContractByClient(clientId: number): Observable<Contract>{
    let url = environment.baseUrl + '/api/contract/activeByUser'+clientId;
    return this.http.get<Contract>(url);
  }

  getPaymentTypes(): Observable<PaymentType[]>{
    let url = environment.baseUrl + '/api/paymentTypes';
    return this.http.get<PaymentType[]>(url);
  }

  postPayments(payments: Payment[]){
    return this.http.post(environment.baseUrl + '/api/contract/payments', payments)
      .subscribe( res =>
        {console.log(res);})
      
  }

  getPayments(){
    let url =  environment.baseUrl + '/api/payments'
    return this.http.get<Payment[]>(url); 
  }

  postContract(contract: Contract){
    return this.http.post(environment.baseUrl + '/api/contract',contract)
      .subscribe( res => 
        {console.log(res);
       },
      err => {
        console.log("Error Occured");
       }
       );
    }
}
