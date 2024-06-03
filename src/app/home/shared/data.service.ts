import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: User[] = [];

  constructor(private userService: UserService) {

    this.userService.userSubject.subscribe(value => {
      this.user = value;
    });

   }

  refreshForm() {
    
  }
}
