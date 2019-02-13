import { Directive, ViewContainerRef, TemplateRef, OnInit, Input, OnChanges } from '@angular/core';
import { ContentService } from './content-service.service';

@Directive({
  selector: '[cmsFor]'
})

export class CmsFor implements OnInit, OnChanges { // tslint:disable-line:directive-class-suffix
  @Input() cmsForOf: any;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private contentService: ContentService
  ) {}

  ngOnChanges() {
    this.container.clear();
    this.contentService.query(this.cmsForOf).then(content => {
      let i = 0;
      for (const input of content) {
        ++i;
        // TODO this could be a separate class CmsForOfContext
        const context = {
           $implicit: this.cmsForOf+`[${i}]`,
           index: i,
           first: i === 0,
           last: i === content.length - 1,
           even: i % 2 === 0,
           odd: i % 2 !== 0,
        };
        this.container.createEmbeddedView(this.template, context);
      }
    });
  }

  ngOnInit(): void {
    // this.container.createEmbeddedView(this.template);
  }
}
