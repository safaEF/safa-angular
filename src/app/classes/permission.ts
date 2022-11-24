import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Auth } from "./auth";

export class Permission implements CanActivate{

    canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return Auth.canAccess();
      //return  Auth.user.groups_list.name == 'Admin'

    }
}
