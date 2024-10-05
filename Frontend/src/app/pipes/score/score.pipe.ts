import { Pipe, PipeTransform } from '@angular/core';
import { Exercise } from '../../models/Exercise.model';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(exercise: Exercise): string {
    return exercise.score >= 80 ? 'success' : exercise.submitted ? 'fail' : 'pending';
  }

}
