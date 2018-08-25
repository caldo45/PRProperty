import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../services/contracts.service';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../models/contract';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  contract: Contract;
  room: Room;
  images: String[];

  constructor(private route: ActivatedRoute, private contractService: ContractsService, private roomService: RoomService, private _http: HttpClient) { }

  ngOnInit() {
  let roomId = +this.route.snapshot.paramMap.get('id');
   this.contractService.getActiveContract(roomId)
    .subscribe(response => this.contract = response);
  this.roomService.getRoom(roomId)
    .subscribe(response => this.room = response);
   this._http.get('https://picsum.photos/list')
    .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
    .subscribe(images => this.images = images);
  }

  private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });

}

}
