import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  constructor(private http: HttpClient) {
  }

  getCountries() {
    return this.http.get(`assets/json/countries.json`);
  }
}
