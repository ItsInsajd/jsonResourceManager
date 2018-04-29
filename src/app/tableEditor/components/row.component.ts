import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LangService } from '../../services/lang.service';
import { Resource } from '../../jsonEditor/models/resource';
import { Row } from '../models/row';
import { Translation } from '../models/translation';

@Component({
  selector: 'resource-row',
  templateUrl: '../templates/row.component.html',
  styleUrls: ['../styles/row.component.css', '../../app.component.css']
})
export class RowComponent implements OnInit, OnDestroy {
  @Input()row: Row;
  @Input()tableName: string;
  private resValSub: Subscription;

  constructor(private langService: LangService) { }

  public ngOnInit(): void {
    this.langService.resValSource$.subscribe((res: Resource) => {
      console.log(res);
      console.log(this.row);
      if (this.tableName !== res.parentGroupName) return;

      if (this.row.uid === res.uid) {
        let translation = this.row.values.find(v => v.language === res.parentLangName);
        translation.value = res.value;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.resValSub) {
      this.resValSub.unsubscribe();
    }
  }

  public onKeyChange() {
    this.langService.addRowKey(this.row);
  }

  public onValueChange(value: Translation): void {
    this.langService.pushTranslation({ uid: this.row.uid, translation: value});
  }
}
