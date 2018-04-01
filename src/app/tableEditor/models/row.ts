import { Translation } from './translation';

export class Row {
  key: string;
  values: Array<Translation>;

  constructor(key: string, values?: Array<Translation>) {
    this.key = key;
    this.values = values || new Array<Translation>();
  }
}
