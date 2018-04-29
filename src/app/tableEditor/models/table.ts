import { Row } from './row';
import { Translation } from './translation';

export class Table {
  name: string;
  rows: Array<Row>;

  constructor(name: string, rows?: Array<Row>) {
    this.name = name;
    this.rows = rows ||  new Array<Row>();
    //let translations = new Array<Translation>();

    /*if(languages) {
      languages.forEach(l => {
        let translation = new Translation(l, '');
        translations.push(translation);
      });
      this.rows.push(new Row('', translations));
    }*/
  }

  public injectNewLanguage(lang: string) {
    this.rows.forEach(row => {
      row.injectNewLanguage(lang);
    })
  }
}
