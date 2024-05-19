import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

export class Manufacture {
  #_id!: string;
  #name!: string;
  #country!: string;
  #year!: string;
  #logo!: string;

  get _id() {
    return this.#_id;
  }
  set _id(_id) {
    this.#_id = _id;
  }

  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }

  get country() {
    return this.#country;
  }
  set country(country) {
    this.#country = country;
  }

  get year() {
    return this.#year;
  }
  set year(year) {
    this.#year = year;
  }

  get logo() {
    return this.#logo;
  }
  set logo(logo) {
    this.#logo = logo;
  }
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  #token: string | null;
  #baseURL: string = environment.apiUrl + environment.manufacturersPath;
  #headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.#token = localStorage.getItem('token');
    this.#headers = new HttpHeaders({
      Authorization: `Bearer ${this.#token}`,
    });
  }

  public getAll(offset: number): Observable<any> {
    const url = this.#baseURL + `?offset=${offset}`;
    const headers = this.#headers;
    return this.http.get(url, { headers });
  }

  public getByID(id: string): Observable<any> {
    const url = this.#baseURL + `/${id}`;
    const headers = this.#headers;
    return this.http.get(url, { headers });
  }

  public updateByID(id: string, formData: object): Observable<any> {
    const url = this.#baseURL + `/${id}`;
    const headers = this.#headers;
    return this.http.put(url, { ...formData }, { headers });
  }

  public deleteByID(id: string): Observable<any> {
    const url = this.#baseURL + `/${id}`;
    const headers = this.#headers;
    return this.http.delete(url, { headers });
  }

  public create(formData: object): Observable<any> {
    const url = this.#baseURL;
    const headers = this.#headers;
    return this.http.post(url, { ...formData }, { headers });
  }
}
