import { Directive, ViewContainerRef, TemplateRef, OnInit, Input, OnChanges } from '@angular/core';
import { ContentService } from './content-service.service';

@Directive({
  selector: '[cmsFor]'
})
export class CmsForOf implements OnInit, OnChanges {
  @Input() cmsFor: any;
  // @Input() source: string;

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>, private contentService: ContentService) { }

  ngOnChanges() {
    console.log(this.cmsFor);
    this.container.clear();
    this.contentService.query(this.cmsFor).then(content => {
      console.log(content);
      for (const input of content) {
        console.log(input);
        this.container.createEmbeddedView(this.template);
      }
    });
  }

  ngOnInit(): void {
    // this.container.createEmbeddedView(this.template);
  }
}
