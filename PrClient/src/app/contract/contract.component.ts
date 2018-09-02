import { Component, OnInit } from '@angular/core';
import { Contract } from '../models/contract';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  contract: Contract;

  constructor() { }

  ngOnInit() {
  }

}
