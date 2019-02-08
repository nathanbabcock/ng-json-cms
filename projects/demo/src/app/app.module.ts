import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgJsonCmsModule } from 'projects/ng-json-cms/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgJsonCmsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
