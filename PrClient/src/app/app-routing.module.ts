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
import { AdminGuardService } from './services/admin-guard-service.service';
import { UpdateClientComponent } from './update-client/update-client.component';
import { UpdatePropertyComponent } from './update-property/update-property.component';
import { AddLeaseComponent } from './add-lease/add-lease.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';
import { UpdateContractComponent } from './update-contract/update-contract.component';
import { NextOfKinComponent } from './next-of-kin/next-of-kin.component';
import { AddNextOfKinComponent } from './add-next-of-kin/add-next-of-kin.component';

const routes: Routes = [
  { path: 'properties', component: PropertiesComponent, canActivate: [RouteGuardService]},
  { path: 'properties/:id', component: PropertyComponent, canActivate: [RouteGuardService]},
  { path: 'clients', component: ClientsComponent, canActivate: [RouteGuardService]},
  { path: 'clients/:id', component: ClientComponent, canActivate: [RouteGuardService]},
  { path: 'rooms/:id', component: RoomsInPropertyComponent, canActivate: [RouteGuardService]},
  { path: 'addUser', component: AddUserComponent, canActivate: [RouteGuardService] },
  { path: 'test', component: TestComponent, canActivate: [RouteGuardService]},
  { path: 'addProperty', component: AddPropertyComponent, canActivate: [RouteGuardService]},
  { path: 'addRoom/:id', component: AddRoomComponent, canActivate: [RouteGuardService]},
  { path: 'room/:id', component: RoomComponent, canActivate: [RouteGuardService]},
  { path: 'mapTest', component: MapTestComponent, canActivate: [RouteGuardService]},
  { path: 'addContract/:id', component: AddContractComponent, canActivate: [RouteGuardService]},
  { path: 'addClientPhoto/:id', component: AddClientPhotoComponent, canActivate: [RouteGuardService]},
  { path: 'addRoomPhoto/:id', component: AddRoomPhotoComponent, canActivate: [RouteGuardService]},
  { path: 'addPropertyImage/:id', component: AddPropertyImageComponent, canActivate: [RouteGuardService]},
  { path: 'payments', component: PaymentsComponent, canActivate: [RouteGuardService]},
  { path: 'addPayment', component: AddPaymentComponent, canActivate: [AdminGuardService]},
  { path: 'home', component: HomeComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'updateClient/:id', component: UpdateClientComponent, canActivate: [RouteGuardService]},
  { path: 'updateProperty/:id', component: UpdatePropertyComponent, canActivate: [RouteGuardService]},
  { path: 'addLease/:id', component: AddLeaseComponent, canActivate: [AdminGuardService]},
  { path: 'callback', component: CallbackComponent},
  { path: 'notifications', component: NotificationsComponent, canActivate: [AdminGuardService]},
  { path: 'contracts', component: ContractsComponent, canActivate: [AdminGuardService]},
  { path: 'contract/:id', component: ContractComponent, canActivate: [AdminGuardService]},
  { path: 'updateContract/:id', component: UpdateContractComponent, canActivate: [AdminGuardService]},
  { path: 'nextOfKin/:id', component: NextOfKinComponent, canActivate: [RouteGuardService] },
  { path: 'addNextOfKin/:id', component: AddNextOfKinComponent, canActivate: [RouteGuardService]}
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
