import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {StaffModel} from './staff.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {mimeType} from '../../customers/mime-type.validator';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private operators: StaffModel[] = [];
  private operatorsUpdated = new Subject<StaffModel[]>();
  private supervisors: StaffModel[] = [];
  private supervisorsUpdated = new Subject<StaffModel[]>();
  private electronics: StaffModel[] = [];
  private electronicsUpdated = new Subject<StaffModel[]>();
  private mechanics: StaffModel[] = [];
  private mechanicsUpdated = new Subject<StaffModel[]>();
  form: FormGroup = new FormGroup({
    emp_id: new FormControl(null),
    emp_name: new FormControl('', Validators.required),
    emp_lastname: new FormControl(''),
    emp_gender: new FormControl(''),
    start_working_date: new FormControl(new Date()),
    last_login_date: new FormControl(new Date()),
    emp_address: new FormControl(''),
    emp_rfid: new FormControl(''),
    city: new FormControl(''),
    emp_age: new FormControl(''),
    emp_matricule: new FormControl(''),
    profile_image: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    status: new FormControl(''),
    email: new FormControl('', Validators.email),

  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  AddOperator(emp_name: string, emp_lastname: string,
              start_working_date: Date, last_login_date: Date,
              emp_address: string, emp_rfid: string,
              emp_gender: string, city: string,
              emp_age: string, emp_matricule: string,
              profile_image: File, status: string,
              email: string
  ) {
    const Data: any = new FormData();
    Data.append('emp_name', emp_name);
    Data.append('emp_lastname', emp_lastname);
    Data.append('emp_gender', emp_gender);
    Data.append('start_working_date', start_working_date);
    Data.append('last_login_date', last_login_date);
    Data.append('emp_address', emp_address);
    Data.append('emp_rfid', emp_rfid);
    Data.append('city', city);
    Data.append('emp_age', emp_age);
    Data.append('emp_matricule', emp_matricule);
    Data.append('status', status);
    Data.append('email', email);
    Data.append('profile_image', profile_image, emp_name);


    this.http.post<{ message: string, data: StaffModel }>(BACKEND_URL + '/api/employee/addOperator', Data)
      .subscribe((responseData) => {
        const staff: StaffModel = {
          emp_id: responseData.data.emp_id,
          emp_name: emp_name,
          emp_lastname: emp_lastname,
          emp_gender: emp_gender,
          start_working_date: start_working_date,
          last_login_date: last_login_date,
          emp_address: emp_address,
          emp_rfid: emp_rfid,
          city: city,
          emp_age: emp_age,
          emp_matricule: emp_matricule,
          status: status,
          email: email,
          profile_image: responseData.data.profile_image,

        }
        this.operators.push(staff);
        this.operatorsUpdated.next([...this.operators]);
        this.router.navigate(['/admin/staff']);

      });


  }

  AddSupervisor(emp_name: string, emp_lastname: string,
                start_working_date: Date, last_login_date: Date,
                emp_address: string, emp_rfid: string,
                city: string, emp_age: string,
                emp_matricule: string, profile_image: File,
                emp_gender: string, status: string, email: string
  ) {
    const Data: any = new FormData();
    Data.append('emp_name', emp_name);
    Data.append('emp_lastname', emp_lastname);
    Data.append('emp_gender', emp_gender);
    Data.append('start_working_date', start_working_date);
    Data.append('last_login_date', last_login_date);
    Data.append('emp_address', emp_address);
    Data.append('emp_rfid', emp_rfid);
    Data.append('city', city);
    Data.append('emp_age', emp_age);
    Data.append('emp_matricule', emp_matricule);
    Data.append('status', status);
    Data.append('email', email);
    Data.append('profile_image', profile_image, emp_name);


    this.http.post<{ message: string, data: StaffModel }>(BACKEND_URL + '/api/employee/addSupervisor', Data)
      .subscribe((responseData) => {
        const staff: StaffModel = {
          emp_id: responseData.data.emp_id,
          emp_name: emp_name,
          emp_lastname: emp_lastname,
          emp_gender: emp_gender,
          start_working_date: start_working_date,
          last_login_date: last_login_date,
          emp_address: emp_address,
          emp_rfid: emp_rfid,
          city: city,
          emp_age: emp_age,
          emp_matricule: emp_matricule,
          status: status,
          profile_image: responseData.data.profile_image,
          email: email

        }
        this.supervisors.push(staff);
        this.supervisorsUpdated.next([...this.supervisors]);
        this.router.navigate(['/admin/staff']);

      });


  }

  AddMechanic(emp_name: string, emp_lastname: string,
              start_working_date: Date, last_login_date: Date,
              emp_address: string, emp_rfid: string,
              city: string, emp_age: string,
              emp_matricule: string, profile_image: File,
              emp_gender: string, status: string, email: string
  ) {
    const Data: any = new FormData();
    Data.append('emp_name', emp_name);
    Data.append('emp_lastname', emp_lastname);
    Data.append('emp_gender', emp_gender);
    Data.append('start_working_date', start_working_date);
    Data.append('last_login_date', last_login_date);
    Data.append('emp_address', emp_address);
    Data.append('emp_rfid', emp_rfid);
    Data.append('city', city);
    Data.append('emp_age', emp_age);
    Data.append('emp_matricule', emp_matricule);
    Data.append('status', status);
    Data.append('email', email);
    Data.append('profile_image', profile_image, emp_name);


    this.http.post<{ message: string, data: StaffModel }>(BACKEND_URL + '/api/employee/addMechanic', Data)
      .subscribe((responseData) => {
        const staff: StaffModel = {
          emp_id: responseData.data.emp_id,
          emp_name: emp_name,
          emp_lastname: emp_lastname,
          emp_gender: emp_gender,
          start_working_date: start_working_date,
          last_login_date: last_login_date,
          emp_address: emp_address,
          emp_rfid: emp_rfid,
          city: city,
          emp_age: emp_age,
          emp_matricule: emp_matricule,
          status: status,
          profile_image: responseData.data.profile_image,
          email: email

        }
        this.mechanics.push(staff);
        this.mechanicsUpdated.next([...this.mechanics]);
        this.router.navigate(['/admin/staff']);

      });


  }

  AddElectronic(emp_name: string, emp_lastname: string,
                emp_gender: string, start_working_date: Date,
                last_login_date: Date, emp_address: string,
                emp_rfid: string, city: string,
                emp_age: string, emp_matricule: string,
                status: string, email: string,
                profile_image: File,
  ) {
    const Data: any = new FormData();
    Data.append('emp_name', emp_name);
    Data.append('emp_lastname', emp_lastname);
    Data.append('emp_gender', emp_gender);
    Data.append('start_working_date', start_working_date);
    Data.append('last_login_date', last_login_date);
    Data.append('emp_address', emp_address);
    Data.append('emp_rfid', emp_rfid);
    Data.append('city', city);
    Data.append('emp_age', emp_age);
    Data.append('emp_matricule', emp_matricule);
    Data.append('status', status);
    Data.append('email', email);
    Data.append('profile_image', profile_image, emp_name);


    this.http.post<{ message: string, data: StaffModel }>(BACKEND_URL + '/api/employee/addElectronic', Data)
      .subscribe((responseData) => {
        const staff: StaffModel = {
          emp_id: responseData.data.emp_id,
          emp_name: emp_name,
          emp_lastname: emp_lastname,
          emp_gender: emp_gender,
          start_working_date: start_working_date,
          last_login_date: last_login_date,
          emp_address: emp_address,
          emp_rfid: emp_rfid,
          city: city,
          emp_age: emp_age,
          emp_matricule: emp_matricule,
          status: status,
          profile_image: responseData.data.profile_image,
          email: email

        }
        this.electronics.push(staff);
        this.electronicsUpdated.next([...this.electronics]);
        this.router.navigate(['/admin/staff']);

      });


  }

  initializeFormGroup() {
    this.form.setValue({
      'emp_id': null,
      'emp_name': '',
      'emp_lastname': '',
      'emp_gender': '',
      'start_working_date': new Date(),
      'last_login_date': new Date(),
      'emp_address': '',
      'emp_rfid': '',
      'city': '',
      'emp_age': '',
      'emp_matricule': '',
      'profile_image': '',
      'status': '',
      'email': ''


    });
  }

  populateForm(staff) {
    this.form.patchValue(staff);
  }

  getOperators() {
    this.http.get<{ message: string, data: StaffModel[] }>(BACKEND_URL + '/api/employee/findOperator')
      .pipe(map((StaffData) => {
        return StaffData.data.map(staff => {
          return {
            emp_id: staff.emp_id,
            emp_name: staff.emp_name,
            emp_gender: staff.emp_gender,
            emp_lastname: staff.emp_lastname,
            start_working_date: staff.start_working_date,
            last_login_date: staff.last_login_date,
            emp_address: staff.emp_address,
            emp_rfid: staff.emp_rfid,
            city: staff.city,
            emp_age: staff.emp_age,
            emp_matricule: staff.emp_matricule,
            profile_image: staff.profile_image,
            status: staff.status,
            email: staff.email

          };
        });
      }))
      .subscribe((transformedstaffs) => {
        this.operators = transformedstaffs;
        this.operatorsUpdated.next([...this.operators]);

      });
  }

  getoperatorsUpdateListner() {
    return this.operatorsUpdated.asObservable();
  }

  getSupervisors() {
    this.http.get<{ message: string, data: StaffModel[] }>(BACKEND_URL + '/api/employee/findSupervisor')
      .pipe(map((StaffData) => {
        return StaffData.data.map(staff => {
          return {
            emp_id: staff.emp_id,
            emp_name: staff.emp_name,
            emp_gender: staff.emp_gender,
            emp_lastname: staff.emp_lastname,
            start_working_date: staff.start_working_date,
            last_login_date: staff.last_login_date,
            emp_address: staff.emp_address,
            emp_rfid: staff.emp_rfid,
            city: staff.city,
            emp_age: staff.emp_age,
            emp_matricule: staff.emp_matricule,
            profile_image: staff.profile_image,
            status: staff.status,
            email: staff.email

          };
        });
      }))
      .subscribe((transformedstaffs) => {
        this.supervisors = transformedstaffs;
        this.supervisorsUpdated.next([...this.supervisors]);

      });
  }

  getsupervisorUpdateListner() {
    return this.supervisorsUpdated.asObservable();
  }

  getMechanics() {
    this.http.get<{ message: string, data: StaffModel[] }>(BACKEND_URL + '/api/employee/findMechanic')
      .pipe(map((StaffData) => {
        return StaffData.data.map(staff => {
          return {
            emp_id: staff.emp_id,
            emp_name: staff.emp_name,
            emp_gender: staff.emp_gender,
            emp_lastname: staff.emp_lastname,
            start_working_date: staff.start_working_date,
            last_login_date: staff.last_login_date,
            emp_address: staff.emp_address,
            emp_rfid: staff.emp_rfid,
            city: staff.city,
            emp_age: staff.emp_age,
            emp_matricule: staff.emp_matricule,
            profile_image: staff.profile_image,
            status: staff.status,
            email: staff.email

          };
        });
      }))
      .subscribe((transformedstaffs) => {
        this.mechanics = transformedstaffs;
        this.mechanicsUpdated.next([...this.mechanics]);

      });
  }

  getmechanicUpdateListner() {
    return this.mechanicsUpdated.asObservable();
  }

  getElectronics() {
    this.http.get<{ message: string, data: StaffModel[] }>(BACKEND_URL + '/api/employee/findElectronic')
      .pipe(map((StaffData) => {
        return StaffData.data.map(staff => {
          return {
            emp_id: staff.emp_id,
            emp_name: staff.emp_name,
            emp_gender: staff.emp_gender,
            emp_lastname: staff.emp_lastname,
            start_working_date: staff.start_working_date,
            last_login_date: staff.last_login_date,
            emp_address: staff.emp_address,
            emp_rfid: staff.emp_rfid,
            city: staff.city,
            emp_age: staff.emp_age,
            emp_matricule: staff.emp_matricule,
            profile_image: staff.profile_image,
            status: staff.status,
            email: staff.email

          };
        });
      }))
      .subscribe((transformedstaffs) => {
        this.electronics = transformedstaffs;
        this.mechanicsUpdated.next([...this.electronics]);

      });
  }

  getelectronicsUpdateListner() {
    return this.electronicsUpdated.asObservable();
  }

  DeleteOperator(emp_id: String) {
    this.http.delete(BACKEND_URL + '/api/employee/delete/' + emp_id).subscribe(
      () => {
        const updatedOperators = this.operators.filter(operator => operator.emp_id !== emp_id);
        this.operators = updatedOperators;
        this.operatorsUpdated.next([...this.operators]);
      }
    );

  }

  DeleteSupervisor(emp_id: String) {
    this.http.delete(BACKEND_URL + '/api/employee/delete/' + emp_id).subscribe(
      () => {
        const updatedOperators = this.supervisors.filter(operator => operator.emp_id !== emp_id);
        this.supervisors = updatedOperators;
        this.supervisorsUpdated.next([...this.supervisors]);
      }
    );
  }

  DeleteMechanic(emp_id: String) {
    this.http.delete(BACKEND_URL + '/api/employee/delete/' + emp_id).subscribe(
      () => {
        const updatedOperators = this.mechanics.filter(operator => operator.emp_id !== emp_id);
        this.mechanics = updatedOperators;
        this.mechanicsUpdated.next([...this.mechanics]);
      }
    );
  }

  DeleteElectronic(emp_id: String) {
    this.http.delete(BACKEND_URL + '/api/employee/delete/' + emp_id).subscribe(
      () => {
        const updatedOperators = this.electronics.filter(operator => operator.emp_id !== emp_id);
        this.electronics = updatedOperators;
        this.electronicsUpdated.next([...this.electronics]);
      }
    );
  }

  UpdateOperator(emp_id: string, emp_name: string, emp_lastname: string,
                 start_working_date: Date, last_login_date: Date,
                 emp_address: string, emp_rfid: string,
                 city: string, emp_age: string,
                 emp_matricule: string, profile_image: File | string,
                 emp_gender: string, status: string, email: string
  ) {
    let Data: any | FormData;
    if (typeof (profile_image) === 'object') {
      Data = new FormData();
      Data.append('emp_name', emp_name);
      Data.append('emp_lastname', emp_lastname);
      Data.append('emp_gender', emp_gender);
      Data.append('start_working_date', start_working_date);
      Data.append('last_login_date', last_login_date);
      Data.append('emp_address', emp_address);
      Data.append('emp_rfid', emp_rfid);
      Data.append('city', city);
      Data.append('emp_age', emp_age);
      Data.append('emp_matricule', emp_matricule);
      Data.append('status', status);
      Data.append('email', email);
      Data.append(' profile_image', profile_image, emp_name);


    } else {
      Data = {
        emp_id: emp_id,
        emp_name: emp_name,
        emp_lastname: emp_lastname,
        emp_gender: emp_gender,
        start_working_date: start_working_date,
        last_login_date: last_login_date,
        emp_address: emp_address,
        emp_rfid: emp_rfid,
        city: city,
        emp_age: emp_age,
        emp_matricule: emp_matricule,
        profile_image: profile_image,
        status: status,
        email: email
      }
    }

    this.http.put<{ message: string, data: StaffModel }>(BACKEND_URL + '/api/employee/update/' + emp_id, Data)
      .subscribe(responseData => {
        const UpdatedCustomers = [...this.operators];
        const oldCustomerIndex = UpdatedCustomers.findIndex(p => p.emp_id === emp_id);
        const staff: StaffModel = {
          emp_id: emp_id,
          emp_name: emp_name,
          emp_lastname: emp_lastname,
          emp_gender: emp_gender,
          start_working_date: start_working_date,
          last_login_date: last_login_date,
          emp_address: emp_address,
          emp_rfid: emp_rfid,
          city: city,
          emp_age: emp_age,
          emp_matricule: emp_matricule,
          status: status,
          profile_image: responseData.data.profile_image,
          email: email

        };

        UpdatedCustomers[oldCustomerIndex] = staff;
        this.operators = UpdatedCustomers
        this.operatorsUpdated.next([...this.operators]);
        this.router.navigate(['/admin/staff']);


      })
  }

  UpdateSupervisor(emp_id: string, emp_name: string, emp_lastname: string,
                   start_working_date: Date, last_login_date: Date,
                   emp_address: string, emp_rfid: string,
                   city: string, emp_age: string,
                   emp_matricule: string, profile_image: File | string,
                   emp_gender: string, status: string, email: string
  ) {
    let Data: any | FormData;
    if (typeof (profile_image) === 'object') {
      Data = new FormData();
      Data.append('emp_name', emp_name);
      Data.append('emp_lastname', emp_lastname);
      Data.append('emp_gender', emp_gender);
      Data.append('start_working_date', start_working_date);
      Data.append('last_login_date', last_login_date);
      Data.append('emp_address', emp_address);
      Data.append('emp_rfid', emp_rfid);
      Data.append('city', city);
      Data.append('emp_age', emp_age);
      Data.append('emp_matricule', emp_matricule);
      Data.append('status', status);
      Data.append('email', email);
      Data.append(' profile_image', profile_image, emp_name);


    } else {
      Data = {
        emp_id: emp_id,
        emp_name: emp_name,
        emp_lastname: emp_lastname,
        emp_gender: emp_gender,
        start_working_date: start_working_date,
        last_login_date: last_login_date,
        emp_address: emp_address,
        emp_rfid: emp_rfid,
        city: city,
        emp_age: emp_age,
        emp_matricule: emp_matricule,
        profile_image: profile_image,
        status: status,
        email: email
      }
    }

    this.http.put<{ message: string, data: StaffModel }>(BACKEND_URL + '/api/employee/update/' + emp_id, Data)
      .subscribe(responseData => {
        const UpdatedCustomers = [...this.operators];
        const oldCustomerIndex = UpdatedCustomers.findIndex(p => p.emp_id === emp_id);
        const staff: StaffModel = {
          emp_id: emp_id,
          emp_name: emp_name,
          emp_lastname: emp_lastname,
          emp_gender: emp_gender,
          start_working_date: start_working_date,
          last_login_date: last_login_date,
          emp_address: emp_address,
          emp_rfid: emp_rfid,
          city: city,
          emp_age: emp_age,
          emp_matricule: emp_matricule,
          profile_image: responseData.data.profile_image,
          status: status,
          email: email

        };

        UpdatedCustomers[oldCustomerIndex] = staff;
        this.supervisors = UpdatedCustomers
        this.supervisorsUpdated.next([...this.supervisors]);
        this.router.navigate(['/admin/staff']);


      })
  }

  UpdateMechanic(emp_id: string, emp_name: string, emp_lastname: string,
                 start_working_date: Date, last_login_date: Date,
                 emp_address: string, emp_rfid: string,
                 city: string, emp_age: string,
                 emp_matricule: string, profile_image: File | string,
                 emp_gender: string, status: string, email: string
  ) {
    let Data: any | FormData;
    if (typeof (profile_image) === 'object') {
      Data = new FormData();
      Data.append('emp_name', emp_name);
      Data.append('emp_lastname', emp_lastname);
      Data.append('emp_gender', emp_gender);
      Data.append('start_working_date', start_working_date);
      Data.append('last_login_date', last_login_date);
      Data.append('emp_address', emp_address);
      Data.append('emp_rfid', emp_rfid);
      Data.append('city', city);
      Data.append('emp_age', emp_age);
      Data.append('emp_matricule', emp_matricule);
      Data.append('status', status);
      Data.append('email', email);
      Data.append(' profile_image', profile_image, emp_name);


    } else {
      Data = {
        emp_id: emp_id,
        emp_name: emp_name,
        emp_lastname: emp_lastname,
        emp_gender: emp_gender,
        start_working_date: start_working_date,
        last_login_date: last_login_date,
        emp_address: emp_address,
        emp_rfid: emp_rfid,
        city: city,
        emp_age: emp_age,
        emp_matricule: emp_matricule,
        status: status,
        profile_image: profile_image,
        email: email
      }
    }

    this.http.put<{ message: string, data: StaffModel }>(BACKEND_URL + '/api/employee/update/' + emp_id, Data)
      .subscribe(responseData => {
        const UpdatedCustomers = [...this.operators];
        const oldCustomerIndex = UpdatedCustomers.findIndex(p => p.emp_id === emp_id);
        const staff: StaffModel = {
          emp_id: emp_id,
          emp_name: emp_name,
          emp_lastname: emp_lastname,
          emp_gender: emp_gender,
          start_working_date: start_working_date,
          last_login_date: last_login_date,
          emp_address: emp_address,
          emp_rfid: emp_rfid,
          city: city,
          emp_age: emp_age,
          emp_matricule: emp_matricule,
          profile_image: responseData.data.profile_image,
          status: status,
          email: email

        };

        UpdatedCustomers[oldCustomerIndex] = staff;
        this.mechanics = UpdatedCustomers
        this.mechanicsUpdated.next([...this.mechanics]);
        this.router.navigate(['/admin/staff']);


      })
  }

  UpdateElectronics(emp_id: string, emp_name: string, emp_lastname: string,
                    start_working_date: Date, last_login_date: Date,
                    emp_address: string, emp_rfid: string,
                    city: string, emp_age: string,
                    emp_matricule: string, profile_image: File | string,
                    emp_gender: string, status: string, email: string
  ) {
    let Data: any | FormData;
    if (typeof (profile_image) === 'object') {
      Data = new FormData();
      Data.append('emp_name', emp_name);
      Data.append('emp_lastname', emp_lastname);
      Data.append('emp_gender', emp_gender);
      Data.append('start_working_date', start_working_date);
      Data.append('last_login_date', last_login_date);
      Data.append('emp_address', emp_address);
      Data.append('emp_rfid', emp_rfid);
      Data.append('city', city);
      Data.append('emp_age', emp_age);
      Data.append('emp_matricule', emp_matricule);
      Data.append('status', status);
      Data.append('email', email);
      Data.append(' profile_image', profile_image, emp_name);


    } else {
      Data = {
        emp_id: emp_id,
        emp_name: emp_name,
        emp_lastname: emp_lastname,
        emp_gender: emp_gender,
        start_working_date: start_working_date,
        last_login_date: last_login_date,
        emp_address: emp_address,
        emp_rfid: emp_rfid,
        city: city,
        emp_age: emp_age,
        emp_matricule: emp_matricule,
        profile_image: profile_image,
        status: status,
        email: email
      }
    }

    this.http.put<{ message: string, data: StaffModel }>(BACKEND_URL + '/api/employee/update/' + emp_id, Data)
      .subscribe(responseData => {
        const UpdatedCustomers = [...this.operators];
        const oldCustomerIndex = UpdatedCustomers.findIndex(p => p.emp_id === emp_id);
        const staff: StaffModel = {
          emp_id: emp_id,
          emp_name: emp_name,
          emp_lastname: emp_lastname,
          emp_gender: emp_gender,
          start_working_date: start_working_date,
          last_login_date: last_login_date,
          emp_address: emp_address,
          emp_rfid: emp_rfid,
          city: city,
          emp_age: emp_age,
          emp_matricule: emp_matricule,
          profile_image: responseData.data.profile_image,
          status: status,
          email: email

        };

        UpdatedCustomers[oldCustomerIndex] = staff;
        this.electronics = UpdatedCustomers
        this.electronicsUpdated.next([...this.electronics]);
        this.router.navigate(['/admin/staff']);


      })
  }


}
