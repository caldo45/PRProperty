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
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract';
    return this.http.get<Contract[]>(url, httpOptions);
  }

  getContract(contractId: number): Observable<Contract>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/'+contractId;
    return this.http.get<Contract>(url, httpOptions);
  }


  getActiveContract(roomId: number): Observable<Contract>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/activeByRoom'+roomId;
    return this.http.get<Contract>(url, httpOptions);
  }

  getActiveContracts(propertyId: number): Observable<Contract[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/activeByProperty'+propertyId;
    return this.http.get<Contract[]>(url, httpOptions);
  }

  getActiveContractByClient(clientId: number): Observable<Contract>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/activeByUser'+clientId;
    return this.http.get<Contract>(url, httpOptions);
  }

  getPaymentTypes(): Observable<PaymentType[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/paymentTypes';
    return this.http.get<PaymentType[]>(url, httpOptions);
  }

  postPayments(payments: Payment[]): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post<string>(environment.baseUrl + '/api/contract/payments', payments, httpOptions);   
  }


  getUpcomingByClient(clientId: number): Observable<Contract[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/upcomingByClient'+clientId;
    return this.http.get<Contract[]>(url, httpOptions);
  }

  getUpcomingByRoom(roomId: number): Observable<Contract[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/upcomingByRoom'+roomId;
    return this.http.get<Contract[]>(url, httpOptions);
  }

  getOldByRoom(roomId: number): Observable<Contract[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/oldByRoom'+roomId;
    return this.http.get<Contract[]>(url, httpOptions);
  }

  getOldByClient(clientId: number): Observable<Contract[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/oldByClient'+clientId;
    return this.http.get<Contract[]>(url, httpOptions);
  }

  getAllActiveContracts(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url = environment.baseUrl + '/api/contract/allActive';
    return this.http.get<Contract[]>(url, httpOptions);
  }

  getPayments(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    let url =  environment.baseUrl + '/api/payments'
    return this.http.get<Payment[]>(url, httpOptions); 
  }

  postContract(contract: Contract){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post(environment.baseUrl + '/api/contract',contract, httpOptions);     
    }

    deleteContract(contract: Contract): Observable<Contract>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + localStorage.getItem('access_token')
        })
      };
      return this.http.post<Contract>( environment.baseUrl + '/api/contract/delete',contract, httpOptions);
      }

      deletePayment(payment: Payment): Observable<Payment>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'bearer ' + localStorage.getItem('access_token')
          })
        };
        return this.http.post<Payment>( environment.baseUrl + '/api/contract/deletePayment',payment, httpOptions);
        }

}
