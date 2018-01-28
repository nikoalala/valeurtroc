import {CalendarEventTitleFormatter} from 'angular-calendar/modules/common';
import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/item';
import { Router } from '@angular/router';
import { DBService } from '../providers/db.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { addMonths } from 'date-fns';
import { AuthService } from '../providers/auth.service';
import { CustomEventTitleFormatter } from '../providers/custom-event-title-formatter.provider';
@Component({
  selector: 'detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class DetailItemComponent implements OnChanges, OnInit {

  @Input() itemKey: string;
  @Input() itemToShow: Item;
  @Input() bookBtn: boolean;
  @Input() editBtn: boolean;

  item: Item;
  userOK = false;
  viewDate1: Date = new Date();
  viewDate2: Date = addMonths(new Date(), 1);

  constructor(private router: Router, private db: DBService, private authService: AuthService) { }

  ngOnInit() { }

  ngOnChanges(): void {
    if (this.itemKey != null) {
      this.db.getItem(this.itemKey).then(item => {
        this.item = item;
        this.checkUser();
      });
    } else {
      this.item = this.itemToShow;
      this.checkUser();
    }
  }

  checkUser() {
    this.userOK = false;
    if (this.item != null) {
      this.userOK = this.authService.getUser().$uid === this.item.owner.$uid;
    }
  }
  bookItem() {
    this.router.navigate(['bookItem', { 'itemKey': this.itemKey }]);
  }

  editItem() {
    console.log(this.itemKey);
    this.router.navigate(['editItem', { 'itemKey': this.itemKey }]);
  }

}

