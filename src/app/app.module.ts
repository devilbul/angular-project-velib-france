import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {GoogleMapComponent} from './google-map/google-map.component';
import {JcdecauxService} from './jcdecaux.service';
import {HttpClientModule} from '@angular/common/http';
import { StationsComponent } from './stations/stations.component';


@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    StationsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqOoqoh9Lx-RymWApCaEsVCJFmYcjdgLU'
    }),
  ],
  providers: [
    JcdecauxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
