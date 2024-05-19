import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

export class Model {
  #_id!: string;
  #name!: string;
  #cc!: number;
  #year!: string;

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

  get cc() {
    return this.#cc;
  }
  set cc(cc) {
    this.#cc = cc;
  }

  get year() {
    return this.#year;
  }
  set year(year) {
    this.#year = year;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  #token: string | null;
  #baseURL: string = environment.apiUrl + environment.manufacturersPath;
  #headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.#token = localStorage.getItem('token');
    this.#headers = new HttpHeaders({
      Authorization: `Bearer ${this.#token}`,
    });
  }

  public getAll(id: string, offset: number): Observable<any> {
    const url = this.#baseURL + `/${id}/models?offset=${offset}`;
    const headers = this.#headers;
    return this.http.get(url, { headers });
  }

  public deleteByID(mID: string, id: string): Observable<any> {
    const url = this.#baseURL + `/${mID}/models/${id}`;
    const headers = this.#headers;
    return this.http.delete(url, { headers });
  }

  public create(mID: string, formData: object): Observable<any> {
    const url = this.#baseURL + `/${mID}/models/`;
    const headers = this.#headers;
    return this.http.post(url, { ...formData }, { headers });
  }

  public getByID(mID: string, id: string): Observable<any> {
    const url = this.#baseURL + `/${mID}/models/${id}`;
    const headers = this.#headers;
    return this.http.get(url, { headers });
  }

  public updateByID(
    mID: string,
    id: string,
    formData: object
  ): Observable<any> {
    const url = this.#baseURL + `/${mID}/models/${id}`;
    const headers = this.#headers;
    return this.http.patch(url, { ...formData }, { headers });
  }
}
