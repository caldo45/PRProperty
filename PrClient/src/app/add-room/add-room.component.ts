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
  saveSuccess: boolean;
  userMessage: string = null;
  propertyId: number;

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.paramMap.get('id');
    this.room = new Room();
    this.room.propertyId = this.propertyId;
  }

  addRoom(room){
    this.roomService.postRoom(room)
    .subscribe( res => {
      this.saveSuccess = true;
      this.userMessage = 'Room Added';
  },
  err => {
      this.saveSuccess = false;
      this.userMessage = 'Problem Adding Room, Please Try Again';
  }
 );
  }

}

