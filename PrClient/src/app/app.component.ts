import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from './environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logoPath = environment.imageRoot +"default/logo.png"
;
  constructor(public authService: AuthService) {
    
    authService.handleAuthentication();
  }
}
