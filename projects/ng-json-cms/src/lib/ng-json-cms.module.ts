import { NgModule } from '@angular/core';
import { NgJsonCmsComponent } from './ng-json-cms.component';
import { CmsBindDirective } from './cms-bind.directive';

@NgModule({
  declarations: [
    NgJsonCmsComponent,
    CmsBindDirective
  ],
  imports: [
  ],
  exports: [
    NgJsonCmsComponent,
    CmsBindDirective,
  ]
})
export class NgJsonCmsModule { }
