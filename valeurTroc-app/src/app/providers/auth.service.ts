import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  provider: firebase.auth.GoogleAuthProvider;
  isLogged: boolean;
  user: User = new User(null);


  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(this.provider);
  }

  logout() {
    return firebase.auth().signOut();
  }

  getUser(): User {
    return this.user;
  }


  initAuth() {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.isLogged = true;
        this.user.name = auth.displayName;
        this.user.mail = auth.email;
        this.user.$uid = auth.uid;
        console.log('Connecté');
        this.router.navigate(['']);
      } else {
        console.log('Déconnecté');
        this.isLogged = false;
        this.user.name = '';
        this.user.mail = '';
        this.user.$uid = '';
        this.router.navigate(['login']);
      }
    });
  }
}
