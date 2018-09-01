import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import { RoomImage } from '../models/roomImage';

@Component({
  selector: 'app-add-room-photo',
  templateUrl: './add-room-photo.component.html',
  styleUrls: ['./add-room-photo.component.css']
})
export class AddRoomPhotoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private fileService: FileService, private http: HttpClient, private roomService: RoomService) { }

  public progress: number;
  public message: string;
  id: number;
  room: Room;
  roomImages: RoomImage[];
  imgPaths: string[] = [];
  path;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomPhotos(this.id)
      .subscribe(response => { this.roomImages = response;
      console.log(this.roomImages)
      });

    this.roomService.getRoom(this.id)
    .subscribe(response => {
      this.room = response;
      console.log(this.room);
    });
  }

  upload(files, path, imgPaths, id) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    formData.append('assetId', id);
    formData.append('imageType', 'room');
    console.log(this.id);

    for (let file of files)
      formData.append(file.name, file);

    this.fileService.uploadFiles(formData)
      .subscribe(response => {
        path = response;
        this.roomService.getRoomPhotos(this.id)
        .subscribe(response => this.roomImages = response);

      })
    }
  
}