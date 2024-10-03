import { Component, Input } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {
  @Input() disabled: boolean = false;

  constructor(private moduleFacade: ModuleFacade) { }

  logout() {
    this.moduleFacade.logoutUser();
  }

  turnAllPagesBackward() {
    this.moduleFacade.turnAllPagesBackward();
  }

}
