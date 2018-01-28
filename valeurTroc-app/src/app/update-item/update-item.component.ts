import { Component, OnInit, OnChanges } from '@angular/core';
import { Item } from '../models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { DBService } from '../providers/db.service';

@Component({
  selector: 'update-item',
  templateUrl: '../html/item-form.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  itemToAdd: Item;
  itemKey: string;
  submitBtnLabel = 'Modifier';

  constructor(private router: Router, private route: ActivatedRoute, private db: DBService) { }

  ngOnInit() {
    this.itemKey = this.route.snapshot.paramMap.get('itemKey');
    console.log(this.itemKey);
    if (this.itemKey != null) {
      this.db.getItem(this.itemKey).then(item => this.itemToAdd = item);
    }
  }

 /*  ngOnChanges(): void {
    this.itemKey = this.route.snapshot.paramMap.get('itemKey');
    console.log(this.itemKey);
    if (this.itemKey != null) {
      this.db.getItem(this.itemKey).then(item => this.itemToAdd = item);
    }
  } */

  onSubmit() {
    this.db.updateItem(this.itemKey, this.itemToAdd.toTO());
    this.router.navigate(['']);
  }

}
