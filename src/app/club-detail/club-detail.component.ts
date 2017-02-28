import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FirebaseService } from "../shared/firebase.service";
import { element } from "protractor";

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.sass']
})
export class ClubDetailComponent implements OnInit {
  clubUniqueId: string;
  club: any;

  constructor(private route: ActivatedRoute, private router: Router,
              private firebaseService: FirebaseService) {
    this.club = null;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.clubUniqueId = params['club'];
      this.loadData();
    });
  }

  loadData() {
    this.firebaseService.getClubs().subscribe(clubs => {
      let club = Array.from(clubs).filter(element => element.$key === this.clubUniqueId).pop();
      if (!club){
        this.redirect()
      }
      this.firebaseService.getFile(club.$key, club.fileExtension).then(url => {
        this.club = {url, name: club.name, description: club.description};
      }, (error) => {
        console.error(error);
      });
    });
  }

  redirect(){
    this.router.navigate(['/not-found']);
  }

}

