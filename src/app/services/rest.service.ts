import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  abstract get endpoint(): string;

  constructor(protected http: HttpClient ) {
  }

  all(): Observable<any> {
    let url = this.endpoint;
    return this.http.get(url+"get/", {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`).set('content-type', 'application/json')});
  }

  create(data): Observable<any> {
    return this.http.post(this.endpoint+"create/", data, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`)});
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}get/${id}/`, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`)});
  }

  update(id: number, data): Observable<any> {
    return this.http.put(`${this.endpoint}change/${id}/`, data, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`)});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}delete/${id}/`, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`)});
  }
}
