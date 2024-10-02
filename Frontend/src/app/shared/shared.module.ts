import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate/truncate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingPipe } from '../pipes/star-rating/star-rating.pipe';



@NgModule({
  declarations: [TruncatePipe, StarRatingPipe],
  exports: [TruncatePipe, StarRatingPipe],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
