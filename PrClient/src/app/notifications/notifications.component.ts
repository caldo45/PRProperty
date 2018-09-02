import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ContractNotification } from '../models/ContractNotification';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {


  constructor(private notificationService: NotificationService) { }

  contractNotifications: ContractNotification[];
  unreadNotifications: ContractNotification[] = [];
  readNotifications: ContractNotification[] = [];

  ngOnInit() {
    this.getAndSortNotifications(this.contractNotifications, this.unreadNotifications,this.readNotifications );
  }

  markAsRead(contractNotification: ContractNotification){
    contractNotification.markedRead = 1;
    this.notificationService.markContractNotificationAsRead(contractNotification);
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
