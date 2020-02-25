import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthService, private router: Router) {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.showSpinner();
    this.authService.login(form.value.email, form.value.password);


  }
  showSpinner() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);


  }
}
