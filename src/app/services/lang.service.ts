import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Group } from '../jsonEditor/models/group';
import { Language } from '../jsonEditor/models/language';
import { Resource } from '../jsonEditor/models/resource';

@Injectable()
export class LangService {
  public $groupSub = new Subject<Group>();
  public $langSub = new Subject<Language>();
  public $resKeySub = new Subject<Resource>();
  public $resValSub = new Subject<Resource>();

  constructor() { }
}
