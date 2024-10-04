import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate/truncate.pipe';
import { StarRatingPipe } from '../pipes/star-rating/star-rating.pipe';
import { PageNavigationPipe } from '../pipes/page-navigation/page-navigation.pipe';
import { ScorePipe } from '../pipes/score/score.pipe';



@NgModule({
  declarations: [TruncatePipe, StarRatingPipe, PageNavigationPipe, ScorePipe],
  exports: [TruncatePipe, StarRatingPipe, PageNavigationPipe, ScorePipe],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
