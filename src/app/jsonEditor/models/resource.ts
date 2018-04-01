import { v4 as uuid } from 'uuid';

export class Resource {
  uid: string;
  key: string;
  value: string;
  parentGroupName: string;
  parentLangName: string;

  constructor(key: string, value: string, group: string, lang: string, uid?: string) {
    this.key = key;
    this.value = value;
    this.parentGroupName = group;
    this.parentLangName = lang;
    this.uid = uid || uuid();
  }

  public copy(group: string, lang: string): Resource {
    return new Resource(this.key, '', group, lang, this.uid);
  }
}
