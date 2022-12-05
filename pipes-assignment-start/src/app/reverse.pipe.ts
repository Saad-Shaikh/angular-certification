import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): any {
    const splitStr = value.split('');
    const revArr = splitStr.reverse();
    return revArr.join('');
  }
}
