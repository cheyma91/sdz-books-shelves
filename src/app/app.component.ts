import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor() {
		// TODO: Replace the following with your app's Firebase project configuration
		var firebaseConfig = {
			apiKey: "api-key",
			authDomain: "project-id.firebaseapp.com",
			databaseURL: "https://project-id.firebaseio.com",
			projectId: "project-id",
			storageBucket: "project-id.appspot.com",
			messagingSenderId: "sender-id",
			appId: "app-id",
			measurementId: "G-measurement-id",
		};

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
	}
}
