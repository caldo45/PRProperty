import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';
import { Lease } from '../models/lease';
import { LeaseService } from '../services/lease.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-lease',
  templateUrl: './update-lease.component.html',
  styleUrls: ['./update-lease.component.css']
})
export class UpdateLeaseComponent implements OnInit {


  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private leaseService: LeaseService, private datePipe: DatePipe) { }

  activeLease: Lease;
  propertyId: number;
  lease: Lease;
  property: Property;
  saveSuccess: boolean;
  userMessage: string = null;
  uploadSuccess: number;
  loading = false;

  ngOnInit() {
    let leaseId = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.leaseService.getLease(leaseId)
        .subscribe(response => {
          this.lease = response;
          this.lease.dateFrom = this.datePipe.transform(this.lease.dateFrom, 'yyyy-MM-dd')
          this.lease.dateTo = this.datePipe.transform(this.lease.dateTo, 'yyyy-MM-dd')
          console.log(this.lease);
          this.propertyService.getProperty(this.lease.propertyId)
              .subscribe(response => {this.property = response;
              });
            this.loading = false;
        });
    
    
  }

  addLease(lease: Lease){
    console.log(lease);
    this.leaseService.postLease(lease)
    .subscribe( res => {
      this.saveSuccess = true;
      this.userMessage = 'Lease Updated';
  },
  err => {
      this.saveSuccess = false;
      this.userMessage = 'Lease Could Not Be Updated';
  }
 );

  }

}