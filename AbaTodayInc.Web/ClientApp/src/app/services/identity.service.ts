import { Injectable } from "@angular/core";
import { IdentityToken } from "../models/identity-token";

const TOKEN = "jwt_token.token";
const EXPIRATION = "jwt_token.expiration";
const USERNAME = "username";
const FULLNAME = "fullname";
const ROLENAMES = "rolenames";

@Injectable({
    providedIn: "root"
})
export class IdentityService {

    private _identityToken: IdentityToken = { token: null, expiration: null };
    get identityToken(): IdentityToken | null {
        if (this._identityToken && this._identityToken.token) {
            return this._identityToken;
        }
        this._identityToken = {
            token: localStorage.getItem(TOKEN),
            expiration: new Date(localStorage.getItem(EXPIRATION))
        };
        return this._identityToken;
    }
    set identityToken(value: IdentityToken | null) {
        if (!value || !value.token) {
            this._identityToken = { token: null, expiration: null };
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(EXPIRATION);
        } else {
            this._identityToken = { token: value.token, expiration: new Date(value.expiration) };
            localStorage.setItem(TOKEN, value.token);
            localStorage.setItem(EXPIRATION, value.expiration.toString());
        }
    }

    private _userName: string;
    get userName(): string {
        if (this._userName) {
            return this._userName;
        }
        this._userName = localStorage.getItem(USERNAME);
        return this._userName;
    }
    set userName(value: string) {
        this._userName = value;
        if (!value) {
            localStorage.removeItem(USERNAME);
        } else {
            localStorage.setItem(USERNAME, value);
        }
    }

    private _fullName: string;
    get fullName(): string {
        if (this._fullName) {
            return this._fullName;
        }
        this._fullName = localStorage.getItem(FULLNAME);
        return this._fullName;
    }
    set fullName(value: string) {
        this._fullName = value;
        if (!value) {
            localStorage.removeItem(FULLNAME);
        } else {
            localStorage.setItem(FULLNAME, value);
        }
    }

    private _roleNames: string[];
    get roleNames(): string[] {
        if (this._roleNames) {
            return this._roleNames;
        }
        this._roleNames = localStorage.getItem(ROLENAMES).split(",");
        return this._roleNames;
    }
    set roleNames(value: string[]) {
        this._roleNames = value;
        if (!value) {
            localStorage.removeItem(ROLENAMES);
        } else {
            localStorage.setItem(ROLENAMES, value.join(","));
        }
    }

    get isAuthenticated(): boolean {
        //If there's no token, the user is not authenticated
        if (!this.identityToken || !this.identityToken.token) {
            return false;
        }

        //If token doesn't expire, then it's valid
        if (!this.identityToken.expiration) {
            return true;
        }

        //If token exists but has not expired, then it's authenticated
        return this.identityToken.expiration.valueOf() > new Date().valueOf();
    }
}