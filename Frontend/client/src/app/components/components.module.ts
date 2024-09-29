import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RankingsComponent } from './rankings/rankings.component';
import { ExerciseOneComponent } from './exercise-one/exercise-one.component';
import { ExerciseTwoComponent } from './exercise-two/exercise-two.component';
import { ExerciseThreeComponent } from './exercise-three/exercise-three.component';
import { ExerciseFourComponent } from './exercise-four/exercise-four.component';
import { ExerciseFiveComponent } from './exercise-five/exercise-five.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { BookComponent } from './book/book.component';
import { RouterModule } from '@angular/router';
import { COMPONENT_ROUTES } from './component.routes';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    RankingsComponent,
    ExerciseOneComponent,
    ExerciseTwoComponent,
    ExerciseThreeComponent,
    ExerciseFourComponent,
    ExerciseFiveComponent,
    CongratulationsComponent,
    AchievementsComponent,
    BookComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(COMPONENT_ROUTES),
  ]
})
export class ComponentsModule { }
