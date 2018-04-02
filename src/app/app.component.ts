import { Component } from '@angular/core';
import { Group } from './jsonEditor/models/group';
import { Language } from './jsonEditor/models/language';
import { Locale } from './jsonEditor/models/locale';
import { Resource } from './jsonEditor/models/resource';
import { Row } from './tableEditor/models/row';
import { Table } from './tableEditor/models/table';
import { Translation } from './tableEditor/models/translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages: Array<string>;
  locale: Locale;
  tables: Array<Table>;
  isTableView: boolean = false;

  constructor() {
    this.languages = new Array<string>();
    this.locale = new Locale();
    this.tables = new Array<Table>();
  }

  switchView($event): void {
    if ($event.nextId === 'tableTab') {
      this.convertToTable();
    } else {
      this.convertToJson();
    }
  }

  convertToTable(): void {
    console.log('table');
    if (this.isTableView) return;

    this.isTableView = true;
    this.tables = new Array<Table>();
    this.languages = new Array<string>();
    this.locale.languages[0].groups.forEach(group => {
      let rows = new Array<Row>();
      group.resources.forEach(res => {
        if (res.key !== '' && !rows.some(r => r.key == res.key))
          rows.push(new Row(res.key));
      });
      this.tables.push(new Table(group.name, rows));
    });

    this.locale.languages.forEach(lang => {
      this.languages.push(lang.name);
      lang.groups.forEach(group => {
        group.resources.forEach(res => {
          if (res.key !== '') {
            let table = this.tables.find(t => t.name == group.name);
            let row = table.rows.find(r => r.key == res.key);
            let trans = new Translation(lang.name, res.value);

            if (!row.values.some(v => v.language == lang.name)) {
              row.values.push(trans);
            }
          }
        });
      });
    });

    console.log(this.tables);
  }

  convertToJson(): void {
    if (!this.isTableView) return;

    this.isTableView = false;
    this.locale = new Locale();
    let langs = new Array<Language>();

    this.languages.forEach(l => {
      let groups = Array<Group>();

      this.tables.forEach(t => {
        let resources = new Array<Resource>();

        t.rows.forEach(r => {
          let trs = r.values.find(v => v.language == l);
          let val = trs != null ? trs.value : '';
          resources.push(new Resource(r.key, val, t.name, l));
        });

        let group = new Group(t.name, l, resources);
        groups.push(group);
      });
      langs.push(new Language(l, groups));
    });
    this.locale.languages = langs;

    console.log(this.locale);
  }
}
