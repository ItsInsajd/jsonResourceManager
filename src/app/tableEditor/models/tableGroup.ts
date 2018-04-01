import { Table } from './table';

export class TableGroup {
  tables: Array<Table>;

  constructor(tables?: Array<Table>) {
    this.tables = tables || new Array<Table>();
  }
}
