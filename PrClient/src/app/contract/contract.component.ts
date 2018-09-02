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

  constructor(private route: ActivatedRoute, private contractService: ContractsService) { }

  ngOnInit() {
    this.contractId = +this.route.snapshot.paramMap.get('id');
    this.contractService.getContract(this.contractId)
        .subscribe(response => this.contract = response);
    
  }

}
