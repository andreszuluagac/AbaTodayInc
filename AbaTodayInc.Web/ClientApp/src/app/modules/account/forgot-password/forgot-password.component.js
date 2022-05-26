"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordComponent = void 0;
var core_1 = require("@angular/core");
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(translate, userSettings, authService) {
        this.translate = translate;
        this.userSettings = userSettings;
        this.authService = authService;
        this.dark = this.userSettings.darkMode;
        this.forgotPassword = { emailAddress: null };
        this.error = null;
        this.isLoading = false;
        this.emailSent = false;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
    };
    ForgotPasswordComponent.prototype.sendForgotPasswordEmail = function () {
        var _this = this;
        this.isLoading = true;
        this.error = null;
        this.authService.sendForgotPasswordEmail(this.forgotPassword).subscribe(function () {
            _this.emailSent = true;
            _this.isLoading = false;
        }, function (err) {
            _this.error = _this.translate.instant(err.error);
            console.error(err);
            _this.isLoading = false;
        });
    };
    ForgotPasswordComponent.prototype.changeDark = function (value) {
        this.dark = value;
        this.userSettings.darkMode = this.dark;
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: "app-forgot-password",
            templateUrl: "./forgot-password.component.html"
        })
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map