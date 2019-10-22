import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    msg: string = "";
    signinForm: FormGroup;

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        const email: string = this.signinForm.get('email').value;
        const password: string = this.signinForm.get('password').value;
        this.authService.signInUser(email, password).then(
            () => { this.router.navigate(['/books']); },
            (error) => { this.msg = error; }
        )
    }

}
