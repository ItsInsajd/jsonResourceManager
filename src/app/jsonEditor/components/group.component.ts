import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LangService } from '../../services/lang.service';
import { Resource } from '../models/resource';
import { Row } from '../../tableEditor/models/row';

@Component ({
  selector: 'group',
  templateUrl: '../templates/group.component.html',
  styleUrls: ['../styles/group.component.css', '../../app.component.css']
})
export class GroupComponent implements OnInit {
  @Input()resources: Array<Resource>;
  @Input()groupName: string;
  @Input()langName: string;
  private resSubscription: Subscription;
  private resValSub: Subscription;
  private rowKeySub: Subscription;

  constructor(private langService: LangService) { }

  ngOnInit() {
    this.insertEmptyLine();

    this.langService.resKeySource$.subscribe((res: Resource) => {
      this.insertEmptyLine();

      if (this.resources.some(r => r.uid === res.uid) && this.groupName === res.parentGroupName) {
        this.resources.find(r => r.uid === res.uid).key = res.key;
      } else if (!this.resources.some(r => r.uid === res.uid) && this.groupName === res.parentGroupName) {
        this.resources[this.resources.length-1] = res.copy(this.groupName, this.langName);
      }
    });
    this.langService.resValSource$.subscribe((res: Resource) => {
      if (this.resources.some(a => a.key === res.key) && this.groupName === res.parentGroupName && this.langName == res.parentLangName) {
        this.resources.find(a => a.key === res.key).value = res.value;
      }
    });
    this.langService.rowKeySource$.subscribe((row: Row) => {
      if (this.groupName !== row.parentTableName || row.key === '') return;

      if (!this.resources.some(r => r.uid === row.uid)) {
        this.createNewResource(row);
      } else {
        this.updateResourceKey(row);
      }
    });
  }

  ngOnDestroy() {
    if (this.resSubscription) {
      this.resSubscription.unsubscribe();
    }
    if (this.resValSub) {
      this.resValSub.unsubscribe();
    }
  }

  private insertEmptyLine(): void {
    let empty = new Resource('', '', this.groupName, this.langName);

    if (!this.resources.some(r => r.key === '' && r.parentGroupName === this.groupName)) {
      this.resources.push(empty);
    }
  }

  private createNewResource(row: Row) {
    let res = new Resource(row.key, '', this.groupName, this.langName, row.uid);
    if (this.resources[this.resources.length-1].key === '') {
      this.resources[this.resources.length-1] = res;
      this.insertEmptyLine();
    } else {
      this.resources.push(res);
    }
  }

  private updateResourceKey(row: Row) {
    let res = this.resources.find(r => r.uid === row.uid);
    if (res) {
      res.key = row.key;
    }
  }
}
