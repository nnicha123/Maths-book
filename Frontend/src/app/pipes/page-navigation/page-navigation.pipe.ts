import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageNavigation'
})
export class PageNavigationPipe implements PipeTransform {

  transform(value: number): string {
    return value % 2 == 0 ? 'Next Page' : 'Prev. Page';
  }

}
