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
    return this.http.get(url+"get/", {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`).set('content-type', 'application/json')});
  }

  create(data): Observable<any> {
    return this.http.post(this.endpoint+"create/", data, {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`)});
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}get/${id}/`,);
  }

  update(id: number, data): Observable<any> {
    return this.http.put(`${this.endpoint}change/${id}/`, data, );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}delete/${id}/`);
  }
}
