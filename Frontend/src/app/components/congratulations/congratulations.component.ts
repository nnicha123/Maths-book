import { Component } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrl: './congratulations.component.scss'
})
export class CongratulationsComponent {
  constructor(private moduleFacade: ModuleFacade) { }

  nextPage() {
    this.moduleFacade.turnPageForward();
  }
}
