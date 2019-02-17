import { Component, OnInit } from '@angular/core';
import cms2 from '../assets/content.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';
  public numbers = [1, 2, 3];
  public cms = cms2;
  data = null;

  ngOnInit() {
    console.log('data2', cms2);
    this.cms = cms2;
  }

}
