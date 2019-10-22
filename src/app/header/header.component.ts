import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private authService: AuthService) { }
    isAuth: boolean = false;
    ngOnInit() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.isAuth = true;
                } else {
                    this.isAuth = false;
                }
            }
        );
  }

    onLogout() {
        this.authService.signOutUser();
    }

}
