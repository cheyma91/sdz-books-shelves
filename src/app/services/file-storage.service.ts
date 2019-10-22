import { Injectable } from '@angular/core';
import  * as firebase from 'firebase/app';
import 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

    constructor() { }

    uploadFile(file: File) {
        return new Promise(
            (resolve, reject) => {
                const almostUniqueFileName = Date.now().toString();
                const upload = firebase.storage().ref()
                    .child('images/' + almostUniqueFileName + file.name).put(file);
                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log('Chargement…');
                    },
                    (error) => {
                        console.log('Erreur de chargement ! : ' + error);
                        reject(error);
                    },
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );
            }
        );
    }

    deleteFile(fileUrl: string) {
        return new Promise(
            (resolve, reject) => {
                const storageRef = firebase.storage().refFromURL(fileUrl);
                storageRef.delete().then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                 );
            });
    }
}
