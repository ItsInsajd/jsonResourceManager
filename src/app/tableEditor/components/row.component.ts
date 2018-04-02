import { Component, Input } from '@angular/core';
import { Row } from '../models/row';

@Component({
  selector: 'resource-row',
  templateUrl: '../templates/row.component.html',
  styleUrls: ['../styles/row.component.css', '../../app.component.css']
})
export class RowComponent {
  @Input()row: Row;
}
