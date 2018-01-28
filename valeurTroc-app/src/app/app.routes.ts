import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { BookItemComponent } from './book-item/book-item.component';

export const AppRoutes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'addItem', component: AddItemComponent },
    { path: 'editItem', component: UpdateItemComponent },
    { path: 'bookItem', component: BookItemComponent }
];
