import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';
import { Contract } from '../models/contract';
import { ContractsService } from '../services/contracts.service';

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

  constructor(private route: ActivatedRoute, private roomService:RoomService, private propertyService:PropertyService, private contractService: ContractsService) { }

  ngOnInit() {
    let propertyId = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomsByProperty(propertyId)
      .subscribe(response => {
        this.rooms = response;
        this.contractService.getActiveContracts(propertyId)
        .subscribe(response => {
          this.contracts = response;
          for(let room of this.rooms){
            for(let contract of this.contracts){
              if(contract.roomId === room.id){
               // (room.activeContract = 1)
               (room.contract = contract) && (room.activeContract = 1)              
              }
            }
          }
          console.log(this.rooms);
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
