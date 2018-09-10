import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property';
import { Client } from '../models/client'
import { PropertyService } from '../services/property.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import { PropertyImage } from '../models/propertyImage';
import { environment } from '../environment';
import { Lease } from '../models/lease';
import { LeaseService } from '../services/lease.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  property: Property;
  client: Client;
  rooms: Room[];
  markerLatitude: number;
  markerLongitude: number;
  geolocationPosition: {};
  images: PropertyImage[];
  loading: boolean = false;
  activeLease: Lease;
  delete = false;
  deleted = false;
  deletedProperty: Property;
  userMessage: string;
  deleteFailed = false;


    dir = undefined;

  constructor(private route: ActivatedRoute, private propertyService:PropertyService, private clientService:ClientsService, private roomService:RoomService, private leaseService: LeaseService) { 

  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.propertyService.getProperty(id)
    .subscribe(response => {
        this.property = response;
        this.leaseService.getActiveLeaseProperty(id)
            .subscribe( response => this.activeLease = response);
        this.propertyService.getPropertyImages(id)
            .subscribe(response => {
                this.images = response;
                for(let img of this.images){
                    img.imagePath = environment.imageRoot + img.imagePath;
                }
                this.loading = false;
            });
    });

    this.roomService.getRoomsByProperty(id)
    .subscribe(response => this.rooms = response);
    /** Request Access to Users Location */
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              /** Save Position to Local Veriable */
              this.geolocationPosition = position,
                  console.log(this.geolocationPosition)
          },
          error => {
              switch (error.code) {
                  /** Console Log permission errors */
                  case 1:
                      console.log('Location Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };
  }

  /** Method calls get Direction from current location to Propert Location  */
  getDirection(geolocationPosition, property) {
    this.dir = {
      origin:  { lat: geolocationPosition.coords.latitude , lng: geolocationPosition.coords.longitude },
      destination: { lat: this.property.latitude, lng: this.property.longitude}
  }  
}

clickDelete(){
    this.delete =true;
}
cancelDelete(){
    this.delete = false;
}
deleteProperty(property){
    this.propertyService.deleteProperty(property)
        .subscribe( res => {
            this.deletedProperty = res;
            if(this.deletedProperty.id ==0){
                this.deleted = true;
                this.userMessage = 'Property Deleted';
            }else {
                this.deleteFailed = true;
                this.userMessage = 'Error Deleting Property Details, Please Ensure Property Has No Leases or Contracts';
            }
        });
}


}
