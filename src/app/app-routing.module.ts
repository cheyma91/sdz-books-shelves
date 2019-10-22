import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
    { path: "login", component: SigninComponent },
    { path: "register", component: SignupComponent },
    { path: "books", canActivate: [AuthGuardService], component: BookListComponent },
    { path: "books/view/:id", canActivate: [AuthGuardService], component: SingleBookComponent },
    { path: "books/new", canActivate: [AuthGuardService], component: BookFormComponent },
    { path: "books/edit/:id", canActivate: [AuthGuardService], component: BookFormComponent },
    { path: "", redirectTo: "books", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
