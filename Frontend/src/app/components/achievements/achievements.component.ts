import { Component, Input } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';
import { Observable } from 'rxjs';
import { User } from '../../models/User.model';
import { Exercise } from '../../models/Exercise.model';
import { MAX_STARS } from '../../store/utils';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {
  @Input() disabled: boolean = false;
  maxStars = MAX_STARS;
  user$: Observable<User>;
  exercises$: Observable<Exercise[]>;

  constructor(private moduleFacade: ModuleFacade) {
    this.user$ = this.moduleFacade.user$;
    this.exercises$ = this.moduleFacade.exercises$;
  }

  logout() {
    this.moduleFacade.logoutUser();
  }

  turnAllPagesBackward() {
    this.moduleFacade.turnAllPagesBackward();
  }

}
