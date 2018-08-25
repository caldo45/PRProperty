import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties/properties.component';
import { ClientsComponent } from './clients/clients.component';
import { PropertyComponent } from './property/property.component';
import { ClientComponent } from './client/client.component';
import { RoomsInPropertyComponent } from './rooms-in-property/rooms-in-property.component';
import { AddUserComponent } from './add-user/add-user.component';
import { TestComponent } from './test/test.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomComponent } from './room/room.component';
import { MapTestComponent } from './map-test/map-test.component';
import { AddContractComponent } from './add-contract/add-contract.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddClientPhotoComponent } from './add-client-photo/add-client-photo.component';

const routes: Routes = [
  { path: 'properties', component: PropertiesComponent},
  { path: 'properties/:id', component: PropertyComponent},
  { path: 'clients', component: ClientsComponent},
  { path: 'clients/:id', component: ClientComponent},
  { path: 'rooms/:id', component: RoomsInPropertyComponent},
  { path: 'addUser', component: AddUserComponent },
  { path: 'test', component: TestComponent},
  { path: 'addProperty', component: AddPropertyComponent},
  { path: 'addRoom/:id', component: AddRoomComponent},
  { path: 'room/:id', component: RoomComponent},
  { path: 'mapTest', component: MapTestComponent},
  { path: 'addContract/:id', component: AddContractComponent },
  { path: 'addClientPhoto/:id', component: AddClientPhotoComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
