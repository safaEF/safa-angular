import {EventEmitter} from '@angular/core';
import {User} from '../interfaces/user';
import { PermissionService } from '../services/permission.service';



export class Auth {
  
  constructor(private permissionService: PermissionService){}
   
  static userEmitter = new EventEmitter<User>();

  private static _user: User;
  static permissionService: any;
  static set user(user:User){
    this._user=user;
    this.userEmitter.emit(user)
  }
  static get user():User{
    return this._user
  }
  
static canAccess(permission){
   if(!this._user){
    
     return false;
   }
    this.permissionService.all().subscribe(data =>
    permission.filter(p => permission.indexOf(p) !== -1 ).length > 0 ) ;
    console.log();
    
    
    
    
}

} 