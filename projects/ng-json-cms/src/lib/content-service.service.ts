import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  public data: any;
  private file = './assets/content.json';

  constructor(private http: HttpClient) {
    this.getData(this.file);
  }

  static json_selector(obj, selector) {
    const path = selector.split('.');
    let cur = obj;
    for (const segment of path) {
      cur = cur[segment];
      if (!cur) {
        return cur;
      }
    }
    return cur;
  }

  public getData(file) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return this.http.get(file).toPromise().then(data => this.data = data);
  }

  public query(selector) {
    return this.getData(this.file).then(data => ContentService.json_selector(data, selector));
  }
  // test() {
  //   console.log('Hello world');
  // }
}
