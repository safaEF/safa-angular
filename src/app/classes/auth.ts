import {EventEmitter} from '@angular/core';
import {User} from '../interfaces/user';

export class Auth {
  static userEmitter = new EventEmitter<User>();
  private static _user: User;

  static set user(user:User){
    this._user=user;
    this.userEmitter.emit(user)
  }
  static get user():User{
    return this._user
  }
  
  // static canAccess(permission) {
  //   if (!this._user){
  //     return false ; 
  //   }
  //   return this._user.permission.filter(p => permission.indexOf(p) !== -1 ).length > 0 ; 
  // }

}
