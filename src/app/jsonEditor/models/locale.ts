import { Group } from './group';
import { Language } from './language';

export class Locale {
  languages: Array<Language>;

  constructor() {
    this.languages = new Array<Language>();
  }

  public toJson(): string {
    let obj = {};
    this.languages.forEach(l => {
      obj[l.name] = l.toJson();
    });

    return JSON.stringify(obj);
  }

  public addLanguage(langName: string): void {
    if (langName.length > 0) {
      if (this.languages.length > 0 && this.languages[0].groups.length > 0) {
        this.copyExistingNode(langName);
      } else {
        this.languages.push(new Language(langName));
      }
    }
  }

  public copyExistingNode(langName: string): void {
    let groupsCopy = new Array<Group>();
    this.languages[0].groups.forEach(g => {
      groupsCopy.push(g.copy(langName));
    });
    this.languages.push(new Language(langName, groupsCopy));
  }
}
