import { Translation } from './translation';
import { v4 as uuid } from 'uuid';

export class Row {
  uid: string;
  key: string;
  parentTableName: string;
  values: Array<Translation>;

  constructor(key: string, table: string, values?: Array<Translation>, uid?: string) {
    this.key = key;
    this.parentTableName = table;
    this.values = values || new Array<Translation>();
    this.uid = uid || uuid();
  }

  public createEmptyRow(languages: Array<string>) {
    languages.forEach(lang => {
      let translation = new Translation(lang, '');
      this.values.push(translation);
    });
  }

  public injectNewLanguage(lang: string) {
    this.values.push(new Translation(lang, ''));
  }

  public addNewKey(key: string) {

  }
}
