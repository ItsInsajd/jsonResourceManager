import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LangService } from '../../services/lang.service';
import { Resource } from '../../jsonEditor/models/resource';
import { Row } from '../models/row';
import { Table } from '../models/table';

@Component({
  selector: 'json-table',
  templateUrl: '../templates/table.component.html',
  styleUrls: ['../styles/table.component.css', '../../app.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input()table: Table;
  @Input()languages: Array<string>;
  private resKeySub: Subscription;
  private rowKeySub: Subscription;

  constructor(private langService: LangService) { }

  public ngOnInit(): void {
    this.langService.resKeySource$.subscribe((res: Resource) => {
      if (this.table.name !== res.parentGroupName || res.key === '') return;

      if (!this.table.rows.some(r => r.uid === res.uid)) {
        this.createNewRow(res);
      } else {
        this.updateRowKey(res);
      }
    });
    this.langService.rowKeySource$.subscribe((row: Row) => {
      if (this.table.name === row.parentTableName) {
        this.insertEmptyRow();
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.resKeySub) {
      this.resKeySub.unsubscribe();
    }
    if (this.rowKeySub) {
      this.rowKeySub.unsubscribe();
    }
  }

  public onLangInsert(language: string): void {
    this.langService.addLanguage(language);
    //this.languages.push(language);
    console.log(this.languages);
    this.insertEmptyRow();
  }

  private createNewRow(resource: Resource) {
    let row = new Row(resource.key, this.table.name, [], resource.uid);
    row.createEmptyRow(this.languages);
    if (this.table.rows[this.table.rows.length-1].key === '') {
      this.table.rows[this.table.rows.length-1] = row;
      this.insertEmptyRow();
    } else {
      this.table.rows.push(row);
    }
  }

  private updateRowKey(resource: Resource) {
    let row = this.table.rows.find(r => r.uid === resource.uid);
    if (row) {
      row.key = resource.key;
    }
  }

  private insertEmptyRow(): void {
    if (!this.table.rows.some(r => r.key === '')) {
      let emptyRow = new Row('', this.table.name);
      emptyRow.createEmptyRow(this.languages);
      this.table.rows.push(emptyRow);
    }
  }
}
