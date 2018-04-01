import { Component, Input } from '@angular/core';
import { TableGroup } from './models/tableGroup';

@Component({
  selector: 'table-editor',
  templateUrl: './tableEditor.component.html',
  styleUrls: ['./tableEditor.component.css']
})
export class TableEditorComponent {
  @Input()tableGroup: TableGroup;
  @Input()languages: Array<string>;
}
