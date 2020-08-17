import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {BoxModel} from './boxes.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private boxs: BoxModel[] = [];
  private boxsUpdated = new Subject<BoxModel[]>();
  form: FormGroup = new FormGroup({
    box_id: new FormControl(null),
    box_label: new FormControl('', Validators.required),
    address_mac: new FormControl(''),
    description: new FormControl(''),
    version: new FormControl(''),
    MachineId: new FormControl(''),
    SiteId: new FormControl(''),

  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  Addbox(box_label: string,
         address_mac: string, description: string,
         version: string, MachineId: string,
         SiteId: string
  ) {
    const Data = {
      'box_label': box_label,
      'address_mac': address_mac,
      'description': description,
      'version': version,
      'MachineId': MachineId,
      'SiteId': SiteId


    }
    this.http.post<{ message: string, data: BoxModel }>(BACKEND_URL + '/api/box/add', Data)
      .subscribe((responseData) => {
        const box: BoxModel = {
          box_id: responseData.data.box_id,
          box_label: box_label,
          address_mac: address_mac,
          version: version,
          description: description,
          SiteId: SiteId,
          site: responseData.data.site,
          MachineId: MachineId,
          machine: responseData.data.machine

        }
        this.boxs.push(box);
        this.boxsUpdated.next([...this.boxs]);
        this.router.navigate(['/admin/boxs']);

      });
  }

  getboxs() {
    this.http.get<{ message: string, data: BoxModel[] }>(BACKEND_URL + '/api/box/find')
      .pipe(map((boxData) => {
        return boxData.data.map(box => {
          return {
            box_id: box.box_id,
            box_label: box.box_label,
            addressmac: box.address_mac,
            description: box.description,
            version: box.version,
            SiteId: box.SiteId,
            site: box.site,
            MachineId: box.MachineId,
            machine: box.machine
          };
        });
      }))
      .subscribe((transformedboxs) => {

        this.boxs = transformedboxs;
        this.boxsUpdated.next([...this.boxs]);

      });
  }

  populateForm(box) {
    this.form.patchValue(box);
  }

  getboxUpdateListner() {
    return this.boxsUpdated.asObservable();
  }

  Deletebox(box_id: String) {
    this.http.delete(BACKEND_URL + '/api/box/delete/' + box_id).subscribe(
      () => {
        const updatedboxs = this.boxs.filter(box => box.box_id !== box_id);
        this.boxs = updatedboxs;
        this.boxsUpdated.next([...this.boxs]);
      }
    );
  }

  Updatebox(box_id: string, box_label: string,
            address_mac: string, description: string,
            version: string, MachineId: string,
            SiteId: string
  ) {

    const boxData = {
      box_id: box_id,
      box_label: box_label,
      address_mac: address_mac,
      description: description,
      version: version,
      MachineId: MachineId,
      SiteId: SiteId

    }
    this.http.put<{ message: string, data: BoxModel }>(BACKEND_URL + '/api/box/update/' + box_id, boxData)
      .subscribe(responseData => {
        const Updatedboxs = [...this.boxs];
        const oldboxsIndex = Updatedboxs.findIndex(s => s.box_id === box_id);
        const box: BoxModel = {
          box_id: box_id,
          box_label: box_label,
          description: description,
          address_mac: address_mac,
          version: version,
          SiteId: SiteId,
          site: responseData.data.site,
          MachineId: MachineId,
          machine: responseData.data.machine
        };
        Updatedboxs[oldboxsIndex] = box;
        this.boxs = Updatedboxs;
        this.boxsUpdated.next([...this.boxs]);
        this.router.navigate(['/admin/boxs/boxList']);


      })

  }

  initializeFormGroup() {
    this.form.setValue({
      'box_id': null,
      'box_label': '',
      'address_mac': '',
      'description': '',
      'version': '',
      'SiteId': '',
      'MachineId': ''


    });
  }

}
