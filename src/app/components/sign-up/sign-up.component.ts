import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  value9: any;
  value10: any;
  nameValue!: string;
  emailValue!: string;
  formIsOk: boolean = false;
  blockedDocument: boolean = false;
  public userform!: FormGroup;
  public dirtyPassword: any = "ng-invalid ng-dirty"

  constructor(
    public authService: AuthService,
    public router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      name: new FormControl(''),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
    this.dirtyPassword = this.value9 === this.value10 ? "ng-invalid ng-dirty" : ""
    const isLogged = this.authService.isLoggedIn;
    if (isLogged) this.router.navigateByUrl('main');
  }

  register(){
    this.blockedDocument = true;
    this.authService.SignUp(this.mail?.value, this.passw?.value, this.name?.value).then(()=> {
      setTimeout(()=> {
        this.blockedDocument = false;
      }, 3000)
    })
    setTimeout(()=> {
      this.blockedDocument = false;
    }, 3000)
  }

  get passw() {
    return this.userform.get('pass')
  }

  get name() {
    return this.userform.get('name')
  }

  get confirmPass() {
    return this.userform.get('confirmPass')
  }

  get mail() {
    return this.userform.get('email')
  }

  get formValid() {
    return this.userform.valid && this.isConfirms;
  }

  get isConfirms() {

    return this.passw?.value === this.confirmPass?.value ? true : false
  }

  get confirmPassw() {
    if (this.mail?.valid && this.mail.touched && this.passw?.valid && this.userform.get('confirmPass')?.valid && this.userform.get('confirmPass')?.touched)
      this.formIsOk = true;
    else this.formIsOk = false;
    return this.userform.get('confirmPass')
  }

}
