import { Directive, OnInit, Input, ElementRef } from '@angular/core';
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
  public test = 'Hello world';

  constructor(private contentService: ContentService, private elementRef: ElementRef) { }

  ngOnInit() {
    // console.log('cms-bind init');
    // console.log(this.directive);
    // this.contentService.getData('./assets/content.json');

    this.contentService.query(this.directive).then(value => this.elementRef.nativeElement.innerHTML = value);
    // this.elementRef.nativeElement.innerHtml = this.contentService.query(this.directive);
  }

}
