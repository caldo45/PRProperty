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
  upcomingContracts: Contract[];
  oldContracts: Contract[];
  clientId: number;

  constructor(private contractService: ContractsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.contractService.getAllActiveContracts()
        .subscribe(response => this.activeContracts = response);
        this.contractService.getAllUpcoming()
          .subscribe(response => this.upcomingContracts = response);
        this.contractService.getAllOld()
          .subscribe(response => this.oldContracts = response);
  }

}
