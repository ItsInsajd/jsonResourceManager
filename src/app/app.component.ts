import { Component } from '@angular/core';
import { Locale } from './jsonEditor/models/locale';
import { Row } from './tableEditor/models/row';
import { Table } from './tableEditor/models/table';
import { TableGroup } from './tableEditor/models/tableGroup';
import { Translation } from './tableEditor/models/translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages: Array<string>;
  locale: Locale;
  tableGroup: TableGroup;
  isTableView: boolean = false;

  constructor() {
    this.languages = new Array<string>();
    this.locale = new Locale();
    this.tableGroup = new TableGroup();
  }

  convertToTable(): void {
    this.isTableView = true;
    this.locale.languages[0].groups.forEach(group => {
      let rows = new Array<Row>();
      group.resources.forEach(res => {
        rows.push(new Row(res.key));
      });
      this.tableGroup.tables.push(new Table(group.name, rows));
    });

    this.locale.languages.forEach(lang => {
      this.languages.push(lang.name);
      lang.groups.forEach(group => {
        group.resources.forEach(res => {
          let trans = new Translation(lang.name, res.value);
          let table = this.tableGroup
            .tables.find(t => t.name == group.name)
            .rows.find(r => r.key == res.key)
            .values.push(trans);
        });
      });
    });

    console.log(this.tableGroup);
  }
}
