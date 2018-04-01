import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Group } from '../jsonEditor/models/group';
import { Resource } from '../jsonEditor/models/resource';

@Injectable()
export class LangService {
  public $langSub = new Subject<Group>();
  public $resKeySub = new Subject<Resource>();
  public $resValSub = new Subject<Resource>();

  constructor() { }
}
