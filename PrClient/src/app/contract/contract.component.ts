import { Component, OnInit } from '@angular/core';
import { Contract } from '../models/contract';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  contract: Contract;
  contractId: number;
  delete = false;
  deleteSuccess: boolean;
  userMessage: string = null;

  constructor(private route: ActivatedRoute, private contractService: ContractsService) { }

  ngOnInit() {
    this.contractId = +this.route.snapshot.paramMap.get('id');
    this.contractService.getContract(this.contractId)
        .subscribe(response => this.contract = response);
    
  }

  deleteStart(){
    this.delete = true;
  }

  cancelDelete(){
    this.delete = false;
  }

  deleteContract(contract: Contract){
    this.contractService.deleteContract(contract)
    .subscribe( res => {
      this.contract = res;
      this.deleteSuccess = true;
      this.userMessage = 'Contract Deleted';
  },
  err => {
      this.deleteSuccess = false;
      this.userMessage = 'Contract Could not be Deleted';
  }
 );
  }

}
