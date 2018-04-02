import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../jsonEditor/models/group';
import { LangService } from '../services/lang.service';
import { Table } from './models/table';

@Component({
  selector: 'table-editor',
  templateUrl: './tableEditor.component.html',
  styleUrls: ['./tableEditor.component.css', '../app.component.css']
})
export class TableEditorComponent {
  @Input()tables: Array<Table>;
  @Input()languages: Array<string>;
  private langSubscription: Subscription;

  constructor(private langService: LangService) { }

  /*ngOnInit() {
    this.langSubscription = this.langService.$groupSub.subscribe((group: Group) => {
      if (!this.tables.some(t => t.name === group.name)) {
        let table = new Table(group.name, this.languages);
        this.tables.push(table);
      }
    })
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }*/
}
