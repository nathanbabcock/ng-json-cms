import { Directive, OnInit, Input } from '@angular/core';
import { ContentService } from './content-service.service';

@Directive({
  selector: '[cms-bind]', // tslint:disable-line:directive-selector
  providers: [ContentService],
})
export class CmsBindDirective implements OnInit {
  @Input('cms-bind') directive: any;

  constructor(contentService: ContentService) { }

  ngOnInit() {
    console.log('cms-bind init');
    console.log(this.directive);
  }

}
