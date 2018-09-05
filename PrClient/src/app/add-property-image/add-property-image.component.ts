import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property';
import { PropertyImage } from '../models/propertyImage';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from '../services/property.service';
import { environment } from '../environment';

@Component({
  selector: 'app-add-property-image',
  templateUrl: './add-property-image.component.html',
  styleUrls: ['./add-property-image.component.css']
})
export class AddPropertyImageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private fileService: FileService, private http: HttpClient, private propertyService: PropertyService) { }

  public progress: number;
  public message: string;
  success = true;
  id: number;
  property: Property;
  propertyImages: PropertyImage[];
  path;
  loading = false;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyImages(this.id)
      .subscribe(response => { this.propertyImages = response;
        for(let image of this.propertyImages){
          image.imagePath = environment.imageRoot + image.imagePath;
        }
      });

    this.propertyService.getProperty(this.id)
    .subscribe(response => {
      this.property = response;
    });
  }

  upload(files, path, id) {
    if (files.length === 0)
      return;


    const formData = new FormData();

    formData.append('assetId', id);
    formData.append('imageType', 'property');
    console.log(this.id);

    var ext;

    for (let file of files){
      formData.append(file.name, file);
      var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
    }

    if(ext == "jpg" || ext == "jpeg" || ext == "png"){
      this.fileService.uploadFiles(formData)
      .subscribe(response => {
        this.success = true;
        path = response;
        this.propertyService.getPropertyImages(this.id)
        .subscribe(response => { 
          this.propertyImages = response;
          for(let image of this.propertyImages){
            image.imagePath = environment.imageRoot + image.imagePath;
          }
        });
      })
    }else{
      this.success = false;
      this.message = "Please Ensure File is of Type JPG, JPEG or PNG";
    }


    }

    deleteImage(image: PropertyImage){
      this.propertyService.deletePropertyImage(image)
        .subscribe(response => {
          this.propertyImages = this.propertyImages.filter(propImage => propImage.id !== image.id);
        })
      

    }
  
}