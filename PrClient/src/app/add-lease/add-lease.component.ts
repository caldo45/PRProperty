import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';
import { Lease } from '../models/lease';
import { LeaseService } from '../services/lease.service';

@Component({
  selector: 'app-add-lease',
  templateUrl: './add-lease.component.html',
  styleUrls: ['./add-lease.component.css']
})
export class AddLeaseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private leaseService: LeaseService) { }

  activeLease: Lease;
  propertyId: number;
  newLease: Lease;
  property: Property;

  ngOnInit() {
    let propertyId = +this.route.snapshot.paramMap.get('id');
    this.newLease = new Lease();
    this.newLease.propertyId = propertyId;
    console.log(propertyId);
    this.leaseService.getActiveLeaseProperty(propertyId)
        .subscribe(response => {
          this.activeLease = response;
          console.log(this.activeLease);
          this.propertyService.getProperty(propertyId)
              .subscribe(response => {this.property = response;
              console.log(this.property);
              });
        });
    
    
  }

  addLease(newLease: Lease){
    console.log(newLease);
    this.leaseService.postLease(newLease);

  }

}