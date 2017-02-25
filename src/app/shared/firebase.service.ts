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

  getFileExtension(fileName: string){
    const nameParts = fileName.split('.');
    if (nameParts.length === 1){
      return ''
    }
    else {
      return nameParts.pop()
    }
  }

  getFileRef(nameInStorage: string, fileExtension: string){
    return 'images/' + nameInStorage + '.' + fileExtension;
  }

  createClub(club: Club){
    const fileExtension = this.getFileExtension(club.file.name);
    const uniqueID = this.clubs.push({ fileExtension, name: club.name, description: club.description}).key;
    this.uploadFile(club.file, uniqueID);
  }

  private uploadFile(file: File, nameInStorage: string){
    const fileExtension = this.getFileExtension(file.name);
    const fileRef = this.getFileRef(nameInStorage, fileExtension);
    const storageRef = this.storage.ref(fileRef);
    const uploadTask = storageRef.put(file);
  }

  getClubs(){
    //debugger;
    return this.clubs;
    //console.log(this)
  }

  getFile(nameInStorage: string, fileExtension: string): Promise<any>{
    const fileRef = this.getFileRef(nameInStorage, fileExtension);
    const storageRef = this.storage.ref(fileRef);
    return storageRef.getDownloadURL()
  }

}
