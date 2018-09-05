import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import { RoomService } from '../services/room.service';
import { NextOfKin } from '../models/nextOfKin';

@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.component.html',
  styleUrls: ['./next-of-kin.component.css']
})
export class NextOfKinComponent implements OnInit {

  nextOfKin: NextOfKin;


  constructor(private route: ActivatedRoute, private clientService:ClientsService, private roomService:RoomService) { 

  }

  ngOnInit() {
    let clientId = +this.route.snapshot.paramMap.get('id');
    this.clientService.getNextOfKin(clientId)
      .subscribe(res => this.nextOfKin = res);
  }

}
