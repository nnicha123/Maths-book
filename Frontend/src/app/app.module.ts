import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileComponent } from './components/profile/profile.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { CongratulationsComponent } from './components/congratulations/congratulations.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { BookComponent } from './components/book/book.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import * as fromStore from './store';
import { ModuleFacade } from './store/module.facade';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingComponent } from './components/star-rating/star-rating/star-rating.component';

const NGRX_MODULES = [
  StoreModule.forRoot({ module: fromStore.moduleReducer }),
  EffectsModule.forRoot(fromStore.effects),
  StoreDevtoolsModule.instrument({ maxAge: 25, name: 'Maths Book Project Dev Tool', logOnly: !isDevMode() })
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RankingsComponent,
    CongratulationsComponent,
    AchievementsComponent,
    BookComponent,
    ExerciseComponent,
    LoginComponent,
    StarRatingComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    ...NGRX_MODULES
  ],
  providers: [ModuleFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
