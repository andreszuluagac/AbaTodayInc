"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
var reset_password_component_1 = require("./reset-password/reset-password.component");
var confirm_email_component_1 = require("./confirm-email/confirm-email.component");
var routes = [
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "forgotPassword", component: forgot_password_component_1.ForgotPasswordComponent },
    { path: "passwordReset", component: reset_password_component_1.ResetPasswordComponent },
    { path: "confirmEmail", component: confirm_email_component_1.ConfirmEmailComponent }
];
var AccountRoutingModule = /** @class */ (function () {
    function AccountRoutingModule() {
    }
    AccountRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AccountRoutingModule);
    return AccountRoutingModule;
}());
exports.AccountRoutingModule = AccountRoutingModule;
//# sourceMappingURL=account-routing.module.js.map