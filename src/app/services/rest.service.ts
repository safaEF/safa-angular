import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `JWT ${localStorage.getItem("access_token")}`
});

const requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  abstract get endpoint(): string;

  constructor(protected http: HttpClient ) {
  }

  all(): Observable<any> {
    let url = this.endpoint;
    return this.http.get(url+"get/", requestOptions);
  }

  create(data): Observable<any> {
    return this.http.post(this.endpoint+"create/", data, requestOptions);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}get/${id}/`, requestOptions);
  }

  update(id: number, data): Observable<any> {
    return this.http.put(`${this.endpoint}change/${id}/`, data , requestOptions );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}delete/${id}/`);
  }
}
