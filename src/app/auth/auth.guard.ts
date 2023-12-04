import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { CommonService } from "../common.service";
import { AuthService } from "../shared/Services/AuthService/auth.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router, private commonServ: CommonService) { }
    data = sessionStorage.getItem('userData');
    userInfo = (this.data) ? JSON.parse(this.data) : null;

    canActivate(route: ActivatedRouteSnapshot): boolean {
       
       
        this.data = sessionStorage.getItem('userData');
        this.userInfo = (this.data) ? JSON.parse(this.data) : null;
        if (this._authService.loggedIn()) {
            return this.checkforUserAccess(route);
        } else {
            this._router.navigate(['/login'])
            return false
        }
    }
    checkforUserAccess(_route: ActivatedRouteSnapshot) {
        if (_route.routeConfig?.path?.toString() === 'dashboard') {
            this.commonServ.loadComponent(true);
            return true;
        }
        if ((this.userInfo.RoleName == 'Admin') && (_route.routeConfig?.path?.toString() === 'ChangePassword')) {
            this.commonServ.loadComponent(true);
            return true;
        }
        else {
            const screens = this.userInfo.ScreenNames.split(',');
            for (let ele in screens) {
                if (screens[ele].toLowerCase() === _route.routeConfig?.path?.toString().toLowerCase()) {
                    this.commonServ.loadComponent(true);
                    return true;
                }
            }
        }
        return false;
    }
}
