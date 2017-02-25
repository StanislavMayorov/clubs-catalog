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
  club: Club;
  alerts: Array<any>;

  constructor(private firebaseService: FirebaseService) {
    this.club = new Club('', '', null);
    this.alerts = [];
    this.alerts.push({
      type: 'success',
      message: 'New club successfully has been created!',
      isOpen: false
    },{
      type: 'danger',
      message: 'New club hasn\'t been created!',
      isOpen: false
    });
  }

  ngOnInit() {
    this.reset();
  }

  reset(){
    this.fileName = 'Choose file...';
    this.club.file = null;
  }


  onSubmit(form: NgForm) {
    debugger;
    if (form.valid && this.club.file) {
      const newClub = new Club(form.value.name, form.value.description, this.club.file);
      this.firebaseService.createClub(newClub);
      this.alerts[0].isOpen = true;
      form.reset();
      this.reset();
    }
    else {
      this.alerts[1].isOpen = true;
    }
  }

  fileChange(fileInputEvent: any) {
    this.fileName = fileInputEvent.currentTarget.files[0].name;
    this.club.file = fileInputEvent.currentTarget.files[0];
  }

}
