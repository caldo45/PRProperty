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


  constructor(private contractService: ContractsService) { }

  ngOnInit() {
    this.contractService.getPayments()
      .subscribe(response => this.payments = response);
  }

}
