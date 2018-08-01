import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { timeout } from 'rxjs/operators/timeout';
import 'rxjs/add/operator/map';
@Injectable()
export class SystemServiceService {
  private _url= 'assets/user.json';
  constructor(private http: HttpClient) { }


  login(email: string, password: string) {
    console.log('listen');
    return this.http.post<any>('http://localhost:2000/login', { email: email, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response

        return user;
      });
  }


  mycontents(UserID: string) {
    console.log('listen');
    return this.http.post<any>('http://localhost:2000/mycontents', { userID: UserID})
      .map(user => {
        // login successful if there's a jwt token in the response

        return user;
      });
  }
  register(email: string, password: string, status: string) {
    console.log('listen');
    return this.http.post<any>('http://localhost:2000/register', { email: email, password: password , status: status})
      .map(user => {
        // login successful if there's a jwt token in the response

        return user;
      });
  }



  update(id: string, s3locationCover: string, s3locationmp3: string) {
    console.log('listen');
    return this.http.post<any>(`http://localhost:2000/up/${id}`, { s3locationCover: s3locationCover, s3locationmp3: s3locationmp3})
      .map(user => {
        // login successful if there's a jwt token in the response

        return user;
      });
  }







  uploadSingle(title: string, ArtistMain: string, featuredArtist:string, userID: string, genre: string, origin: string, label: string, ReleaseDate: string, Iscr: string, S3mp3: string, S3Cover: string) {

    return this.http.post<any>('http://localhost:2000/uploadfinal', { title: title, ArtistMain: ArtistMain , FeaturedArtist: featuredArtist, userID: userID, genre: genre, origin: origin, label: label, ReleaseDate: ReleaseDate, Iscr: Iscr, s3locationCover: '0', s3locationmp3: '0'})
      .map(user => {
        // login successful if there's a jwt token in the response

        return user;
      });
  }
  getRoles() {
    return this.http.get<any>(this._url)
      .map(user => {
        // login successful if there's a jwt token in the response

        return user;
      });
  }
  logout() {
    // remove user from local storage to log user out

  }
  upload(fileToUploadpic: any,fileToUploadmp3: any) {
    let input = new FormData();
    let data =new FormData();
    input.append("file", fileToUploadpic);
    input.append("file", fileToUploadmp3);

    return this.http
      .post<any>("http://localhost:2000/uploads", input)

      .map(user => {


        return user;
      });






  }

}
