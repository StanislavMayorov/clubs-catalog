import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FirebaseApp } from 'angularfire2';
import { Club } from "./club";

@Injectable()
export class FirebaseService {
  private storage: any;
  private clubs: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.storage = firebaseApp.storage();
    this.clubs = this.af.database.list('/clubs');
  }

  createClub(club: Club, file: File){
    const uniqueID = this.clubs.push(club).key;
    this.uploadFile(file, uniqueID);
  }

  private uploadFile(file: File, name: string){
    const fileExtension = file.name.split('.').pop();
    const fileRef = 'images/' + name + '.' + fileExtension;
    const storageRef = this.storage.ref(fileRef);
    const uploadTask = storageRef.put(file);
  }

}
