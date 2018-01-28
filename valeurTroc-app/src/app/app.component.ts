import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './providers/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { IdGenService } from './providers/id-gen.service';
import { DBService } from './providers/db.service';
import { UtilService } from './providers/util.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, IdGenService, DBService, UtilService]
})
export class AppComponent {
  user: User;

  // @Autowire
  // private static AuthService authService;

  constructor(private authService: AuthService, private router: Router) {
    authService.initAuth();
    this.user = authService.getUser();
  }

}
