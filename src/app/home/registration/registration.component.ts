import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../models/user';
import { ApiService } from '../shared/api.service';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { minimumAgeValidator, minimumYearValidator } from '../shared/custom-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  regUser: User[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private userService: UserService, private http: HttpClient, private router: Router, private dialog: MatDialog ) {

    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, minimumAgeValidator(12), minimumYearValidator(1900)]],
      language: ['', Validators.required]
    });
   
    this.userService.userSubject.subscribe(value => {
      this.regUser = value;
    });
   }

  ngOnInit(): void {
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get language() {
    return this.registrationForm.get('language');
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }

  sendRegistration() {
    const dialogConfig = {
      hasBackdrop: true,
      width: '60vw',
      data: {
        title: 'Regisztráció',
        question: 'Elküldöd a regisztrációs adataid?'
      }
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {

    if(!this.registrationForm.valid) {
      alert('Minden mező kitöltése kötelező');
      return;
    }
    let user = new User(null, 
      this.registrationForm.value.username, 
      this.registrationForm.value.email, 
      this.registrationForm.value.firstName, 
      this.registrationForm.value.lastName, 
      this.registrationForm.value.dateOfBirth, 
      this.registrationForm.value.language);
    
    this.userService.newRegistration(user); 
     

    console.log(this.regUser);

     this.api.post("user/register", this.regUser[0]).subscribe((value: User) => {
      console.log(value);
    }, error => {
      alert("Error!");
    });

    alert('Sikeres regisztráció! Egy megerősítő linket küldtünk a megadott email címre, ellenőrizze a postafiókját.'); 
    this.registrationForm.reset();
    
    this.router.navigateByUrl('*');
      }
    });
  }
  
}