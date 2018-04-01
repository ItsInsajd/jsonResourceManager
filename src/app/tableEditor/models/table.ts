import { Row } from './row';

export class Table {
  name: string;
  rows: Array<Row>;

  constructor(name: string, rows?: Array<Row>) {
    this.name = name;
    this.rows = rows || new Array<Row>();
  }
}
