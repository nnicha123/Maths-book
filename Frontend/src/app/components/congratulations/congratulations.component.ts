import { Component, Input } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrl: './congratulations.component.scss'
})
export class CongratulationsComponent {
  @Input() disabled: boolean = false;

  constructor(private moduleFacade: ModuleFacade) { }

  nextPage() {
    this.moduleFacade.turnPageForward();
  }
}
