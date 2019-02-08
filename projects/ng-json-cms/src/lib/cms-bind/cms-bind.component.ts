import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content-service.service';

@Component({
  selector: '[cms-bind]',
  templateUrl: './cms-bind.component.html',
  styleUrls: ['./cms-bind.component.css'],
  providers: [ContentService],
})
export class CmsBindComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  ngOnInit() {
    console.log('cms-bind component');
  }

}
