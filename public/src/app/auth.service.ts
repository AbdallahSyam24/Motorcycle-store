import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export class User {
  #_id: string;
  #email: string;
  #name: string;
  #token: string;

  constructor(_id: string, email: string, name: string, token: string) {
    this.#_id = _id;
    this.#email = email;
    this.#name = name;
    this.#token = token;
  }

  get _id() {
    return this.#_id;
  }
  get email() {
    return this.#email;
  }
  get name() {
    return this.#name;
  }
  get token() {
    return this.#token;
  }
  set token(token) {
    this.#token = token;
  }
}

@Injectable({
  providedIn: 'root',
})
export class Auth implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthorized = this.checkAuthorization();

    if (isAuthorized) {
      return true;
    } else {
      this.router.navigate([environment.loginPath]);
      return false;
    }
  }

  private checkAuthorization(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #baseURL: String = environment.apiUrl;
  isLogin: boolean;

  constructor(private _http: HttpClient, private router: Router) {
    this.isLogin = false;
  }

  public registration(registrationData: object): Observable<any> {
    const URL: string = this.#baseURL + environment.registrationPath;
    return this._http.post<any>(URL, { ...registrationData });
  }

  public login(loginData: object): Observable<any> {
    const URL: string = this.#baseURL + environment.loginPath;
    return this._http.post<any>(URL, { ...loginData });
  }

  public checkToken(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }
}
