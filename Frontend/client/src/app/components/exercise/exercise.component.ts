import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {
  @Input() questions: string[] = ['1 x 1', '2 x 2', '3 x 2', '2 x 4', '5 x 5'];
  @Input() exerciseNumber: number = 1;
}
