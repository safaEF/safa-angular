import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem("access_token")}`
});


const requestOptions = { headers: headers };


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(protected http: HttpClient) {
  }

  login(data): Observable<any> {
    return this.http.post(`${environment.api}/api/token/`, data);
  }

  refresh(data): Observable<any> {
    return this.http.post(`${environment.api}/api/token/refresh/`, data, httpOptions);
  }

  register(data): Observable<User> {
    return this.http.post<User>(`${environment.api}/authentification/registration/`, data);
  }

  user(): Observable<User> {
    return this.http.get<User>(`${environment.api}/authentification/user/`,  {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("access_token")}`)});
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
