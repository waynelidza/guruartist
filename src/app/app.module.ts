import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {LoginComponent} from './Login.component';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {SystemServiceService} from './system-service.service';
import {FormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MusicComponent } from './music/music.component';
import { PublishComponent } from './publish/publish.component';
import { HistoryComponent } from './history/history.component';
import {LocalStorageModule} from 'angular-2-local-storage';
import {Angular2JWTModule} from 'angular2-jsonwebtoken';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MusicComponent,
    PublishComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    Angular2JWTModule,
    NgDatepickerModule,
    HttpClientModule,
    FormsModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    routing,
  ],
  providers: [SystemServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
