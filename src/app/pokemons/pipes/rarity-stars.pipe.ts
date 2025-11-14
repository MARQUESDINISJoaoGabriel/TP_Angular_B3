import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rarityStars',
  standalone: true
})
export class RarityStarsPipe implements PipeTransform {

  transform(value: number): string {
    if (!value || value < 1) return "☆☆☆☆☆";
    if (value > 5) value = 5;

    return '★'.repeat(value) + '☆'.repeat(5 - value);
  }

}
