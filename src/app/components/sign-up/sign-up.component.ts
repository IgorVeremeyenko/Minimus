import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const isLogged = this.authService.isLoggedIn;
    if(isLogged) this.router.navigateByUrl('main');
  }

}
