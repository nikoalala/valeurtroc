import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { DBService } from '../providers/db.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
@Component({
  selector: 'add-item',
  templateUrl: '../html/item-form.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemToAdd: Item;
  submitBtnLabel = 'Ajouter';

  constructor(private db: DBService, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.itemToAdd = new Item(null);
    this.itemToAdd.owner = this.authService.getUser();
  }

  onSubmit(form) {
    this.db.addToPath(this.itemToAdd.toTO(), '/items');
    this.router.navigate(['']);
  }

}
