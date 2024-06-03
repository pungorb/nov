import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Userpassword } from '../models/userpassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userSubject = new BehaviorSubject<User[]>([]);
  public userPasswordSubject = new BehaviorSubject<Userpassword[]>([]);

  constructor(private http: HttpClient) { }

  newRegistration(user: User) {
    let newUser = [];
    Object.assign(newUser, this.userSubject.value);
    newUser.push(user);
    this.userSubject.next(newUser);
  }

  addPassword(userpassword: Userpassword) {
    let addpassword = [];
    Object.assign(addpassword, this.userPasswordSubject.value);
    addpassword.push(userpassword);
    this.userPasswordSubject.next(addpassword);
  }

}
