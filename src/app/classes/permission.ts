import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Auth } from "./auth";

export class permission implements CanActivate{
    canActivate(
        route: ActivatedRouteSnapshot, 
        _state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    //    return Auth.canAccess(route.data);
    console.log('permission:', route, _state);
    return Auth.canAccess(route.data);

    }

}
 