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
import { AddRoomPhotoComponent } from './add-room-photo/add-room-photo.component';
import { AddPropertyImageComponent } from './add-property-image/add-property-image.component';
import { Payment } from './models/payment';
import { PaymentsComponent } from './payments/payments.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './services/auth.service';
import { RouteGuardService } from './services/route-guard.service';
import { UpdateClientComponent } from './update-client/update-client.component';
import { UpdatePropertyComponent } from './update-property/update-property.component';
import { AddLeaseComponent } from './add-lease/add-lease.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';

const routes: Routes = [
  { path: 'properties', component: PropertiesComponent},
  { path: 'properties/:id', component: PropertyComponent},
  { path: 'clients', component: ClientsComponent, canActivate: [RouteGuardService]},
  { path: 'clients/:id', component: ClientComponent},
  { path: 'rooms/:id', component: RoomsInPropertyComponent},
  { path: 'addUser', component: AddUserComponent },
  { path: 'test', component: TestComponent},
  { path: 'addProperty', component: AddPropertyComponent},
  { path: 'addRoom/:id', component: AddRoomComponent},
  { path: 'room/:id', component: RoomComponent},
  { path: 'mapTest', component: MapTestComponent},
  { path: 'addContract/:id', component: AddContractComponent },
  { path: 'addClientPhoto/:id', component: AddClientPhotoComponent},
  { path: 'addRoomPhoto/:id', component: AddRoomPhotoComponent},
  { path: 'addPropertyImage/:id', component: AddPropertyImageComponent},
  { path: 'payments', component: PaymentsComponent},
  { path: 'addPayment', component: AddPaymentComponent},
  { path: 'home', component: HomeComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'updateClient/:id', component: UpdateClientComponent},
  { path: 'updateProperty/:id', component: UpdatePropertyComponent},
  { path: 'addLease/:id', component: AddLeaseComponent},
  { path: 'callback', component: CallbackComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'contracts/:id', component: ContractsComponent},
  { path: 'contract/:id', component: ContractComponent}
 // { path: '**', component: PageNotFoundComponent }
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
