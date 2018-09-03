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

  getContract(contractId: number): Observable<Contract>{
    let url = environment.baseUrl + '/api/contract/'+contractId;
    return this.http.get<Contract>(url);
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

  getAllUpcoming(): Observable<Contract[]>{
    let url = environment.baseUrl + '/api/contract/allUpcoming';
    return this.http.get<Contract[]>(url);
  }

  getAllOld(): Observable<Contract[]>{
    let url = environment.baseUrl + '/api/contract/allOld';
    return this.http.get<Contract[]>(url);
  }

  getUpcomingByClient(clientId: number): Observable<Contract[]>{
    let url = environment.baseUrl + '/api/contract/upcomingByClient'+clientId;
    return this.http.get<Contract[]>(url);
  }

  getUpcomingByRoom(roomId: number): Observable<Contract[]>{
    let url = environment.baseUrl + '/api/contract/upcomingByRoom'+roomId;
    return this.http.get<Contract[]>(url);
  }

  getOldByRoom(roomId: number): Observable<Contract[]>{
    let url = environment.baseUrl + '/api/contract/oldByRoom'+roomId;
    return this.http.get<Contract[]>(url);
  }

  getOldByClient(clientId: number): Observable<Contract[]>{
    let url = environment.baseUrl + '/api/contract/oldByClient'+clientId;
    return this.http.get<Contract[]>(url);
  }

  getAllInactiveContracts(): Observable<Contract[]> {
    let url = environment.baseUrl + '/api/contract/allInactive';
    return this.http.get<Contract[]>(url);
  }

  getAllActiveContracts(){
    let url = environment.baseUrl + '/api/contract/allActive';
    return this.http.get<Contract[]>(url);
  }

  getPayments(){
    let url =  environment.baseUrl + '/api/payments'
    return this.http.get<Payment[]>(url); 
  }

  postContract(contract: Contract){
    console.log(contract);
    return this.http.post(environment.baseUrl + '/api/contract',contract);     
    }
}
