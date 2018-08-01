import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SystemServiceService} from './system-service.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {JwtHelper} from 'angular2-jsonwebtoken';
import {LocalStorageService} from 'angular-2-local-storage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  Adminlogin = {username: '', password: ''};
  User = {email: '', password: '', status: ''};
  showmessage = false;
  ErrorMessage = '';
  jwtHelper: JwtHelper = new JwtHelper();
  shownMenu = false;
 showLoginBar = true;
  varcounterrorLogin =0;
  shownVerify = false;
  showMain = false;
  LoggedIn = false;
  hideRegister = false;
  constructor(public service: SystemServiceService, public router: Router, private localStorageService: LocalStorageService) {
  }
  ngOnInit() {
 const status =    this.localStorageService.get("email");
 if(status.toString()===""){
   this.LoggedIn = false;
 }else{
   this.LoggedIn = true;
 }
  }


  letsLogin() {
   this.ErrorMessage = '';
    console.log('here');

    this.service.login(this.User.email, this.User.password)
      .subscribe(
        data => {
          console.log(data.token);

         //  console.log(data.auth);
         if(data.auth.toString()==='true'){

          let jwt = this.jwtHelper.decodeToken(data.token);
           this.localStorageService.set("email",jwt.user.email);
           this.localStorageService.set("UserId",jwt.user._id);

           this.LoggedIn = true;
            this.router.navigate(['ps']);
         }

        },
        error => {
        if (error.status === 401) {
          this.ErrorMessage = 'Incorrect username  or password contact Admin';
        }

          if (error.status === 200) {
            console.log('in');

          }
          if (error.status === 0) {
            this.ErrorMessage = 'No internet connection  or server is down';
          }
              });

  }
  letsRegsiter() {
    console.log('hy');
    this.ErrorMessage === '';
    this.varcounterrorLogin = 0;
    if ( this.User.password === '') {
      this.varcounterrorLogin++;
    }
    if ( this.User.email === '') {
      this.varcounterrorLogin++;

    }

    if(this.varcounterrorLogin>0){
      this.ErrorMessage = ' Email or password cannot be blank';
    }
else {


        this.service.register(this.User.email.toLowerCase( ), this.User.password, this.User.status = '0')
          .subscribe(
            data => {
              console.log(data.message);
              if (data.message === 'created') {
                // this.ErrorMessage = 'Verfication Code has been sent to '+this.User.email+'';
                // document.getElementById('close').click();
                //          console.log('heydd');

                this.shownVerify = true;
                this.hideRegister = true;
              }


            },
            error => {
              console.log(error.status); if (error.status === 401) {

              }
              if (error.status === 401) {
                console.log('hey');
                this.ErrorMessage = 'Incorrect username  or password contact Admin';
              }

              if (error.status === 409) {

                this.ErrorMessage = 'Incorrect username  or password contact Admin';

              }
              if (error.status === 0) {
                this.ErrorMessage = 'No internet connection  or server is down';
              }
            });

      }
    }
logout(){
    this.localStorageService.clearAll();


  console.log('log');
}


}
