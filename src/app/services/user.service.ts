import {Injectable} from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import {environment} from '../../environments/environment';
import {RestService} from './rest.service';
import {Observable} from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestService {


  endpoint = `${environment.api}/users/`;

  getUsers(page,pageSize): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint + `?page=${page}&pageSize=${pageSize}`).pipe(
      map(response => response)
    );
  }

}
