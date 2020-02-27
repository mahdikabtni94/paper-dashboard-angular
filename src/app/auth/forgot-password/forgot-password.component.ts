import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  resetPassword(form: NgForm) {
    this.authService.resetPassword(form.value.email);
  }
}
