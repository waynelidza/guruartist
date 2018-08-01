import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {SystemServiceService} from '../system-service.service';
import {JwtHelper} from 'angular2-jsonwebtoken';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userID:any;
  jwtHelper: JwtHelper = new JwtHelper();
  Content:any;
  constructor(private localStorageService: LocalStorageService,public service: SystemServiceService) { }

  ngOnInit() {
    this.userID = this.localStorageService.get('UserId');
    this.getmycontents();
  }

getmycontents(){
  this.service.mycontents(this.userID)
    .subscribe(
      data => {
        // let jwt = this.jwtHelper.decodeToken(data.XRhI);
         this.Content = data.data;

        console.log(data);

        error => {

        });



}

}


}
