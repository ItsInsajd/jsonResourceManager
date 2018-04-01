import { Component } from '@angular/core';
import { Locale } from './models/locale';

@Component({
  selector: 'json-editor',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent {
  locale: Locale;

  constructor() {
    this.locale = new Locale();
  }

  addLanguage(langName: string) {
    this.locale.addLanguage(langName);
  }
}
