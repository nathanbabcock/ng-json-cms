import { NgModule } from '@angular/core';
import { NgJsonCmsComponent } from './ng-json-cms.component';
import { CmsBindDirective } from './cms-bind.directive';
import { HttpClientModule } from '@angular/common/http';
import { CmsBindComponent } from './cms-bind/cms-bind.component';
import { JsonSelectorPipe } from './json-selector.pipe';
import { CmsFor } from './cms-for.directive';
import { CmsForAddComponent } from './cms-for-add/cms-for-add.component';

let stuff = [
  NgJsonCmsComponent,
  CmsBindDirective,
  CmsBindComponent,
  JsonSelectorPipe,
  CmsFor,
  CmsForAddComponent
];

@NgModule({
  declarations: stuff,
  imports: [
    HttpClientModule,
  ],
  entryComponents: [
    CmsForAddComponent
  ],
  exports: stuff
})
export class NgJsonCmsModule { }
