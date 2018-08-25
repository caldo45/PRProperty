import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property';
import { PropertyService } from '../services/property.service';

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

  constructor(private propertyService:PropertyService) { 
    this.filteredProperties = this.properties;
    this._listFilter = null;

  }

  ngOnInit() {
    this.propertyService.getProperties()
      .subscribe(response => {
        this.properties = response;
        this.filteredProperties = this.properties;
      });
      
  }

}
