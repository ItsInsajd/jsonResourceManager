import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Group } from '../models/group';
import { Language } from '../models/language';
import { Resource } from '../models/resource';
import { LangService } from '../../services/lang.service';

@Component ({
  selector: 'lang',
  templateUrl: '../templates/lang.component.html',
  styleUrls: ['../styles/lang.component.css', '../../app.component.css']
})
export class LangComponent implements OnInit, OnDestroy {
  @Input()lang: Language;
  groupInput: string;
  private langSubscription: Subscription;

  constructor(private langService: LangService) { }

  ngOnInit() {
    this.langService.groupSource$.subscribe((group: Group) => {
      if (!this.lang.groups.some(g => g.name === group.name)) {
        let groupCopy = group.copy(this.lang.name);

        this.lang.groups.push(groupCopy);
      }
    })
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  addGroup(): void {
    let group = new Group(this.groupInput, this.lang.name);
    this.langService.addGroup(group);
    this.groupInput = '';
  }
}
