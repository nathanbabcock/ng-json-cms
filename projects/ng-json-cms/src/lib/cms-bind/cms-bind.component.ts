import { Component, OnInit, Input, HostBinding, HostListener, ElementRef } from '@angular/core';
import { ContentService } from '../content-service.service';
import * as jsonPath from 'jsonpath/jsonpath';

@Component({
  selector: '[cms-bind]',
  templateUrl: './cms-bind.component.html',
  styleUrls: ['./cms-bind.component.scss'],
  providers: [],
})
export class CmsBindComponent implements OnInit {
  public jsonPath = jsonPath;

  @Input() source;
  @HostBinding('attr.contentEditable') get editMode() {
    return this.contentService.editMode;
  }
  @HostListener('keyup')
  onkeypress() {
    if (!this.contentService.editMode) {
      return;
    }
    jsonPath.apply(this.contentService.data, this.source, () => this.elementRef.nativeElement.innerHTML);
    console.log(jsonPath.query(this.contentService.data, this.source));
  }


  constructor(
    public contentService: ContentService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
  }

}
