import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() ratingValue!: number;
  @Input() max: number = 5;
  @Input() readOnly!: boolean;
  
  stars: { filled: boolean, index: number }[] = [];

  ngOnInit() {
    this.updateStars();
  }

  updateStars() {
    this.stars = [];
    for (let i = 0; i < this.max; i++) {
      this.stars.push({
        filled: i < this.ratingValue,
        index: i
      });
    }
  }

  toggle(index: number) {
    if (!this.readOnly) {
      this.ratingValue = index + 1;
    }
  }

  unpaintStars() {
    this.stars.forEach(star => star.filled = star.index < this.ratingValue);
  }

  paintStars(index: number) {
    this.stars.forEach(star => star.filled = star.index <= index);
  }
}
