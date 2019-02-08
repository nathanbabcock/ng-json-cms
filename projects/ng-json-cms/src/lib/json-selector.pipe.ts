import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonSelector'
})
export class JsonSelectorPipe implements PipeTransform {

  transform(obj: any, selector: string): any {
    const path = selector.split('.');
    let cur = obj;
    for (const segment of path) {
      try {
        cur = cur[segment];
      } catch {
        return cur;
      }
    }
    return cur;
  }

}
