import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';

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
  imgPath: string;
  imgPaths: string[];
  path;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(this.id)
    .subscribe(response => this.room = response);
  }

  upload(files, path, imgPath, id, imgPaths) {
    if (files.length === 0)
      return;
    const formData = new FormData();

    formData.append('roomId', id);
    console.log(this.id);

    for (let file of files)
      formData.append(file.name, file);

    this.fileService.uploadFiles(formData)
      .subscribe(response => {
        path = response;
        console.log(path);
        this.imgPath = path;
        imgPaths.add(this.imgPath);
        console.log(this.imgPaths);
      })
    }
  
}
