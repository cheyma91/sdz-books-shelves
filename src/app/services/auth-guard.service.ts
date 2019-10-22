import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            resolve(true);
                        } else {
                            resolve(false);
                            this.router.navigate(['/login']);
                        }
                    }
                );
            }
        );
    }
}
