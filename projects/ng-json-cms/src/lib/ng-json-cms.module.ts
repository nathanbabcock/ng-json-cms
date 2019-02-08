import { NgModule } from '@angular/core';
import { NgJsonCmsComponent } from './ng-json-cms.component';
import { CmsBindDirective } from './cms-bind.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NgJsonCmsComponent,
    CmsBindDirective
  ],
  imports: [
    HttpClientModule,
  ],
  exports: [
    NgJsonCmsComponent,
    CmsBindDirective,
  ],
})
export class NgJsonCmsModule { }
