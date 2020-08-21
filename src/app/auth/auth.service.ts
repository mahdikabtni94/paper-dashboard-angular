import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {NotificationService} from '../notification.service';
import {Users} from '../pages/users/users.model';
import * as jwt_decode from 'jwt-decode';


@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private tokenTimer: any;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private currentUserSubject: BehaviorSubject<Users>;

  constructor(private http: HttpClient, private router: Router, private notification: NotificationService) {
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string) {
    const authData = {email: email};
    this.http
      .post('http://localhost:3000/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http
      .post<{ token: string; expiresIn: number, user: Users, message: string }>(
        'http://localhost:3000/login',
        authData
      )
      .subscribe(response => {
          if (response.user.Activated === false) {
            this.router.navigate(['/']);
            this.notification.warn('Account is not Activated');
          }
          const token = response.token;
          this.token = token;
          if (token && response.user.Activated === true) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate);
            this.router.navigate(['/admin']);
            this.notification.success('Authentication Successful ');
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/']);
          this.notification.warn('Authentication Failed');

        }
      )
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);

  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  resetPassword(email: string) {
    const resetEmail = {email: email};
    this.http.post<{ message: string, token: string }>('http://localhost:3000/forgetPassword', resetEmail)
      .subscribe(response => {
        this.notification.success(response.message);
        this.router.navigate(['/']);

      }, (err: HttpErrorResponse) => {
        this.notification.warn(err.message);

      })


  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

}
