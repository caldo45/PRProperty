import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property';
import { PropertyService } from '../services/property.service';
import { LeaseService } from '../services/lease.service';
import { Lease } from '../models/lease';
import { PropertyImage } from '../models/propertyImage';
import { environment } from '../environment';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties: Property[] = [];
  _listFilter: string;
  filteredProperties: Property[] = [];
  pageTitle: 'Properties';
  activeLeases: Lease[] = [];
  propertiesImages: PropertyImage[] = [];
  loading: boolean = false;
  imageRoot = environment.imageRoot;

  constructor(private propertyService:PropertyService, private leaseService: LeaseService) { 
    this.filteredProperties = this.properties;
    this._listFilter = null;

  }

  performFilter(filterBy: string): Property[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.properties.filter((property: Property) =>
            property.firstLineAddress.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProperties= this.listFilter ? this.performFilter(this.listFilter) : this.properties;
  }



  ngOnInit() {
    this.loading = true;
    this.propertyService.getProperties()
      .subscribe(response => {
        this.properties = response;
        this.propertyService.getImageForEachProperty()
            .subscribe(response => {
              this.propertiesImages = response;
              for(let property of this.properties){
                property.imagePath = environment.imageRoot + "default/defaultImage.jpg";
                for(let image of this.propertiesImages){                  
                  if(image.propertyId == property.id){
                    property.imagePath = this.imageRoot +  image.imagePath
                  }
                }
              }
              this.loading = false;
            });
        this.filteredProperties = this.properties;
        this.leaseService.getActiveLeases()
            .subscribe(response => { this.activeLeases = response;
                for(let lease of this.activeLeases){
                  for(let property of this.properties){
                    if(lease.propertyId == property.id){
                      (property.lease = lease) && (property.activeLease = 1);
                    }
                  }       
                }
      });
    });
   
  }

}
