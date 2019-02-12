import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ContentService } from '../content-service.service';

@Component({
  selector: '[cms-bind]',
  templateUrl: './cms-bind.component.html',
  styleUrls: ['./cms-bind.component.scss'],
  providers: [ContentService],
})
export class CmsBindComponent implements OnInit {
  @Input() source;
  @HostBinding('attr.contentEditable') get editMode() {
    return this.contentService.editMode;
  }

  cms = {};

  constructor(public contentService: ContentService) { }

  ngOnInit() {
    console.log('cms-bind component');
  }

}
