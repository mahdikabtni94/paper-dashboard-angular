import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NgForm} from '@angular/forms';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  id: string;


  constructor(private route: ActivatedRoute, private http: HttpClient, private Route: Router) {
  }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

        }
      );
  }

  resetPassword(form: NgForm) {
    const newPassword = {password: form.value.password};
    console.log(form.value.password);
    this.http.put<{ message: string, password: string }>(BACKEND_URL + '/resetPassword/' + this.id, newPassword).subscribe(response => {
      this.Route.navigate(['/']);

    })


  }

}
