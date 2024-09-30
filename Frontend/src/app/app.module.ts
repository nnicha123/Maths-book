import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const NGRX_MODULES = [
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 25, name: 'Maths Book Project Dev Tool', logOnly: !isDevMode() })
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    ...NGRX_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
