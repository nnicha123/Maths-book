import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/book/book.component';
import { RegisterComponent } from './components/register/register.component';

export const APP_ROUTES: Routes = [
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "book", component: BookComponent },
  { path: "**", redirectTo: '/book' },
];
