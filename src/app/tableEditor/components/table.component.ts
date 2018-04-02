import { Component, Input } from '@angular/core';
import { Row } from '../models/row';
import { Table } from '../models/table';

@Component({
  selector: 'json-table',
  templateUrl: '../templates/table.component.html',
  styleUrls: ['../styles/table.component.css', '../../app.component.css']
})
export class TableComponent {
  @Input()table: Table;
  @Input()languages: Array<string>;
}
