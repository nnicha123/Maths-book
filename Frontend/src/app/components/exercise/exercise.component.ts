import { Component, Input } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {
  @Input() disabled: boolean = false;
  @Input() questions: string[] = ['1 x 1', '2 x 2', '3 x 2', '2 x 4', '5 x 5'];
  @Input() newQuestions: any = [
    { key: "1", value: "1 x 1" },
    { key: "2", value: "2 x 2" },
    { key: "3", value: "3 x 3" },
    { key: "4", value: "4 x 4" },
    { key: "5", value: "5 x 5" },
  ]
  @Input() exerciseNumber: number = 1;

  constructor(private moduleFacade: ModuleFacade) { }

  navigatePage() {
    if (this.exerciseNumber % 2 == 0) {
      this.moduleFacade.turnPageForward();
    } else {
      this.moduleFacade.turnPageBackward();
    }
  }
}
