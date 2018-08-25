import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  room: Room;

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.room = new Room();
    this.room.propertyId = id;
  }

  addRoom(room){
    this.roomService.postRoom(room);
  }

}

