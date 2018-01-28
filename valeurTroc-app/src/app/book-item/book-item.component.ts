import { Item } from '../models/item';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DBService } from '../providers/db.service';
import { UtilService } from '../providers/util.service';
import { CalendarEvent } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  areRangesOverlapping,
  isAfter,
  isEqual,
  isWithinRange
} from 'date-fns';
import { Lending } from '../models/lending';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../providers/auth.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  itemToBook: Item;
  itemKey: string;
  view = 'month';

  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();

  newEvent: CalendarEvent = new Lending({ start: new Date(), end: new Date(), title: '' });
  bookingValid = true;

  // si faux : debut, si vrai : fin
  setStart = true;

  viewDate: Date = new Date();
  activeDayIsOpen = true;


  constructor(private router: Router, private route: ActivatedRoute, private db: DBService,
    public authService: AuthService, private utilService: UtilService) {

  }

  handleEvent(action: string, event: CalendarEvent): void {

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (this.setStart) {
      this.newEvent.start = date;
    } else {
      this.newEvent.end = date;
    }
    this.bookingValid = this.isValid();

    this.setStart = !this.setStart;
    this.refresh.next();
  }

  bookItem() {
    this.db.updateItem(this.itemKey, this.itemToBook.toTO());
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.itemKey = this.route.snapshot.paramMap.get('itemKey');
    console.log(this.itemKey);
    if (this.itemKey != null) {
      this.db.getItem(this.itemKey).then(item => {
        this.itemToBook = item;
        if (this.itemToBook.lendings !== null) {
          this.events = this.itemToBook.lendings;
        }
        this.events.push(this.newEvent);
        this.refresh.next();
        this.bookingValid = this.isValid();
      });
    }

    this.newEvent.title = this.authService.getUser().name;
    (this.newEvent as Lending).mail = this.authService.getUser().mail;
    this.newEvent.color = {
      secondary: this.utilService.getColorFromString(this.authService.getUser().name),
      primary: this.utilService.getColorFromString(this.authService.getUser().mail)
    };

  }

  private isValid(): boolean {
    let valid = true;
    if (isAfter(this.newEvent.start, this.newEvent.end)) {
      valid = false;
    }

    for (const event of this.events) {
      try {
        if (this.newEvent !== event &&
          (areRangesOverlapping(this.newEvent.start, this.newEvent.end, event.start, event.end)
            || isWithinRange(this.newEvent.start, event.start, event.end)
          )) {
          valid = false;
        }
      } catch (e) {
        valid = false;
      }
    }
    return valid;
  }
}
