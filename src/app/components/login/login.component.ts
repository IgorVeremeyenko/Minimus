import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup

  position!: string;

  displayPosition: boolean = false;

  mail!: string;

  constructor(public auth: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(6))
    })
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
}

  get email(){
    return this.userForm.get('email')
  }
  
  get password(){
    return this.userForm.get('password')
  }

  get validForm(){
    return this.email?.valid && this.password?.valid && this.password?.touched
  }

  forgotPass(){
    this.auth.ForgotPassword(this.mail).then(()=> console.log('check your email')).catch(err=> console.log(err))
  }
}
