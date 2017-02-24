import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FirebaseApp } from 'angularfire2';
import { Club } from "../shared/club";

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.sass']
})
export class CreateClubComponent implements OnInit {
  fileName: string;
  file: any;
  items: FirebaseListObservable<any[]>;
  firebaseApp: any;
  club: Club;

  constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.firebaseApp = firebaseApp;
    this.club = new Club('', '');
    this.file = null;
  }

  ngOnInit() {
    this.fileName = 'Choose file...';
    this.items = this.af.database.list('/clubs');
  }


  onSubmit(form: NgForm) {
    debugger;
    if (form.valid && this.file) {
      const newClub = new Club(form.value.name, form.value.description);
      const uniqueID = this.items.push(newClub).key;

      const fileExtension = this.file.name.split('.').pop();
      const fileRef = 'images/' + uniqueID + '.' + fileExtension;
      const storageRef = this.firebaseApp.storage().ref(fileRef);
      storageRef.put(this.file);
    }
  }

  fileChange(fileInputEvent: any){
    this.fileName = fileInputEvent.currentTarget.files[0].name;
    this.file = fileInputEvent.currentTarget.files[0];
  }

}
