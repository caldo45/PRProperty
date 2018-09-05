import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../services/contracts.service';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../models/contract';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { RoomImage } from '../models/roomImage';
import { environment } from '../environment';



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  contract: Contract;
  room: Room;
  images: RoomImage[];
  oldContracts: Contract[];
  upcomingContracts: Contract[];
  loading = false;

  constructor(private route: ActivatedRoute, private contractService: ContractsService, private roomService: RoomService, private _http: HttpClient) { }

  ngOnInit() {
  let roomId = +this.route.snapshot.paramMap.get('id');
   this.contractService.getActiveContract(roomId)
    .subscribe(response => { this.contract = response;
     this.roomService.getRoom(roomId)
    .subscribe(response => this.room = response);
    this.contractService.getUpcomingByRoom(roomId)
      .subscribe(response => this.upcomingContracts = response);
    this.contractService.getOldByRoom(roomId)
      .subscribe(response => this.oldContracts = response);
    this.roomService.getRoomPhotos(roomId)
      .subscribe(response => {
        this.images = response;
        for(let image of this.images){
          image.imagePath = environment.imageRoot + image.imagePath;
        }
      });
    });

  }


}
