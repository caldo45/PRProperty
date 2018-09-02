import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ContractNotification } from '../models/ContractNotification';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contractNotifications: ContractNotification[];
  unreadNotifications: ContractNotification[] = [];
  readNotifications: ContractNotification[] = [];


  constructor(private notificationService: NotificationService, public authService: AuthService) { }

  ngOnInit() {
    this.notificationService.activateNotifications(1);
    this.getAndSortNotifications(this.contractNotifications, this.unreadNotifications,this.readNotifications );     
  }

  getAndSortNotifications(contractNotifications: ContractNotification[], unreadNotifications: ContractNotification[], readNotifications: ContractNotification[] ){
    this.notificationService.getContractNotifications()
    .subscribe(response => {
      this.contractNotifications = response;
      for(let notification of this.contractNotifications) {
        if(notification.markedRead == 0)
        {
          this.unreadNotifications.push(notification);
        } else
        {
          this.readNotifications.push(notification);
        } 
      };          
      });
  }

}
