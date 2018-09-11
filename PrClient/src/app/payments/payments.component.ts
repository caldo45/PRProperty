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
  loading = false;
  deletedPayment: Payment;
  delete: boolean;
  userMessage: string;


  constructor(private contractService: ContractsService) {
    this.startDate = null;
    this.endDate = null;
  }

  ngOnInit() {
    this.loading = true;
    this.contractService.getPayments()
      .subscribe(response => {
        this.payments = response;
        this.filteredPayments = this.payments;
        this.loading = false;
      });
  }

  updatePayments() {
    if (this.startDate) {
      this.filteredPayments = this.payments.filter(payment =>
        new Date(payment.date).getTime() >= new Date(this.endDate).getTime());
    } else {
      this.filteredPayments = this.payments;
    }

    if (this.endDate) {
      this.filteredPayments = this.filteredPayments.filter(payment =>
        new Date(payment.date).getTime() <= new Date(this.endDate).getTime());
    }
  }

  resetFilters() {
    this.startDate = null;
    this.endDate = null;
    this.filteredPayments = this.payments;
  }

  deletePayment(payment: Payment){
    this.contractService.deletePayment(payment)
      .subscribe(response => {
          this.deletedPayment = response;
            this.delete = true;
            this.userMessage = "Payment Deleted";
           this.filteredPayments = this.filteredPayments.filter(filteredPayments => filteredPayments.id !== payment.id);          
    });
  }

}
