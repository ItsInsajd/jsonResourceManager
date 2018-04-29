import { Component, Input, OnInit } from '@angular/core';
import { LangService } from '../services/lang.service';
import { Language } from './models/language';
import { Locale } from './models/locale';

@Component({
  selector: 'json-editor',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css', '../app.component.css']
})
export class JsonComponent implements OnInit {
  @Input()locale: Locale;
  @Input()languages: Array<string>;
  langInput: string;

  constructor(private langService: LangService) {
    //this.locale = new Locale();
  }

  ngOnInit(): void {
    this.langService.langSource$.subscribe((lang: string) => {
      this.locale.addLanguage(this.langInput);
    })
  }

  addLanguage() {
    this.langService.addLanguage(this.langInput);
    this.langInput = '';
  }
}
