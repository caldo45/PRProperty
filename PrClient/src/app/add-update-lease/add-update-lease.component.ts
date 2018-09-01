import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property';
import { Lease } from '../models/lease';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-update-lease',
  templateUrl: './add-update-lease.component.html',
  styleUrls: ['./add-update-lease.component.css']
})
export class AddUpdateLeaseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { }

  properties: Property[];
  activeLease: Lease;
  propertyLeases: Lease[];
  propertyId: number;
  newLease: Lease;

  ngOnInit() {
    let propertyId = +this.route.snapshot.paramMap.get('id');
  }

}
