import { Component, Input } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';
import { Observable } from 'rxjs';
import { Rank } from '../../models/Rank.model';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss'
})
export class RankingsComponent {
  @Input() disabled: boolean = false;
  allRankings$: Observable<Rank[]>;

  constructor(private moduleFacade: ModuleFacade) {
    this.allRankings$ = this.moduleFacade.allRankings$;
  }

  nextPage() {
    this.moduleFacade.turnPageForward();
  }
}
