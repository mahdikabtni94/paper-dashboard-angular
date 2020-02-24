import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Users} from './users.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
const BACKEND_URL = environment.apiUrl ;


@Injectable({providedIn: 'root'})
export class UsersService {
  private users: Users[] = [];
  private usersUpdated = new Subject<Users[]>();
  form: FormGroup = new FormGroup({
    user_id: new FormControl(null),
    email: new FormControl('', [Validators.email, Validators.required]),
    Username: new FormControl('', Validators.required),
    Name: new FormControl(''),
    Address: new FormControl(''),
    Phone: new FormControl('', Validators.minLength(8)),
    City: new FormControl(''),
    Profile: new FormControl(''),
    Activated: new FormControl(false)
  });



  constructor(private http: HttpClient, private  router: Router) {
  }


  getUsers() {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/findUser')
      .pipe(map((userData) => {
        return userData.data.map(user => {
          return {
            user_id: user.user_id,
            email: user.email,
            Username: user.Username,
            Name: user.Name,
            Address: user.Address,
            Phone: user.Phone,
            City: user.City,
            Profile: user.Profile,
            Activated: user.Activated,

          };
        });
      }))
      .subscribe((transformedUsers) => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);

      });
  }

  getUsersUpdateListner() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{ message: string, data: string }>('http://localhost:3000/findUser' + id);
  }

  AddUser(email: string, Username: string, Name: string, Address: string, Phone: string, City: string, Profile: string) {

    const Data = {
      'email': email,
      'Username': Username,
      'Name': Name,
      'Address': Address,
      'Phone': Phone,
      'City': City,
      'Profile': Profile
    }
    this.http.post<{ message: string, user: Users }>(BACKEND_URL + '/signup', Data)
      .subscribe((responseData) => {
        const user: Users = {
          user_id: responseData.user.user_id,
          email: email,
          Username: Username,
          Name: Name,
          Address: Address,
          Phone: Phone,
          City: City,
          Profile: Profile,
          Activated: responseData.user.Activated
        }
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
        this.router.navigate(['/admin/users']);

      });
  }

  // tslint:disable-next-line:max-line-length
  UpdateUser(user_id: string, email: string, Username: string, Name: string, Address: string, Phone: string, City: string, Profile: string) {
    let UserData: Users;
    UserData = {
      user_id: user_id,
      email: email,
      Username: Username,
      Name: Name,
      Address: Address,
      Phone: Phone,
      City: City,
      Profile: Profile,
      Activated: false,
    }
    this.http.put(BACKEND_URL + '/updateUser/' + user_id, UserData)
      .subscribe(responseData => {
        const UpdatedUsers = [...this.users];
        const oldUserIndex = UpdatedUsers.findIndex(p => p.user_id === user_id);
        UpdatedUsers[oldUserIndex] = UserData;
        this.users = UpdatedUsers
        this.usersUpdated.next([...this.users]);
        this.router.navigate(['/admin/users']);


      })

  }

  DeleteUser(Userid: String) {
    this.http.delete(BACKEND_URL + '/deleteUser/' + Userid).subscribe(
      () => {
        const updatedUsers = this.users.filter(user => user.user_id !== Userid);
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
      }
    );
  }

  populateForm(user) {
    this.form.setValue(user);
  }
  initializeFormGroup() {
    this.form.setValue({
      'user_id': null,
      'email': '',
      'Username': '',
      'Name': '',
      'Address': '',
      'Phone': null,
      'City': '',
      'Profile': '',
      'Activated': false
    });
  }

}
