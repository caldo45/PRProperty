import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit() {
    this.notificationService.activateNotifications(1);
    
   
  }

}
