import { Component, Input } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';
import { Observable } from 'rxjs';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {
  @Input() disabled: boolean = false;
  user$: Observable<User>;
  allExerciseScores$:Observable<number[]>;

  constructor(private moduleFacade: ModuleFacade) {
    this.user$ = this.moduleFacade.user$;
    this.allExerciseScores$ = this.moduleFacade.allExerciseScores$;
  }

  logout() {
    this.moduleFacade.logoutUser();
  }

  turnAllPagesBackward() {
    this.moduleFacade.turnAllPagesBackward();
  }

}
