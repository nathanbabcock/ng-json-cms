import { Component, OnInit, Input } from '@angular/core';
import { CmsFor } from '../cms-for.directive';
import { ContentService } from '../content-service.service';

@Component({
  selector: 'cms-for-remove',
  templateUrl: './cms-for-remove.component.html',
  styleUrls: ['./cms-for-remove.component.scss']
})
export class CmsForRemoveComponent implements OnInit {
  @Input() source: string;
  @Input() cmsFor: CmsFor;
  @Input() index: number;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
  }

  public removeRow() {
    this.contentService.query(this.source).then(content => {
      if(content.length <= 1) {
        content.pop();
      } else {
        content.splice(this.index, 1);
      }
      this.cmsFor.ngOnChanges();
    });
  }
}
