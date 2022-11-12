import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends RestService {
  RoleService(arg0: string) {
    throw new Error('Method not implemented.');
  }
  endpoint = `${environment.api}/roles/`;
}