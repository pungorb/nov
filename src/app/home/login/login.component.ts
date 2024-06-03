import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  userDetails: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const savedUserData = localStorage.getItem('userDetails');
    if (savedUserData) {
      this.userDetails = JSON.parse(savedUserData);
    }
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe((response) => {
      this.userDetails = response.body;
      localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
    }, (error) => {
      console.error('Login failed', error);
    });
  }

  updateUserData() {
    if (this.userDetails && this.userDetails.userId) {
      const updatedData = {
        language: this.userDetails.language,
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        dateOfBirth: this.userDetails.dateOfBirth
      };

      this.authService.updateUser(this.userDetails.userId, updatedData).subscribe(response => {
        console.log('A felhasználó adatainak frissítése sikeres: ', response);
        
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails));

      }, error => {
        console.error('Hiba a felhasználó adatainak frissítésekor: ', error);
      });
    } else {
      console.error('Nincs felhasználó azonosító!');
    }
  }
}
