import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LangService } from './services/lang.service';

import { AppComponent } from './app.component';
import { JsonComponent } from './jsonEditor/json.component';
import { GroupComponent } from './jsonEditor/components/group.component';
import { LangComponent } from './jsonEditor/components/lang.component';
import { ResourceComponent } from './jsonEditor/components/resource.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    JsonComponent,
    LangComponent,
    ResourceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    LangService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
