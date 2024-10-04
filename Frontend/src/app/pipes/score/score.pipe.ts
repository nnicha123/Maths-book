import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(score: number): string {
    return score >= 80 ? 'success' : 'fail';
  }

}
