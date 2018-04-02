import { Component, Input } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { Resource } from '../models/resource';

@Component({
  selector: 'resource',
  templateUrl: '../templates/resource.component.html',
  styleUrls: ['../styles/resource.component.css', '../../app.component.css']
})
export class ResourceComponent {
  @Input()resource: Resource;

  constructor(private langService: LangService) { }

  onKeyChange() {
    this.langService.$resKeySub.next(this.resource);
  }

  onValueChange(value: string) {
    let res = new Resource(this.resource.key, value, this.resource.parentGroupName, this.resource.parentLangName);
    this.langService.$resValSub.next(res);
  }
}
