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
  loading: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.getAndSortNotifications(this.contractNotifications, this.unreadNotifications,this.readNotifications );
  }

  markAsRead(contractNotification: ContractNotification){
    contractNotification.markedRead = 1;
    this.notificationService.markContractNotificationAsRead(contractNotification);
    this.unreadNotifications = this.unreadNotifications.filter(unreadNotif => unreadNotif.id !== contractNotification.id);
    this.readNotifications.push(contractNotification);
  }

  markAsDeleted(contractNotification: ContractNotification)
  {
    contractNotification.deleted = 1;
    this.notificationService.markContractNotificationAsRead(contractNotification);
    this.readNotifications = this.readNotifications.filter(unreadNotif => unreadNotif.id !== contractNotification.id); 
  }

  getAndSortNotifications(contractNotifications: ContractNotification[], unreadNotifications: ContractNotification[], readNotifications: ContractNotification[] ){
    this.notificationService.getContractNotifications()
    .subscribe(response => {
      this.contractNotifications = response;
      this.loading = false;
      for(let notification of this.contractNotifications) {
        if(notification.markedRead == 0)
        {
          this.unreadNotifications.push(notification);
        } else if(notification.deleted == 0)
        {
          this.readNotifications.push(notification);
        } 
      };          
      });
      
  }

}
