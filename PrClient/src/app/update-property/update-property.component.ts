import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/Property';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent implements OnInit {

  property: Property;
  landlords: Client[];
  belfastLatitude: number;
  belfastLongitude: number;
  markerLatitude: number;
  markerLongitude: number;

  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private clientService: ClientsService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
        .subscribe(response => { this.property = response;
          this.markerLatitude = this.property.latitude;
          this.markerLongitude = this.property.longitude;
        });
    this.belfastLongitude = -5.928570;
    this.belfastLatitude = 54.595606;
    this.clientService.getClientsByType(2).subscribe(response => 
    this.landlords = response);     
    }

    addProperty(property: Property) {
      console.log(property);
     this.propertyService.postProperty(property);
    }

    onChoseLocation($event){
      this.markerLatitude = $event.coords.lat;
      this.markerLongitude = $event.coords.lng;
      this.property.longitude = this.markerLongitude;
      this.property.latitude = this.markerLatitude;
    }

}