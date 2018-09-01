import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/payment';
import { ContractsService } from '../services/contracts.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[];
  _listFilterStart: Date;
  _listFilterEnd: Date;
  filteredPayments: Payment[] = [];
  filters: {clientType:string}


  constructor(private contractService: ContractsService) { 
    this.filteredPayments = this.payments;
    this._listFilterStart = null;
    this._listFilterEnd = null;
  }

  ngOnInit() {
    this.contractService.getPayments()
      .subscribe(response => this.payments = response);
  }

}
