import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Login.component';
import {MenuComponent} from './menu/menu.component';
import {MusicComponent} from './music/music.component';
import {PublishComponent} from './publish/publish.component';
import {HistoryComponent} from './history/history.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: 'main', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ms', component: MusicComponent },
  { path: 'ps', component: PublishComponent },
  { path: 'mn', component: MenuComponent },
  { path: 'hs', component: HistoryComponent },
  { path: 'app', component: AppComponent }];

export const routing = RouterModule.forRoot(routes);
