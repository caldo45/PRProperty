import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';
import { Contract } from '../models/contract';
import { ContractsService } from '../services/contracts.service';
import { RoomImage } from '../models/roomImage';
import { environment } from '../environment';

@Component({
  selector: 'app-rooms-in-property',
  templateUrl: './rooms-in-property.component.html',
  styleUrls: ['./rooms-in-property.component.css']
})
export class RoomsInPropertyComponent implements OnInit {

  rooms: Room[];
  contract: Contract;
  property: Property;
  contracts: Contract[];
  roomsImage: RoomImage[];

  constructor(private route: ActivatedRoute, private roomService:RoomService, private propertyService:PropertyService, private contractService: ContractsService) { }

  ngOnInit() {
    let propertyId = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomsByProperty(propertyId)
      .subscribe(response => {
        this.rooms = response;
        this.roomService.getRoomsImage(propertyId)
          .subscribe(response => {
            this.roomsImage = response;
            console.log(this.rooms);
            console.log(this.roomsImage);
            for(let room of this.rooms){
              for(let roomImage of this.roomsImage){
                room.imagePath = environment.imageRoot + "default/defaultImage.jpg";
                if(room.id == roomImage.roomId){
                  room.imagePath = environment.imageRoot + roomImage.imagePath;
                }
              }

            }
          });
        this.contractService.getActiveContracts(propertyId)
        .subscribe(response => {
          this.contracts = response;
          for(let room of this.rooms){
            for(let contract of this.contracts){
              if(contract.roomId === room.id){
               (room.contract = contract) && (room.activeContract = 1)              
              }
            }
          }    
          //loop through rooms and contracts - if there is a contract for the room set property contractId to id of contract
        });  
      });
    this.propertyService.getProperty(propertyId)
      .subscribe(response => {
        this.property = response;
      });    
  }

  logRooms(contracts){
    console.log(contracts);
  }

  checkIfRoomHasActive(contracts, rooms){
    for(let room of rooms){
      if(contracts.roomId === room.id){
       (room.activeContract = 1)
      }
    }
  }

}
