import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DatabaseReference } from 'angularfire2/database/interfaces';
import { User } from '../models/user';
import { Item } from '../models/item';

@Injectable()
export class DBService {
  dbRef: firebase.database.Reference;

  constructor(private db: AngularFireDatabase) {
    this.dbRef = this.db.database.ref();
  }

  getFromPath(path: string): Promise<Item[]> {
    const that = this;
    return new Promise((resolve, reject) => {
      this.dbRef.ref.child(path).on('value', function (snapshot) {
        const itemList = [];
        const values = snapshot.val();
        if (values != null) {
          for (const key of Object.keys(values)) {
            const item = new Item(values[key]);
            item.key = key;
            itemList.push(item);
            that.getUser(values[key].owner).then(user => {
              item.owner = user;
            });
          }
          resolve(itemList);
          console.log('snpashot', snapshot.val(), itemList);
        }
      });
    });
  }

  getUser(uid: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.db.database.ref('/users/' + uid).once('value').then(snapshot => {
        const user = new User(snapshot.val());
        resolve(user);
      });
    });
  }

  getItem(key): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {
      this.db.database.ref('/items/' + key).once('value').then(snapshot => {
        const item = new Item(snapshot.val());
        this.getUser(snapshot.val().owner).then(user => {
          item.owner = user;
          resolve(item);
        });
      });
    });
  }

  addToPath(element: any, path: string) {
    this.db.list(path).push(element);
  }

  updateItem(key: string, item: any) {
    this.db.database.ref('/items/' + key).set(item);
  }
}
