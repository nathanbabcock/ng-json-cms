import { NgModule } from '@angular/core';
import { NgJsonCmsComponent } from './ng-json-cms.component';
import { CmsBindDirective } from './cms-bind.directive';
import { HttpClientModule } from '@angular/common/http';
import { CmsBindComponent } from './cms-bind/cms-bind.component';
import { JsonSelectorPipe } from './json-selector.pipe';
import { CmsFor } from './cms-for.directive';

let stuff = [
  NgJsonCmsComponent,
  CmsBindDirective,
  CmsBindComponent,
  JsonSelectorPipe,
  CmsFor
];

@NgModule({
  declarations: stuff,
  imports: [
    HttpClientModule,
  ],
  exports: stuff
})
export class NgJsonCmsModule { }
