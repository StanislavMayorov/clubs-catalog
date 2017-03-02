import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm, Form, FormGroup, FormControl, Validators } from "@angular/forms";
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
  form: FormGroup;
  @ViewChild('file')
  fileInput: ElementRef;

  constructor(private firebaseService: FirebaseService) {
    this.club = new Club('', '', null);
    this.alerts = [];
    this.alerts.push({
      type: 'success',
      message: 'New club successfully has been created!',
      isOpen: false
    }, {
      type: 'danger',
      message: 'New club hasn\'t been created!',
      isOpen: false
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      file: new FormControl('', this.fileValidator.bind(this))
    });
    this.resetFilePath();
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      const newClub = new Club(form.value.name, form.value.description, this.club.file);
      const uploadTask = this.firebaseService.createClub(newClub);
      uploadTask.on('state_changed', () => {
        },
        (error) => {
          this.setAlert('danger');
          console.error(error);
        }, () => {
          this.setAlert('success');
          form.reset();
          this.resetFilePath();
        });
    }
    else {
      this.setAlert('danger');
    }
  }

  setAlert(type: string) {
    for (let alert of this.alerts) {
      alert.isOpen = false;
    }
    switch (type) {
      case 'success':
        this.alerts[0].isOpen = true;
        break;
      case 'danger':
        this.alerts[1].isOpen = true;
        break;
    }
  }

  resetFilePath() {
    this.fileName = 'Choose file...';
    this.club.file = null;
  }

  setFilePath(file: File) {
    this.fileName = file.name;
    this.club.file = file;
  }

  fileChange(fileInputEvent: any) {
    this.form.controls['file'].updateValueAndValidity();
  }

  fileValidator(control: FormControl): {[key: string]: boolean} {
    const files = this.fileInput.nativeElement.files;
    if (files.length !== 0 && (/.(gif|jpg|jpeg|png|svg)$/i).test(files[0].name)) {
      this.setFilePath(files[0]);
      return null
    }
    else {
      this.resetFilePath();
      return {error: true};
    }
  }

}
