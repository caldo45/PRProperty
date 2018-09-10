import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/Property';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  property: Property;
  landlords: Client[];
  belfastLatitude: number;
  belfastLongitude: number;
  markerLatitude: number;
  markerLongitude: number;
  saveSuccess: boolean;
  userMessage: string = null;
  @ViewChild('addPropertyForm') form;

  constructor(private propertyService: PropertyService, private clientService: ClientsService) { }

  ngOnInit() {
    this.property = new Property();
    this.belfastLongitude = -5.928570;
    this.belfastLatitude = 54.595606;
    this.clientService.getClientsByType(2).subscribe(response => 
    this.landlords = response);     
    }

    addProperty(property: Property) {
      if(this.form.invalid){
        this.saveSuccess = false;
        this.userMessage = 'Please Check Details are Correct';

      }else{
        this.propertyService.postProperty(property)
        .subscribe( res => {
          this.property = res;
          this.saveSuccess = true;
          this.userMessage = 'Property Details Saved';
      },
      err => {
          this.saveSuccess = false;
          this.userMessage = 'Error Saving Property Details';
      }
     );
      }

  }

    onChoseLocation($event){
      this.markerLatitude = $event.coords.lat;
      this.markerLongitude = $event.coords.lng;
      this.property.longitude = this.markerLongitude;
      this.property.latitude = this.markerLatitude;
    }

}
