import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Group } from '../jsonEditor/models/group';
import { Language } from '../jsonEditor/models/language';
import { Locale } from '../jsonEditor/models/locale';
import { Resource } from '../jsonEditor/models/resource';
import { Row } from '../tableEditor/models/row';
import { Translation } from '../tableEditor/models/translation';

@Injectable()
export class LangService {
  private langSub = new Subject<string>();
  private localeSub = new Subject<Locale>();
  private groupSub = new Subject<Group>();
  private resKeySub = new Subject<Resource>();
  private resValSub = new Subject<Resource>();
  private rowKeySub = new Subject<Row>();
  private rowValSub = new Subject<Object>();

  public langSource$ = this.langSub.asObservable();
  public localeSource$ = this.localeSub.asObservable();
  public groupSource$ = this.groupSub.asObservable();
  public resKeySource$ = this.resKeySub.asObservable();
  public resValSource$ = this.resValSub.asObservable();
  public rowKeySource$ = this.rowKeySub.asObservable();
  public rowValSource$ = this.rowValSub.asObservable();

  private languages: Array<string>;
  private locale: Locale;

  constructor() {
    this.languages = new Array<string>();
  }

  public addLanguage(lang: string): void {
    if(this.languages.some(l => l === lang)) return;

    this.languages.push(lang);
    this.langSub.next(lang);
  }

  public getLanguages(): Array<string> {
    return this.languages;
  }

  public addGroup(group: Group): void {
    this.groupSub.next(group);
  }

  public addResourceKey(res: Resource) {
    this.resKeySub.next(res);
  }

  public pushResourceValue(res: Resource) {
    this.resValSub.next(res);
  }

  public addRowKey(row: Row) {
    this.rowKeySub.next(row);
  }

  public pushTranslation(obj: Object) {
    this.rowValSub.next(obj);
  }
}
