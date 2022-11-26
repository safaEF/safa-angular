import {EventEmitter, OnInit} from '@angular/core';
import {User} from '../interfaces/user';
import { PermissionService } from '../services/permission.service';
import {AuthService} from '../services/auth.service';


export class Auth {



  private static _user: User;
  static userEmitter = new EventEmitter<User>();



  static set user(user:User){

    this._user=user;

    this.userEmitter.emit(user)
  }

  static get user():User{

    return this._user

  }

 static canAccess(permissions){

  let user_permissions = []
  let route_permissions = []
  let default_route_permission = true

  this._user.permissions = this._user.groups_list[0].permissions_list

  this._user.permissions.forEach(element => {user_permissions.push(element.codename)});

  if (permissions) {
    Object.keys(permissions).forEach(key => {
      route_permissions.push(permissions[key])

  default_route_permission = route_permissions.every(element => {


    return user_permissions.includes(element);

  });
 });

  if (!this._user) {
    return false
  }
  return default_route_permission
  }

}

}
