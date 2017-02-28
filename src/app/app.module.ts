import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from "angularfire2";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from './header/header.component';
import { ClubsListComponent } from './clubs-list/clubs-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { CreateClubComponent } from './create-club/create-club.component';
import { routing } from "./app.routing";
import { FirebaseService } from "./shared/firebase.service";
import { NotFoundComponent } from './not-found/not-found.component';


export const firebaseConfig = {
  apiKey: "AIzaSyCN-TzDcXnAPdxZc5elol4le0jIO0R6Uvg",
  authDomain: "clubs-catalog-38d0b.firebaseapp.com",
  databaseURL: "https://clubs-catalog-38d0b.firebaseio.com",
  storageBucket: "clubs-catalog-38d0b.appspot.com",
  messagingSenderId: "885759704939"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClubsListComponent,
    ClubDetailComponent,
    CreateClubComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
    routing
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
