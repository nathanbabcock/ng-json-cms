import { Directive, ViewContainerRef, TemplateRef, OnInit, Input, OnChanges, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { ContentService } from './content-service.service';
import { CmsForAddComponent } from './cms-for-add/cms-for-add.component';
import { CmsForRemoveComponent } from './cms-for-remove/cms-for-remove.component';
import * as Tether from 'tether/dist/js/tether.js';
import tippy, { Tippy, Placement } from 'tippy.js';

@Directive({
  selector: '[cmsFor]'
})

export class CmsFor implements OnInit, OnChanges { // tslint:disable-line:directive-class-suffix
  @Input() cmsForOf: any;
  @Input() cmsForRemovePosition: Placement = 'top-end';
  @Input() cmsForAddPosition: Placement = 'bottom';

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
      const removeFactory: ComponentFactory<CmsForRemoveComponent> = this.resolver.resolveComponentFactory(CmsForRemoveComponent);
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
        console.log('this.container', this.container);
        const embeddedView = this.container.createEmbeddedView(this.template, context);

        const removeRef: ComponentRef<CmsForRemoveComponent> = this.container.createComponent(removeFactory);
        removeRef.instance.source = this.cmsForOf;
        removeRef.instance.index = i;
        removeRef.instance.cmsFor = this;
        // this.container.insert(removeRef.hostView);
        // removeRef.location.nativeElement

        // Debug
        console.log('removeRef.location.nativeElement', removeRef.location.nativeElement);
        console.log('embeddedView.rootNodes[0]', embeddedView.rootNodes[0]);
        // console.log('embeddedView.rootNodes', embeddedView.rootNodes);

        // Tether
        // const tether = new Tether({
        //   element: removeRef.location.nativeElement,
        //   target: embeddedView.rootNodes[0],
        //   attachment: 'middle left',
        //   targetAttachment: 'middle right',
        //   constraints: [
        //     {
        //       to: 'scrollParent',
        //       attachment: 'together'
        //     }
        //   ]
        // });

        // Tippy.js
        tippy(embeddedView.rootNodes[0], {
          content: removeRef.location.nativeElement.childNodes[0], //'<a href="javascript:void(0)" style="color:white">remove</a>',
          arrow: true,
          interactive: true,
          placement: this.cmsForRemovePosition,
          multiple: true,
        });

        if (context.last) {
          this.createAddComponent(embeddedView.rootNodes[0]);
        }

        ++i;
      }


    });
  }

  createAddComponent(anchor: Element) {
    const addFactory: ComponentFactory<CmsForAddComponent> = this.resolver.resolveComponentFactory(CmsForAddComponent);
    const addRef: ComponentRef<CmsForAddComponent> = this.container.createComponent(addFactory);
    addRef.instance.source = this.cmsForOf;
    addRef.instance.cmsFor = this;
    // this.container.createComponent(factory);
    // this.container.insert(addRef.hostView);

    tippy(anchor, {
      content: addRef.location.nativeElement.childNodes[0], //'<a href="javascript:void(0)" style="color:white">remove</a>',
      arrow: false,
      interactive: true,
      placement: this.cmsForAddPosition,
      // showOnInit: true,
      // trigger: null,
    });
  }

  ngOnInit(): void {
    // this.container.createEmbeddedView(this.template);
  }
}
