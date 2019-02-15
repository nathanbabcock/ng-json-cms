import { Directive, ViewContainerRef, TemplateRef, OnInit, Input, OnChanges, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { ContentService } from './content-service.service';
import { CmsForAddComponent } from './cms-for-add/cms-for-add.component';

@Directive({
  selector: '[cmsFor]'
})

export class CmsFor implements OnInit, OnChanges { // tslint:disable-line:directive-class-suffix
  @Input() cmsForOf: any;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private contentService: ContentService,
    private resolver: ComponentFactoryResolver,
  ) {}

  ngOnChanges() {
    this.container.clear();
    this.contentService.query(this.cmsForOf).then(content => {
      let i = 0;
      for (const input of content) {
        // TODO this could be a separate class CmsForOfContext
        const context = {
           $implicit: `${this.cmsForOf}[${i}]`,
           index: i,
           first: i === 0,
           last: i === content.length - 1,
           even: i % 2 === 0,
           odd: i % 2 !== 0,
        };
        this.container.createEmbeddedView(this.template, context);
        ++i;

        // const test = this.renderer.createElement('div');
        // const text = this.renderer.createText('Click here to add li');
        // this.renderer.appendChild(test, text);
        // this.renderer.appendChild(this.element.nativeElement, test);
      }

      const factory: ComponentFactory<CmsForAddComponent> = this.resolver.resolveComponentFactory(CmsForAddComponent);
      const componentRef: ComponentRef<CmsForAddComponent> = this.container.createComponent(factory);
      componentRef.instance.source = this.cmsForOf;
      componentRef.instance.cmsFor = this;
      // this.container.createComponent(factory);
      this.container.insert(componentRef.hostView);
    });
  }

  ngOnInit(): void {
    // this.container.createEmbeddedView(this.template);
  }
}
