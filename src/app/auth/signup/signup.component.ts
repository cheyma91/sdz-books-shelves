import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

    msg: string = "";
    signupForm: FormGroup;

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        const email: string = this.signupForm.get('email').value;
        const password: string = this.signupForm.get('password').value;
        this.authService.createNewUser(email, password).then(
            () => { this.router.navigate(['/books']) },
            (error) => { this.msg = error; }
        );
    }
}
