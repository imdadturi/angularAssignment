import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionStorageKey = 'ANGULARASSIGNMENT';
  private session: any = null;

  regData = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    let sess = localStorage.getItem(this.sessionStorageKey);
    if (sess) {
      this.session = JSON.parse(sess);
    }
  }

  public login(data: any) {
  }

  public register(data: any) {
    console.log(data);
    this.regData.next(data);
    return this.regData;
  }

  public isLoggedIn() {
    return this.getSession() ? true : false;
  }

  public setSession(data: any) {
    localStorage.setItem(this.sessionStorageKey, JSON.stringify(data));
    this.session = data;
    return this.getSession();
  }

  public getSession() {
    return this.session;
  }

  public clearSession() {
    this.session = null;
    localStorage.removeItem(this.sessionStorageKey);
    return null;
  }

}