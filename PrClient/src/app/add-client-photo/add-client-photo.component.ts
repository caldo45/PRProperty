import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { HttpClient } from '@angular/common/http';
import { uploadClientImage } from '../models/uploadImage';
import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client';
import { environment } from '../environment';

@Component({
  selector: 'app-add-client-photo',
  templateUrl: './add-client-photo.component.html',
  styleUrls: ['./add-client-photo.component.css']
})
export class AddClientPhotoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private fileService: FileService, private http: HttpClient, private clientService: ClientsService) { }

  public progress: number;
  public message: string;
  id: number;
  client: Client;
  imgPath: string;
  path;
  loading = false;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(this.id)
    .subscribe(response => {
      this.client = response;
      this.imgPath = environment.imageRoot + this.client.imagePath;
      console.log(this.imgPath)});
  }

  upload(files, path, imgPath, id) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    formData.append('assetId', id);
    formData.append('imageType', 'client');
    console.log(this.id);

    for (let file of files)
      formData.append(file.name, file);

    this.fileService.uploadFiles(formData)
      .subscribe(response => {
        path = response;
        console.log(path);
        this.imgPath = environment.imageRoot + path;
      })
    }
  
}
