import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any[], sortBy: string): any {
    return value.sort((a, b) => {
      const x = a[sortBy].toLowerCase();
      const y = b[sortBy].toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
  }
}
