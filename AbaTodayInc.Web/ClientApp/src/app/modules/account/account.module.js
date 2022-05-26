"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
var core_1 = require("@angular/core");
var account_routing_module_1 = require("./account-routing.module");
var shared_module_1 = require("../shared.module");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var confirm_email_component_1 = require("./confirm-email/confirm-email.component");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
var reset_password_component_1 = require("./reset-password/reset-password.component");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            declarations: [
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                confirm_email_component_1.ConfirmEmailComponent,
                forgot_password_component_1.ForgotPasswordComponent,
                reset_password_component_1.ResetPasswordComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                account_routing_module_1.AccountRoutingModule
            ]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map