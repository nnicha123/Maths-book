import { Routes } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/book/book.component';

export const APP_ROUTES: Routes = [
  // { path: 'book', loadChildren: () => import('./components/components.module').then((m) => ComponentsModule) }
  { path: "login", component: LoginComponent },
  { path: "book", component: BookComponent }
];
