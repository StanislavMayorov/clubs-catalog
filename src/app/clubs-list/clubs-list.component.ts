import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../shared/firebase.service";
import { FirebaseListObservable } from "angularfire2";
import { Club } from "../shared/club";

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.sass']
})
export class ClubsListComponent implements OnInit {
  clubsDatabaseObservable: FirebaseListObservable<any[]>;
  clubs: Array<any>;

  constructor(private firebaseService: FirebaseService) {
    this.clubs = [];
  }

  ngOnInit() {
    this.clubsDatabaseObservable = this.firebaseService.getClubs();
    this.clubsDatabaseObservable.subscribe(clubs => {
      debugger;
      for (let club of clubs) {
        this.firebaseService.getFile(club.$key, club.fileExtension).then(url => {
          //console.log(url);
          this.clubs.push({ url, name: club.name, description: club.description,});
        }, (error) => {
          console.error(error)
        });
      }
    });
  }

}
