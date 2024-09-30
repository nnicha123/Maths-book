import { Routes } from '@angular/router';
import { ComponentsModule } from './components/components.module';

export const APP_ROUTES: Routes = [
    { path: 'book', loadChildren: () => import('./components/components.module').then((m) => ComponentsModule) }
  ];
  