import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LangService } from '../../services/lang.service';
import { Resource } from '../models/resource';

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

  constructor(private langService: LangService) { }

  ngOnInit() {
    this.insertEmptyLine();

    this.resSubscription = this.langService.$resKeySub.subscribe((res: Resource) => {
      this.insertEmptyLine();

      if (this.resources.some(r => r.uid === res.uid) && this.groupName === res.parentGroupName) {
        this.resources.find(r => r.uid === res.uid).key = res.key;
      } else if (!this.resources.some(r => r.uid === res.uid) && this.groupName === res.parentGroupName) {
        this.resources[this.resources.length-1] = res.copy(this.groupName, this.langName);
      }
    });
    this.resValSub = this.langService.$resValSub.subscribe((res: Resource) => {
      if (this.resources.some(a => a.key === res.key) && this.groupName === res.parentGroupName && this.langName == res.parentLangName) {
        this.resources.find(a => a.key === res.key).value = res.value;
      } else {
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
}
