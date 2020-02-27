import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../../notification.service';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  token: string;


  constructor(private route: ActivatedRoute, private http: HttpClient, private Route: Router, private notificationService: NotificationService) {
  }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.token = params['token'];

        }
      );
  }

  resetPassword(form: NgForm) {
    const newPassword = {password: form.value.password};
    console.log(form.value.password);

    this.http.put<{ message: string, password: string }>(BACKEND_URL + '/resetPassword/' + this.token, newPassword)
      .subscribe(response => {
        this.notificationService.success('Password Resettled Successfully');
        this.Route.navigate(['/']);
      }, (err: HttpErrorResponse) => {
        this.notificationService.warn('An Error Has Occurred');

      })


  }

}
