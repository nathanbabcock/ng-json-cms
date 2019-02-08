import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {}

  public data: any;

  public getData(file) {
    return this.http.get(file).toPromise().then((data: string) => {
      this.data = data;
    });
  }

  // test() {
  //   console.log('Hello world');
  // }
}
