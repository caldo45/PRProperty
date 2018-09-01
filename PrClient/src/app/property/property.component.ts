import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property';
import { Client } from '../models/client'
import { PropertyService } from '../services/property.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import { PropertyImage } from '../models/propertyImage';

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


    dir = undefined;

  constructor(private route: ActivatedRoute, private propertyService:PropertyService, private clientService:ClientsService, private roomService:RoomService) { 

  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
    .subscribe(response => {
        this.property = response;
        this.propertyService.getPropertyImages(id)
            .subscribe(response => this.images = response)
    });

    this.roomService.getRoomsByProperty(id)
    .subscribe(response => this.rooms = response);
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.geolocationPosition = position,
                  console.log(this.geolocationPosition)
          },
          error => {
              switch (error.code) {
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


  getDirection(geolocationPosition) {
    this.dir = {
      origin:  { lat: geolocationPosition.coords.latitude , lng: geolocationPosition.coords.longitude },
      destination: { lat: 54.57370300, lng: -5.91710600 }
  }
  
}




}
