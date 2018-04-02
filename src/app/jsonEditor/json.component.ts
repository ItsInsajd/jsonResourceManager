import { Component, Input } from '@angular/core';
import { Locale } from './models/locale';

@Component({
  selector: 'json-editor',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css', '../app.component.css']
})
export class JsonComponent {
  @Input()locale: Locale;
  @Input()languages: Array<string>;

  constructor() {
    //this.locale = new Locale();
  }

  addLanguage(langName: string) {
    this.locale.addLanguage(langName);
    //this.languages.push(langName);
  }
}
