import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecodeService } from '../shared/decode.service';
import { ApiService } from '../shared/api.service';
import { UserService } from '../shared/user.service';
import { Userpassword } from '../models/userpassword';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})
export class SetpasswordComponent implements OnInit {
  // email link: https://pingu-dev.novia-it.com/register/cHVuZ29yYkBnbWFpbC5jb20vNGQyNDliNDctZjllZC00NGE1LTlmY2MtZGUxNzc2YjkyNmEwL2JlbmNlMTIzNDU2
  decodedString: string = '';
  passwordForm: FormGroup;
  username: string = '';
  email: string = '';
  token: string = '';
  password: Userpassword[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private decodeService: DecodeService, private api: ApiService, private userService: UserService, private dialog: MatDialog, private router: Router) {

    this.passwordForm = this.fb.group({
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    }, {validator: this.passwordMatchValidator});

    this.userService.userPasswordSubject.subscribe(value => {
      this.password = value;
    });

   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
       let encodedString = params.get('encodedString');
      if (encodedString) {
        this.decodedString = this.decodeService.decodeBase64(encodedString);
        console.log('Decoded String:', this.decodedString);
        this.extractEmailAndUsername(this.decodedString);
      }
    });
  }

  extractEmailAndUsername(decodedString: string): void {
    const parts = decodedString.split('/');
    if (parts.length === 3) {
      this.email = parts[0];
      this.token = parts[1];
      this.username = parts[2];
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password1'].value === form.controls['password2'].value
    ? null : { 'mismatch': true };
  }

  onSubmit(): void {

    const dialogConfig = {
      hasBackdrop: true,
      width: '60vw',
      data: {
        title: 'Megerősítés szükséges',
        question: 'Beállítod a megadott jelszót?'
      }
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        if (this.passwordForm.valid) {

          let userpassword = new Userpassword("",
            this.email,
            this.passwordForm.value.password1,
            this.passwordForm.value.password2);
    
          this.userService.addPassword(userpassword);
    
          console.log(this.password);
    
    
          this.api.put("user/register", this.token, this.password[0]).subscribe((value: Userpassword) => {
            console.log(value);
          }, error => {
            alert("Error");
            console.error('Error updating user:', error);
          });
            alert("A jelszó sikeresen beállítva");
            console.log('User updated successfully:');
        }
        this.router.navigateByUrl('*');
      }
    });

    
  }


}
