import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {PermissionsModel} from './permissions.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private permissions: PermissionsModel[] = [];
  private permissionsUpdated = new Subject<PermissionsModel[]>();
  form: FormGroup = new FormGroup({
    permission_id: new FormControl(null),
    permission_label: new FormControl('', [Validators.required]),
    level: new FormControl(''),
    parent_menu: new FormControl(''),
  });

  constructor(private http: HttpClient) {}
  getpermissions() {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/permission/find')
      .pipe(map((Data) => {
        return Data.data.map(permission => {
          return {
            permission_id: permission.permission_id,
            permission_label: permission.permission_label,
            level : permission.level,
            parent_menu: permission.parent_menu
          };
        });
      }))
      .subscribe((transformedpermissions) => {
        this.permissions = transformedpermissions;
        this.permissionsUpdated.next([...this.permissions]);

      });

  }
  getpermissionsUpdateListner() {
    return this.permissionsUpdated.asObservable();
  }
}
