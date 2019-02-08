import { NgModule } from '@angular/core';
import { NgJsonCmsComponent } from './ng-json-cms.component';
import { CmsBindDirective } from './cms-bind.directive';
import { HttpClientModule } from '@angular/common/http';
import { CmsBindComponent } from './cms-bind/cms-bind.component';

@NgModule({
  declarations: [
    NgJsonCmsComponent,
    CmsBindDirective,
    CmsBindComponent
  ],
  imports: [
    HttpClientModule,
  ],
  exports: [
    NgJsonCmsComponent,
    CmsBindDirective,
    CmsBindComponent,
  ],
})
export class NgJsonCmsModule { }
