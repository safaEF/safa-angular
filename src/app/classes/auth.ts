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
  let test = true

  // boucler les permissions de user connecté après l'avoir de groups
  // et l'organiser d'un array user_permissions[] pour les tester avec les permissions route

  if(this._user) {
    this._user.permissions = this._user.groups_list[0].permissions_list
    this._user.permissions.forEach(element => {user_permissions.push(element.codename)});
  }
// 1 ere condition q'on peut pas boocler la liste des permissions route juste lors qu'on a réélement des permissions
// donc on va faire un petit test sur permissions qui vient du route.data si il est != null donc on les boocler 
// et l'organiser dans un array route_permissions[],  car le retour de route.data n'est pas juste les permissions
// ilya permissions {id:'', name:'view_product' } // comme exemple 

  if (permissions) {

    Object.keys(permissions).forEach(key => {
      route_permissions.push(permissions[key]) 
    });


// et finalement cette fonction va retouner si tout les route_permissions sont inclus dans user_permissons ou non 
// si oui return true else false 
// et on deja definie test = true pour ne pas bloquer canAccess()



    test = route_permissions.every(element => {
      return user_permissions.includes(element);
    });
    
}


  if (!this._user) {
    return false

  }
  if(this._user){
    
  return test
 }
}

}
