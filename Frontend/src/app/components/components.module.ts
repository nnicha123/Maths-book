import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RankingsComponent } from './rankings/rankings.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { BookComponent } from './book/book.component';
import { RouterModule } from '@angular/router';
import { COMPONENT_ROUTES } from './component.routes';
import { SharedModule } from '../shared/shared.module';
import { ExerciseComponent } from './exercise/exercise.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent,
    RankingsComponent,
    CongratulationsComponent,
    AchievementsComponent,
    BookComponent,
    ExerciseComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(COMPONENT_ROUTES),
  ]
})
export class ComponentsModule { }
