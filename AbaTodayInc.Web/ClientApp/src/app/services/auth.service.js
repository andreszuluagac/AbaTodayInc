"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var AuthService = /** @class */ (function () {
    function AuthService(http, identityService) {
        this.http = http;
        this.identityService = identityService;
    }
    AuthService.prototype.login = function (login) {
        var _this = this;
        var endpoint = "/api/account/logIn";
        return this.http.post(endpoint, login)
            .pipe(operators_1.map(function (response) {
            _this.identityService.identityToken = response.identityToken;
            _this.identityService.userName = response.userName;
            _this.identityService.roleNames = response.roles;
            _this.identityService.fullName = response.fullName;
        }));
    };
    AuthService.prototype.logout = function () {
        this.identityService.identityToken = { token: null, expiration: null };
        this.identityService.userName = null;
        this.identityService.roleNames = null;
    };
    AuthService.prototype.register = function (register) {
        var endpoint = "/api/account/register";
        return this.http.post(endpoint, register);
    };
    AuthService.prototype.resetPassword = function (resetData) {
        var endpoint = "api/account/resetPassword";
        return this.http.post(endpoint, resetData);
    };
    AuthService.prototype.confirmEmail = function (authToken) {
        var endpoint = "api/account/confirmEmail";
        return this.http.post(endpoint, authToken);
    };
    AuthService.prototype.sendForgotPasswordEmail = function (forgotPassword) {
        var endpoint = "api/account/sendForgotPasswordEmail";
        return this.http.post(endpoint, forgotPassword);
    };
    AuthService.prototype.tryAuthorize = function (actionId) {
        var endpoint = "api/security/tryAuthorize/" + actionId;
        return this.http.get(endpoint);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map