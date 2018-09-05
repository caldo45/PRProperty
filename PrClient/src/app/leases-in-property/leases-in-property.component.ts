import { Component, OnInit } from '@angular/core';
import { LeaseService } from '../services/lease.service';
import { Lease } from '../models/lease';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';

@Component({
  selector: 'app-leases-in-property',
  templateUrl: './leases-in-property.component.html',
  styleUrls: ['./leases-in-property.component.css']
})
export class LeasesInPropertyComponent implements OnInit {

  constructor(private leaseService: LeaseService, private route: ActivatedRoute, private propertyService: PropertyService) { }

  activeLease: Lease;
  upcomingLeases: Lease[];
  oldLeases: Lease[];
  property: Property;

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
        .subscribe(response => this.property = response);
    this.leaseService.getActiveLeaseProperty(id)
        .subscribe(response => {
          this.activeLease = response;
          console.log(this.activeLease);
        });
    this.leaseService.getUpcomingLeasesByProperty(id)
        .subscribe(response => this.upcomingLeases = response);
    this.leaseService.getOldLeasesByProperty(id)
        .subscribe(response => this.oldLeases = response);
  }

}
