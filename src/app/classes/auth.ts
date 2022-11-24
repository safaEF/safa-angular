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

 static canAccess(){


  if (!this._user) {
    console.log("log from auth.ts : ");

    return false
  } else {
    console.log("log from auth.ts : ");

  }
/*   this.permissionService.all().subscribe(data =>

    data.filter(p => permission.indexOf(p) !== -1 ).length > 0 ) ;
    console.log(); */
/*
    this.authService.user().subscribe((res) => {
      console.log("res from user : ", res);
      var group = res
      console.log("group : ", group.id);


    })
 */
   if(!Auth._user){

     return false;
   }

}

}
