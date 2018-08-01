import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {SystemServiceService} from './system-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  Adminlogin = {email: '', password: ''};
  showmessage = false;
  ErrorMessage = '';
  // Adminlogin = {username: '', password: ''};
  User = {email: '', password: '', status: ''};


  shownMenu = false;
  showLoginBar = true;
  varcounterrorLogin =0;
  shownVerify = false;
  showMain = false;
  hideRegister = false;
  constructor(public service: SystemServiceService, private router: Router) {
  }
  letsLogin() {
    this.ErrorMessage = '';
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
else{
      this.service.login(this.User.email, this.User.password)
        .subscribe(
          data => {
            if(data.auth.toString()==='true'){
              this.router.navigate(['mn']);

            }


          },
          error => {
            console.log(error.status); if (error.status === 401) {
              console.log('hey');
            }
            if (error.status === 401) {
              console.log('hey');
              this.ErrorMessage = 'Incorrect username  or password contact Admin';
            }

            if (error.status === 200) {
              console.log('in');
              this.router.navigate(['app']);
            }
            if (error.status === 0) {
              this.ErrorMessage = 'No internet connection  or server is down';
            }
          });
    }
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
              console.log('DONE');
            }
            if (error.status === 0) {
              this.ErrorMessage = 'No internet connection  or server is down';
            }
          });

    }
  }

}
