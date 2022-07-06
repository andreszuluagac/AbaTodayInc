import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IdentityService } from "./identity.service";
import { Login } from "../models/login";
import { LoginResponse } from "../models/login-response";
import { ResetPassword } from "../models/reset-password";
import { ForgotPassword } from "../models/forgot-password";
import { Register } from "../models/register";
import { AuthToken } from "../models/auth-token";
import { Customer } from "../models/customer";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly identityService: IdentityService) {
    }

    login(login: Login): Observable<void> {
        const endpoint = "/api/account/logIn";
        return this.http.post<LoginResponse>(endpoint, login)
            .pipe(map(response => {
                this.identityService.identityToken = response.identityToken;
                this.identityService.userName = response.userName;
                this.identityService.roleNames = response.roles;
                this.identityService.fullName = response.fullName;
            }));
    }

    logout(): void {
        this.identityService.identityToken = { token: null, expiration: null };
        this.identityService.userName = null;
        this.identityService.roleNames = null;
    }

    registerCustomer(customer: Customer): Observable<void> {
        debugger;
        const endpoint = "/api/account/register";
        return this.http.post<void>(endpoint, customer);
    }

    resetPassword(resetData: ResetPassword): Observable<void> {
        const endpoint = "api/account/resetPassword";
        return this.http.post<void>(endpoint, resetData);
    }

    confirmEmail(authToken: AuthToken): Observable<void> {
        const endpoint = "api/account/confirmEmail";
        return this.http.post<void>(endpoint, authToken);
    }

    sendForgotPasswordEmail(forgotPassword: ForgotPassword): Observable<void> {
        const endpoint = "api/account/sendForgotPasswordEmail";
        return this.http.post<void>(endpoint, forgotPassword);
    }

    tryAuthorize(actionId: string): Observable<void> {
        const endpoint = `api/security/tryAuthorize/${actionId}`;
        return this.http.get<void>(endpoint);
    }
}