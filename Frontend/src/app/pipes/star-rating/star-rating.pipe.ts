import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  transform(value: number): number[] {
    return this.fullStars(value);
  }

  fullStars(ranking: number): number[] {
    const totalFullStars = Math.floor(ranking);
    return Array(totalFullStars).fill(0);
  }

  emptyStars(ranking: number): number[] {
    const highestRating = 5;
    const totalEmptyStars = Math.floor(highestRating - ranking);
    return Array(totalEmptyStars).fill(0);
  }

  // hasHalfStars(ranking:number): boolean {
  //   const highestRating = 5;
  //   return (this.ranking - Math.floor(this.ranking) >= 0.5) && this.ranking != highestRating;
  // }



}
