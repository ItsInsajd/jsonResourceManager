import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../jsonEditor/models/group';
import { Language } from '../jsonEditor/models/language';
import { LangService } from '../services/lang.service';
import { Row } from './models/row';
import { Table } from './models/table';
import { Translation } from './models/translation';

@Component({
  selector: 'table-editor',
  templateUrl: './tableEditor.component.html',
  styleUrls: ['./tableEditor.component.css', '../app.component.css']
})
export class TableEditorComponent {
  @Input()tables: Array<Table>;
  @Input()languages: Array<string>;
  private langSubscription: Subscription;
  private groupSubscription: Subscription;

  constructor(private langService: LangService) { }

  addTable(name : string) {
    let tab = new Table(name, []);

    if (this.languages.length > 0) {
      let row = new Row('', name);
      row.createEmptyRow(this.languages);
      tab.rows.push(row);
    }
    this.tables.push(tab);
  }
  ngOnInit() {
    this.langService.groupSource$.subscribe((group: Group) => {
      if (!this.tables.some(t => t.name === group.name)) {
        let row = new Row('', group.name);
        row.createEmptyRow(this.languages);
        let table = new Table(group.name, [row]);
        this.tables.push(table);
      }
    });
    this.langService.langSource$.subscribe((lang: string) => {
      console.log(lang);
      console.log(this.languages);
      this.tables.forEach(tab => {
        tab.injectNewLanguage(lang);
      });
    });
  }

  ngOnDestroy() {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
