import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    userName: 'kevin',
    pass: '123'
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.singin(this.user).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['priv']);
    })
  }

}