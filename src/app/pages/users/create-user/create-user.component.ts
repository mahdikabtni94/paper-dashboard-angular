import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {ProfileModel} from '../../profiles/profile.model';
import {Subscription} from 'rxjs';
import {ProfileService} from '../../profiles/profile.service';
import {CustomerModel} from '../../../customers/customer.model';
import {CustomerService} from '../../../customers/customer.service';
import {PhoneService} from '../../../shared/phoneCountry.service';
import {ICountry} from '../../../shared/phoneCountry.interface';
import {AbstractControl} from '@angular/forms';
import {parsePhoneNumberFromString} from 'libphonenumber-js';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  selectedCountry: any = 'TN';
  selectedPhoneNumber: any;
  countries: any[];
  subscription: Subscription;
  ProfileList: ProfileModel[] = [];
  CustomerList: CustomerModel[] = [];
  private profileSub: Subscription;
  private customerSub: Subscription;

  // tslint:disable-next-line:max-line-length
  constructor(public dialogref: MatDialogRef<CreateUserComponent>, public userService: UsersService,
              public notificationService: NotificationService, private profileService: ProfileService,
              private customerService: CustomerService, private phoneService: PhoneService) {
  }


  ngOnInit() {
    this.fetchCountryList();
    this.profileService.getProfiles();
    this.profileSub = this.profileService.getProfilesUpdateListner()
      .subscribe((profiles: ProfileModel[]) => {
        this.ProfileList = profiles;
      this.ProfileList = this.ProfileList.filter(profile => profile.profile_label !== 'SuperAdmin')

      });
    this.customerService.getCustomers();
    this.customerSub = this.customerService.getCustomerUpdateListner()
      .subscribe((customers: CustomerModel[]) => {
        this.CustomerList = customers;

      });

  }


  private fetchCountryList(): void {
    this.subscription = this.phoneService.getCountries().subscribe((res: ICountry[]) => {
      this.countries = res;
    }, error => error);
  }

  onClear() {
    this.userService.form.reset();
    this.notificationService.success(':: Form Cleared');

  }


  onClose() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogref.close();
  }

  onSaveUser() {
    if (this.userService.form.valid) {
      if (!this.userService.form.get('user_id').value) {
        this.userService.AddUser(
          this.userService.form.value.email,
          this.userService.form.value.Username,
          this.userService.form.value.Name,
          this.userService.form.value.Address,
          this.userService.form.value.Phone,
          this.userService.form.value.City,
          this.userService.form.value.ProfileId,
          this.userService.form.value.ClientId);
        this.userService.form.reset();
        this.userService.initializeFormGroup();
        this.notificationService.success(':: User Added successfully');
        this.onClose();

      } else {
        this.userService.UpdateUser(
          this.userService.form.value.user_id,
          this.userService.form.value.email,
          this.userService.form.value.Username,
          this.userService.form.value.Name,
          this.userService.form.value.Address,
          this.userService.form.value.Phone,
          this.userService.form.value.City,
          this.userService.form.value.ProfileId,
          this.userService.form.value.ClientId
        );
        this.userService.form.reset();
        this.userService.initializeFormGroup();
        this.notificationService.success(':: User Updated successfully');
        this.onClose();

      }

    }
  }

  ngOnDestroy(): void {
    this.customerSub.unsubscribe();
    this.profileSub.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetPhoneNumber(event: any): void {
    this.userService.form.controls['Phone'].setValue('');
  }

  formatPhoneNumber(event: any): void {
    const inputValue: any = this.userService.form.controls['Phone'].value;
    const phoneNumber: any = parsePhoneNumberFromString(inputValue, this.selectedCountry);
    if (phoneNumber) {
      this.selectedPhoneNumber = phoneNumber.number;
      const phoneN = phoneNumber.formatInternational();
      this.userService.form.controls['Phone'].setValue(phoneN.toString());

    }
  }


}

export function _validatePhoneNumberInput(c: AbstractControl): object {
  const inputValue: string = c.value.toString();
  const phoneNumber: any = parsePhoneNumberFromString(inputValue, this.selectedCountry);
  if (phoneNumber) {
    if (phoneNumber.isValid()) {
      return null;
    } else {
      return {
        phoneNumber: {
          valid: false
        }
      }
    }
  } else {
    return {
      phoneNumber: {
        valid: false
      }
    }
  }
}
