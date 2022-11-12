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

  all(page?: number): Observable<any> {
    let url = this.endpoint;

    if (page) {
      url += `?page=${page}`;
    }

    return this.http.get(url, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`).set('content-type', 'application/json')});
  }

  create(data): Observable<any> {
    return this.http.post(this.endpoint+"/", data, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`)});
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}${id}/`, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`)});
  }

  update(id: number, data): Observable<any> {
    return this.http.put(`${this.endpoint}${id}/`, data, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`)});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}${id}/`, {headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem("token")}`)});
  }
}
