import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService implements OnInit {
  public data: any;
  public editMode = true;
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

  ngOnInit() {
    // this.getData(this.file);
  }

  public getData(file) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    console.log("need to pull file");
    console.log(this.data);
    return this.http.get(file).toPromise().then(data => {this.data = data; console.log(this.data); return data; });
  }

  public query(selector) {
    return this.getData(this.file).then(data => ContentService.json_selector(data, selector));
  }
  // test() {
  //   console.log('Hello world');
  // }
}
