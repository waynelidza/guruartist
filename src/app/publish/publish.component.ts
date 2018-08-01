import {Component, OnInit, ViewChild} from '@angular/core';
import {SystemServiceService} from '../system-service.service';
import {LocalStorageService} from 'angular-2-local-storage';
import { DatepickerModule as YourAlias } from 'angular2-material-datepicker'
import any = jasmine.any;
import {JwtHelper} from 'angular2-jsonwebtoken';
import {Router} from '@angular/router';
@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  @ViewChild("fileInputpic") fileInputpic;
  @ViewChild("fileInputmp3") fileInputmp3;

  fileUploadPicture :any;
  fileuploadMp3:any;
  showform: true;
  showuplaodform: false;
  showSuccesMessage: false;
  disabledbutton:false;
   ContentID:any;
  Details: any;
  S3pics :any;
  S3mp3s :any;
  readyUpload:0;
  messageError ='';
      ErrorMessagepic="";
  ErrorMessagemp3="";
  date: Date = new Date();
  jwtHelper: JwtHelper = new JwtHelper();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  }
  uploadFile: any;

passedvalidation = 0;
  words2 = [{value: 'word1'}, {value: 'word2'}, {value: 'word3'}, {value: ''}];
  Upload = { title: '', ArtistMain: '', featuredArtist: '', userID: '', genre: '', origin: '', ReleaseDate: '', Iscr: '', labels : ' ', fileupload: '', S3mp3:  "",  S3cover: ''};
  constructor(public service: SystemServiceService, private localStorageService: LocalStorageService,private  router : Router) { }

  ngOnInit() {
    this.Upload.userID = this.localStorageService.get('UserId');
  this.showform = true;
  this.messageError='';
  this.Upload.ReleaseDate = Date.now();
  }


  add() {
    this.words2.push({value: 'gsre'});
  }

uploadFinal($event) {
this.readyUpload = 0;
 if(this.Upload.title==''){
 this.readyUpload++;
}
  if(this.Upload.ArtistMain==''){
    this.readyUpload++;
  }
  if(this.Upload.ArtistMain==''){
    this.readyUpload++;
  }

  if(this.Upload.userID==''){
    this.readyUpload++;
  }
  if(this.Upload.genre==''){
    this.readyUpload++;
  }
  if(this.Upload.origin==''){
    this.readyUpload++;
  }
  if(this.Upload.labels==''){
    this.readyUpload++;
  }
  if(this.Upload.ReleaseDate==''){
    this.readyUpload++;
  }
  if(this.readyUpload>0){

    this.messageError="please enter all fields  ";
  }else{
    this.service.uploadSingle(this.Upload.title, this.Upload.ArtistMain,this.Upload.featuredArtist, this.Upload.userID, this.Upload.genre,this.Upload.origin, this.Upload.labels, this.Upload.ReleaseDate, this.Upload.Iscr, this.S3pics, this.S3mp3s)
      .subscribe(
        data => {
          let jwt = this.jwtHelper.decodeToken(data.XRhI);


          if (jwt.response.message.toString() === 'created') {
            this.showuplaodform = true;
            this.showform = false;
            this.Details = jwt;
            this.ContentID = this.Details.response.details._id;
            this.disabledbutton = false;
          },
          error => {

          });
}


}

  uplaodFile($event) {
    this.disabledbutton = true;

    this.service
      .upload(this.fileUploadPicture, this.fileuploadMp3)
      .subscribe(res => {
        let jwt = this.jwtHelper.decodeToken(res.XRhI);
            console.log(jwt);
        if (jwt.message.message.toString() === 'uploaded') {
          console.log(jwt.message.S3mp3);
          console.log(jwt.message.S3pic);
            console.log(jwt.message);
          this.S3pics = jwt.message.S3pic;
          this.S3mp3s = jwt.message.S3mp3;
            this.updateDetails();
        } else {
        }


      });



  }
  clearError(){
    this.messageError ="";


  }
  clearErrorme(){


  }
updateDetails(){

  this.service
    .update(this.ContentID, this.S3pics,this.S3mp3s)
    .subscribe(res => {


      if (res.message.toString() === 'created') {
        this.showuplaodform = false;

      this.showSuccesMessage = true;

    }else{

    }
        // console.log(jwt.message.S3mp3);
        // console.log(jwt.message.S3pic);
        //   console.log(jwt.message);
        // this.S3pics = jwt.message.S3pic;
        // this.S3mp3s = jwt.message.S3mp3;




    });


}
  goDash(){
    this.router.navigate(['hs']);
  }

  addPic(fileInput: any) {


    this.passedvalidation = 0

    this.ErrorMessagepic ='';
    this.Upload=0;
    let fi = this.fileInputpic.nativeElement;

    if (fi.files && fi.files[0]) {
      this. fileUploadPicture = fi.files[0];
           let mp3file = fi.files[0].name.toString();
      if(!mp3file.includes('.jpg')){
        this.Upload++;
       this.ErrorMessagepic='only  jpeg  are allowed';
        this.passedvalidation++;
      }else{
        this.passedvalidation = 1;

      }






      // this.service
      //   .upload(fileToUpload)
      //   .subscribe(res => {
      //     console.log(res);
      //   });
  }


}
  addMp3(fileInput: any) {
    this.passedvalidation = 0

    this.ErrorMessagemp3 = '';
    this.Upload = 0;
    let fi = this.fileInputmp3.nativeElement;

    if (fi.files && fi.files[0]) {
      this.fileuploadMp3 = fi.files[0];
      let mp3file = fi.files[0].name.toString();
      if (!mp3file.includes('.mp3')) {

        this.ErrorMessagemp3 = 'only  mp3  are allowed';
        this.passedvalidation++;
      } else {
        this.passedvalidation = 1;
      }


    }
  }

}
