import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LineModel} from './line.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class LineService {
  private lines: LineModel[] = [];
  private linesUpdated = new Subject<LineModel[]>();
  form: FormGroup = new FormGroup({
    line_id: new FormControl(null),
    line_label: new FormControl('', Validators.required),
    line_description: new FormControl(''),
    SiteId: new FormControl(''),
  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  Addline(line_label: string, line_description: string,
          SiteId: string,
  ) {
    const Data = {
      'line_label': line_label,
      'line_description': line_description,
      'SiteId': SiteId,

    }
    this.http.post<{ message: string, data: LineModel }>(BACKEND_URL + '/api/line/add', Data)
      .subscribe((responseData) => {
        const line: LineModel = {
          line_id: responseData.data.line_id,
          line_label: line_label,
          line_description: line_description,
          SiteId: SiteId,
          site: responseData.data.site,

        }
        this.lines.push(line);
        this.linesUpdated.next([...this.lines]);
        this.router.navigate(['/admin/lines']);

      });
  }

  getLines() {
    this.http.get<{ message: string, data: LineModel[] }>(BACKEND_URL + '/api/line/find')
      .pipe(map((lineData) => {
        return lineData.data.map(line => {
          return {
            line_id: line.line_id,
            line_label: line.line_label,
            line_description: line.line_description,
            SiteId: line.SiteId,
            site: line.site,

          };
        });
      }))
      .subscribe((transformedlines) => {

        this.lines = transformedlines;
        this.linesUpdated.next([...this.lines]);

      });
  }

  populateForm(line) {
    this.form.patchValue(line);
  }

  getlineUpdateListner() {
    return this.linesUpdated.asObservable();
  }

  Deleteline(line_id: String) {
    this.http.delete(BACKEND_URL + '/api/line/delete/' + line_id).subscribe(
      () => {
        const updatedLines = this.lines.filter(line => line.line_id !== line_id);
        this.lines = updatedLines;
        this.linesUpdated.next([...this.lines]);
      }
    );
  }

  Updateline(line_id: string, line_label: string,
             line_description: string, SiteId: string,
  ) {

    const lineData = {
      line_id: line_id,
      line_label: line_label,
      line_description: line_description,
      SiteId: SiteId,

    }
    this.http.put<{ message: string, data: LineModel }>(BACKEND_URL + '/api/line/update/' + line_id, lineData)
      .subscribe(responseData => {
        const Updatedlines = [...this.lines];
        const oldlinesIndex = Updatedlines.findIndex(s => s.line_id === line_id);
        const line: LineModel = {
          line_id: line_id,
          line_label: line_label,
          line_description: line_description,
          SiteId: SiteId,
          site: responseData.data.site,

        };
        Updatedlines[oldlinesIndex] = line;
        this.lines = Updatedlines;
        this.linesUpdated.next([...this.lines]);
        this.router.navigate(['/admin/lines/LineList']);


      })

  }

  initializeFormGroup() {
    this.form.setValue({
      'line_id': null,
      'line_label': '',
      'line_description': '',
      'SiteId': '',


    });
  }


}
