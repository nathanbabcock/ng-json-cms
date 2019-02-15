import { NgModule } from '@angular/core';
import { NgJsonCmsComponent } from './ng-json-cms.component';
import { CmsBindDirective } from './cms-bind.directive';
import { HttpClientModule } from '@angular/common/http';
import { CmsBindComponent } from './cms-bind/cms-bind.component';
import { JsonSelectorPipe } from './json-selector.pipe';
import { CmsFor } from './cms-for.directive';
import { CmsForAddComponent } from './cms-for-add/cms-for-add.component';
import { CmsForRemoveComponent } from './cms-for-remove/cms-for-remove.component';

let stuff = [
  NgJsonCmsComponent,
  CmsBindDirective,
  CmsBindComponent,
  JsonSelectorPipe,
  CmsFor,
  CmsForAddComponent,
  CmsForRemoveComponent,
];

@NgModule({
  declarations: stuff,
  imports: [
    HttpClientModule,
  ],
  entryComponents: [
    CmsForAddComponent,
    CmsForRemoveComponent,
  ],
  exports: stuff
})
export class NgJsonCmsModule { }
