import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { IdentityService } from "../services/identity.service";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
        private readonly identity: IdentityService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (this.identity.isAuthenticated) {
            if (route.data["actionId"]) {
                try {
                    await this.auth.tryAuthorize(route.data["actionId"]).toPromise();
                    return true;
                } catch (err) {
                    console.error(err);
                    this.router.navigate(["/accessDenied"]);
                    return false;
                }
            } else {
                return true;
            }
        } else {
            this.router.navigate(["/account/login"], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
