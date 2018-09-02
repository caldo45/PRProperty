import { Component, OnInit } from '@angular/core';
import { Contract } from '../models/contract';
import { ContractsService } from '../services/contracts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  activeContracts: Contract[];
  inactiveContracts: Contract[];
  clientId: number;

  constructor(private contractService: ContractsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.clientId = +this.route.snapshot.paramMap.get('id');
    this.contractService.getAllActiveContracts()
        .subscribe(response => this.activeContracts = response);
        this.contractService.getAllInactiveContracts()
          .subscribe(response => this.inactiveContracts = response);
  }

}
