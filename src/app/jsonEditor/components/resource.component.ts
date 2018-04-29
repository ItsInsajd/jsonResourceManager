import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LangService } from '../../services/lang.service';
import { Resource } from '../models/resource';
import { Row } from '../../tableEditor/models/row';

@Component({
  selector: 'resource',
  templateUrl: '../templates/resource.component.html',
  styleUrls: ['../styles/resource.component.css', '../../app.component.css']
})
export class ResourceComponent implements OnInit, OnDestroy {
  @Input()resource: Resource;
  private rowValSub: Subscription;

  constructor(private langService: LangService) { }

  public ngOnInit(): void {
    this.langService.rowValSource$.subscribe(row => {
      if (this.resource.uid === row['uid'] && this.resource.parentLangName === row['translation'].language) {
        this.resource.value = row['translation'].value;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.rowValSub) {
      this.rowValSub.unsubscribe();
    }
  }

  onKeyChange() {
    this.langService.addResourceKey(this.resource);
  }

  onValueChange(value: string) {
    this.resource.value = value;
    this.langService.pushResourceValue(this.resource);
  }
}
