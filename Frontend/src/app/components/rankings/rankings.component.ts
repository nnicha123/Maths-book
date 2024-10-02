import { Component } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss'
})
export class RankingsComponent {

  constructor(private moduleFacade: ModuleFacade) { }

  nextPage() {
    this.moduleFacade.turnPageForward();
  }
}
