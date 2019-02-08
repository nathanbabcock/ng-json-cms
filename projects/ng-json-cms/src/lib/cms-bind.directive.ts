import { Directive, OnInit, Input } from '@angular/core';
import { ContentService } from './content-service.service';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[cms-bind]', // tslint:disable-line:directive-selector
  providers: [
    ContentService,
    HttpClient
  ],
})
export class CmsBindDirective implements OnInit {
  @Input('cms-bind') directive: any;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    console.log('cms-bind init');
    console.log(this.directive);
    this.contentService.getData('./assets/content.json');
  }

}
