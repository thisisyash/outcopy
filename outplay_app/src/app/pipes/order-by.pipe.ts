import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    value.sort((a, b) => (a[args[0]] > b[args[0]]) ? 1 : -1)
    return value;
  }

}
