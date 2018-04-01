import { Resource } from '../models/resource';

export class Group {
  name: string;
  langName: string;
  resources: Array<Resource>;

  constructor(name: string, langName: string, resources?: Array<Resource>) {
    this.name = name;
    this.langName = langName;
    this.resources = resources || new Array<Resource>();
  }

  public toJson(): Object {
    let obj = {};
    this.resources.forEach(res => {
      if (res.key !== '') {
        obj[res.key] = res.value;  
      }
    });

    return obj;
  }

  public copy(lang: string): Group {
    let resourcesCopy = new Array<Resource>();
    this.resources.forEach(res => {
      resourcesCopy.push(res.copy(this.name, lang));
    });

    return new Group(this.name, lang, resourcesCopy);
  }
}
