import { NgModule } from '@angular/core';
import { NgJsonCmsComponent } from './ng-json-cms.component';
import { CmsBindDirective } from './cms-bind.directive';
import { HttpClientModule } from '@angular/common/http';
import { CmsBindComponent } from './cms-bind/cms-bind.component';
import { JsonSelectorPipe } from './json-selector.pipe';

@NgModule({
  declarations: [
    NgJsonCmsComponent,
    CmsBindDirective,
    CmsBindComponent,
    JsonSelectorPipe
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
