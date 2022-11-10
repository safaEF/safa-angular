import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  abstract get endpoint(): string;

  constructor(protected http: HttpClient) {
  }

  all(page?: number): Observable<any> {
    let url = this.endpoint;

    if (page) {
      url += `?page=${page}`;
    }

    return this.http.get(url);
  }

  create(data): Observable<any> {
    return this.http.post(this.endpoint+"/create", data, {headers: new HttpHeaders().set('Authorization', 'Token ffc57da7d6cc7e1bc61d8744d6118f196521ff23')});
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`, {headers: new HttpHeaders().set('Authorization', 'Token ffc57da7d6cc7e1bc61d8744d6118f196521ff23')});
  }

  update(id: number, data): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, data, {headers: new HttpHeaders().set('Authorization', 'Token ffc57da7d6cc7e1bc61d8744d6118f196521ff23')});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`, {headers: new HttpHeaders().set('Authorization', 'Token ffc57da7d6cc7e1bc61d8744d6118f196521ff23')});
  }
}
