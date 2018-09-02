import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/payment';
import { ContractsService } from '../services/contracts.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  $: any;
  payments: Payment[];
  startDate: Date;
  endDate: Date;
  filteredPayments: Payment[] = [];
  filters: {clientType: string };
  loaded = false;

  constructor(private contractService: ContractsService) {
    this.startDate = null;
    this.endDate = null;
  }

  ngOnInit() {
    this.contractService.getPayments()
      .subscribe(response => {
        this.payments = response;
        this.filteredPayments = this.payments;
        this.loaded = true;
      });
  }

  updatePayments() {
    if (this.startDate) {
      this.filteredPayments = this.payments.filter(payment =>
        payment.date >= this.startDate);
    } else {
      this.filteredPayments = this.payments;
    }

    if (this.endDate) {
      this.filteredPayments = this.filteredPayments.filter(payment => 
        payment.date <= this.endDate);
    }
  }

  resetFilters() {
    this.startDate = null;
    this.endDate = null;
    this.filteredPayments = this.payments;
  }

}
