import { Component, OnInit, Input } from '@angular/core';
import { ContentService } from '../content-service.service';
import { CmsFor } from '../cms-for.directive';

@Component({
  selector: 'cms-for-add',
  templateUrl: './cms-for-add.component.html',
  styleUrls: ['./cms-for-add.component.css']
})
export class CmsForAddComponent implements OnInit {
  @Input() source: string;
  @Input() cmsFor: CmsFor;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
  }

  public addRow() {
    this.contentService.query(this.source).then(content => {
      content.push({});
      this.cmsFor.ngOnChanges();
    });
  }
}
