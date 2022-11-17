import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) {
  }

  login(data): Observable<any> {
    return this.http.post(`${environment.api}/authentification/login/`, data);
  }

  token(data): Observable<any> {
    return this.http.post(`${environment.api}/token/`, data);
  }

  refresh(data): Observable<any> {
    return this.http.post(`${environment.api}/token/refresh/`, data);
  }

  register(data): Observable<User> {
    return this.http.post<User>(`${environment.api}/authentification/registration/`, data);
  }

  user(): Observable<User> {
    return this.http.get<User>(`${environment.api}/authentification/user/`,  {headers: new HttpHeaders().set('Authorization', `JWT ${localStorage.getItem("access_token")}`)});
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.api}/authentification/logout/`, {});
  }

  updateInfo(data): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/`, data);
  }

  updatePassword(data): Observable<User> {
    return this.http.put<User>(`${environment.api}/authentification/password/reset/`, data);
  }


}
