import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from "angularfire2";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


export const firebaseConfig = {
  apiKey: "AIzaSyCN-TzDcXnAPdxZc5elol4le0jIO0R6Uvg",
  authDomain: "clubs-catalog-38d0b.firebaseapp.com",
  databaseURL: "https://clubs-catalog-38d0b.firebaseio.com",
  storageBucket: "clubs-catalog-38d0b.appspot.com",
  messagingSenderId: "885759704939"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
