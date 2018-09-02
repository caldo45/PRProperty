import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ContractNotification } from '../models/ContractNotification';

@Component({
  selector: 'app-contract-notifications',
  templateUrl: './contract-notifications.component.html',
  styleUrls: ['./contract-notifications.component.css']
})
export class ContractNotificationsComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  contractNotifications: ContractNotification[];

  ngOnInit() {
    this.notificationService.getContractNotifications()
      .subscribe(response => this.contractNotifications = response);
  }

}
