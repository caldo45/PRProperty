import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyService } from './services/property.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import { PropertyComponent } from './property/property.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { RoomComponent } from './room/room.component';
import { RoomsInPropertyComponent } from './rooms-in-property/rooms-in-property.component';
import { AddUserComponent } from './add-user/add-user.component';
import { TestComponent } from './test/test.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { AddContractComponent } from './add-contract/add-contract.component';
import { ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MapTestComponent } from './map-test/map-test.component';
import { AgmDirectionModule } from 'agm-direction';
import { PapaParseModule } from 'ngx-papaparse';
import { AddClientPhotoComponent } from './add-client-photo/add-client-photo.component';
import { AddRoomPhotoComponent } from './add-room-photo/add-room-photo.component';
import { AddPropertyImageComponent } from './add-property-image/add-property-image.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './callback/callback.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { AddUpdateLeaseComponent } from './add-update-lease/add-update-lease.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { UpdatePropertyComponent } from './update-property/update-property.component';
import { AddLeaseComponent } from './add-lease/add-lease.component';



@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    ClientsComponent,
    ClientComponent,
    PropertyComponent,
    AddClientComponent,
    AddPropertyComponent,
    RoomComponent,
    RoomsInPropertyComponent,
    AddUserComponent,
    TestComponent,
    ContractsComponent,
    AddRoomComponent,
    AddContractComponent,
    MapTestComponent,
    AddClientPhotoComponent,
    AddRoomPhotoComponent,
    AddPropertyImageComponent,
    PaymentsComponent,
    AddPaymentComponent,
    HomeComponent,
    CallbackComponent,
    AddUpdateLeaseComponent,
    UpdateClientComponent,
    UpdatePropertyComponent,
    AddLeaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBIJj57SZFm_FgT55Uqwq-tVZjMyM5KGw4'
    }),
    AgmDirectionModule,
    PapaParseModule,
    NgbModule,
    MatButtonModule, 
    MatCheckboxModule, 
    BrowserAnimationsModule,
    MatCardModule, 


  ],
  providers: [PropertyService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
