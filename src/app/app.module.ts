import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LangService } from './services/lang.service';

import { AppComponent } from './app.component';
import { JsonComponent } from './jsonEditor/json.component';
import { GroupComponent } from './jsonEditor/components/group.component';
import { LangComponent } from './jsonEditor/components/lang.component';
import { ResourceComponent } from './jsonEditor/components/resource.component';
import { RowComponent } from './tableEditor/components/row.component';
import { TableEditorComponent } from './tableEditor/tableEditor.component';
import { TableComponent } from './tableEditor/components/table.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    JsonComponent,
    LangComponent,
    ResourceComponent,
    RowComponent,
    TableEditorComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    LangService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
