import { Component, Input } from '@angular/core';
import { MAX_STARS } from '../../store/utils';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  @Input() currentLevel: number = 0;
  maxStars = MAX_STARS;

}
