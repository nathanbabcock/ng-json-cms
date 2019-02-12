import { Directive, ViewContainerRef, TemplateRef, OnInit, Input, OnChanges,
  ViewChildren, AfterViewInit, QueryList, ContentChildren } from '@angular/core';
import { ContentService } from './content-service.service';
import { CmsBindComponent } from './cms-bind/cms-bind.component';

@Directive({
  selector: '[cmsFor]'
})

export class CmsFor implements OnInit, OnChanges, AfterViewInit { // tslint:disable-line:directive-class-suffix
  @Input() cmsFor: any;
  // @Input() source: string;
  @ContentChildren('*') cmsBindChildren;

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

  ngAfterViewInit() {
    console.log('my children are here:', this.cmsBindChildren);
    this.cmsBindChildren.changes.subscribe(() => {
      console.log('my children are here:', this.cmsBindChildren);
    });
  }
}
