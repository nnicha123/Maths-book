import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/book/book.component';

export const APP_ROUTES: Routes = [
  { path: "login", component: LoginComponent },
  { path: "book", component: BookComponent }
];
