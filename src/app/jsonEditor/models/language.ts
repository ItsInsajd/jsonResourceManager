import { Group } from './group';

export class Language {
  name: string;
  groups: Array<Group>;

  constructor(name: string, groups?: Array<Group>) {
    this.name = name;
    this.groups = groups || new Array<Group>();
  }

  public toJson(): Object {
    let obj = {};
    this.groups.forEach(g => {
      obj[g.name] = g.toJson();
    });

    return obj;
  }
}
