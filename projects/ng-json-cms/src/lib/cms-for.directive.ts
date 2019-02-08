import { Directive, ViewContainerRef, TemplateRef, OnInit, Input, OnChanges } from '@angular/core';
import { ContentService } from './content-service.service';

@Directive({
  selector: '[cmsFor]'
})
export class CmsForOf implements OnInit, OnChanges {
  @Input() cmsFor: any;
  @Input() source: string;

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>, private contentService: ContentService) { }

  ngOnChanges() {
    this.container.clear();
    for (const input of [1, 2]) {
      this.container.createEmbeddedView(this.template);
    }
  }

  ngOnInit(): void {
    // this.container.createEmbeddedView(this.template);
  }
}
