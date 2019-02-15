import { Pipe, PipeTransform } from '@angular/core';
import * as jsonPath from 'jsonpath/jsonpath';

@Pipe({
  name: 'jsonSelector'
})
export class JsonSelectorPipe implements PipeTransform {

  transform(obj: any, selector: string): any {
    try {
      const result = jsonPath.query(obj, selector);
      return result;
    } catch {}
    return null;
    // console.log(jsonPath.query(obj, selector));

    // const path = selector.split('.');
    // let cur = obj;
    // for (const segment of path) {
    //   try {
    //     cur = cur[segment];
    //   } catch {
    //     return cur;
    //   }
    // }
    // return cur;
  }

}
