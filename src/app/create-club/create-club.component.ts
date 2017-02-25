import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Club } from "../shared/club";
import { FirebaseService } from "../shared/firebase.service";

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.sass']
})
export class CreateClubComponent implements OnInit {
  fileName: string;
  //file: File;
  club: Club;

  constructor(private firebaseService: FirebaseService) {
    this.club = new Club('', '', null);
   // this.file = null;
  }

  ngOnInit() {
    this.fileName = 'Choose file...';
  }


  onSubmit(form: NgForm) {
    if (form.valid && this.club.file) {
      const newClub = new Club(form.value.name, form.value.description, this.club.file);
      this.firebaseService.createClub(newClub);
    }
  }

  fileChange(fileInputEvent: any){
    this.fileName = fileInputEvent.currentTarget.files[0].name;
    this.club.file = fileInputEvent.currentTarget.files[0];
  }

}
