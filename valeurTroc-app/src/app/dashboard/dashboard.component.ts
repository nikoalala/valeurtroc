import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item';
import { AngularFireDatabase } from 'angularfire2/database';
import { IdGenService } from '../providers/id-gen.service';
import { DBService } from '../providers/db.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: Item[];
  selectedItem: Item;

  constructor(private db: DBService) { }

  ngOnInit() {
    this.getItems('/items').then(item =>  this.items = item);
    console.log(this.items);
  }

  getItems(path: string): Promise<Item[]> {
    return this.db.getFromPath(path);
  }

  add(itemName: any, path: string) {
    this.db.addToPath(itemName, '/items');
  }

  select(item: Item) {
    this.selectedItem = item;
  }

  private log(lst: any) {
    console.log(lst);
  }

}
