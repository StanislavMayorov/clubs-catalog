import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FirebaseService } from "../shared/firebase.service";

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.sass']
})
export class ClubDetailComponent implements OnInit {
  clubName: string;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.clubName = params['club'];
      //this.update();
    });
  }

}

