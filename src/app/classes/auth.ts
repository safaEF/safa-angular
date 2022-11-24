import {EventEmitter, OnInit} from '@angular/core';
import {User} from '../interfaces/user';
import { PermissionService } from '../services/permission.service';



export class Auth implements OnInit{
 

  constructor(private permissionService: PermissionService){}
  ngOnInit() {}

  static userEmitter = new EventEmitter<User>();

  private static _user: User;
  static set user(user:User){
    this._user=user;
    this.userEmitter.emit(user)
  }
  static get user():User{
    return this._user
  }
  
 canAccess(permission){
  this.permissionService.all().subscribe(data =>
      
    data.filter(p => permission.indexOf(p) !== -1 ).length > 0 ) ;
    console.log();
    
   if(!Auth._user){
    
     return false;
   }

}

}