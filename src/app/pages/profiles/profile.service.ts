import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ProfileModel} from './profile.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private Profiles: ProfileModel[] = [];
  private ProfilesUpdated = new Subject<ProfileModel[]>();
  form: FormGroup = new FormGroup({
    profile_id: new FormControl(null),
    profile_label: new FormControl('', [Validators.required]),
    profile_description: new FormControl(''),
    has_update: new FormControl('N'),
    has_delete: new FormControl('N'),
    has_save: new FormControl('N'),
    permissions: new FormArray([]),
  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  getProfiles() {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/profile/find')
      .pipe(map((Data) => {

        return Data.data.map(profile => {
          const permissionList: string[] = [];
          profile.permissions.forEach(permession => {
            permissionList.push(permession.permission_id)
          })
          return {

            profile_id: profile.profile_id,
            profile_label: profile.profile_label,
            profile_description: profile.profile_description,
            has_update: profile.has_update,
            has_delete: profile.has_delete,
            has_save: profile.has_save,
            permissions: permissionList
          };
        });
      }))
      .subscribe((transformedProfiles) => {
        this.Profiles = transformedProfiles;
        this.ProfilesUpdated.next([...this.Profiles]);

      });

  }

  AddProfile(profile_label: string, profile_description: string,
             has_update: string, has_delete: string,
             has_save: string, permissions: [],
  ) {
    const Data = {
      'profile_label': profile_label,
      'profile_description': profile_description,
      'has_update': has_update,
      'has_delete': has_delete,
      'has_save': has_save,
      'permissions': permissions
    }
    this.http.post<{ message: string, data: ProfileModel }>(BACKEND_URL + '/api/profile/add', Data)
      .subscribe((responseData) => {
        const profile: ProfileModel = {
          profile_id: responseData.data.profile_id,
          profile_label: profile_label,
          profile_description: profile_description,
          has_update: has_update,
          has_delete: has_delete,
          has_save: has_save,
          permissions: permissions,
        }
        this.Profiles.push(profile);
        this.ProfilesUpdated.next([...this.Profiles]);
         this.router.navigate(['/admin/users/ProfileList']);

      });
  }

  populateForm(profile) {
    setTimeout(() => {
      this.form.patchValue(profile);
    });
  }

  DeleteProfile(profile_id: String) {
    this.http.delete(BACKEND_URL + '/api/profile/delete/' + profile_id).subscribe(
      () => {
        const updatedprofiles = this.Profiles.filter(profile => profile.profile_id !== profile_id);
        this.Profiles = updatedprofiles;
        this.ProfilesUpdated.next([...this.Profiles]);
      }
    );
  }

  Updateprofile(profile_id: string, profile_label: string,
                profile_description: string, has_update: string,
                has_delete: string, has_save: string, permissions: []
  ) {

    const profileData = {
      profile_id: profile_id,
      profile_label: profile_label,
      profile_description: profile_description,
      has_update: has_update,
      has_delete: has_delete,
      has_save: has_save,
      permissions: permissions

    }
    this.http.put<{ message: string, data: ProfileModel }>(BACKEND_URL + '/api/profile/update/' + profile_id, profileData)
      .subscribe(responseData => {
        const Updatedprofiles = [...this.Profiles];
        const oldprofilesIndex = Updatedprofiles.findIndex(p => p.profile_id === profile_id);
        const profile: ProfileModel = {
          profile_id: profile_id,
          profile_label: profile_label,
          profile_description: profile_description,
          has_update: has_update,
          has_delete: has_delete,
          has_save: has_save,
          permissions: permissions

        }
        Updatedprofiles[oldprofilesIndex] = profile;
        this.Profiles = Updatedprofiles;
        this.ProfilesUpdated.next([...this.Profiles]);
       //  this.router.navigate(['/admin/users/ProfileList']);
        location.reload();


      })

  }

  getProfilesUpdateListner() {
    return this.ProfilesUpdated.asObservable();
  }

  initializeFormGroup() {
    setTimeout(() => {
      this.form.setValue({
        'profile_id': null,
        'profile_label': '',
        'profile_description': '',
        'has_update': 'N',
        'has_delete': 'N',
        'has_save': 'N',
        'permissions': []
      });
    }, )

  }

}
