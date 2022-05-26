"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordComponent = void 0;
var core_1 = require("@angular/core");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(authService, messageService, translate, userSettings, router, activatedRoute) {
        this.authService = authService;
        this.messageService = messageService;
        this.translate = translate;
        this.userSettings = userSettings;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.dark = this.userSettings.darkMode;
        this.isLoading = false;
        this.resetPassword = { code: null, emailAddress: null };
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.resetPassword.emailAddress = params["user"];
            _this.resetPassword.code = params["code"];
        });
    };
    ResetPasswordComponent.prototype.arePasswordsInvalid = function () {
        return this.resetPassword.password !== null &&
            this.resetPassword.confirmPassword !== null &&
            this.resetPassword.password !== this.resetPassword.confirmPassword;
    };
    ResetPasswordComponent.prototype.doResetPassword = function () {
        var _this = this;
        this.isLoading = true;
        this.authService.resetPassword(this.resetPassword).subscribe(function () {
            _this.messageService.add({
                severity: "success",
                summary: _this.translate.instant("GENERAL.SUCCESS"),
                detail: _this.translate.instant("GENERAL.SAVESUCCESSFUL"),
                life: 5000
            });
            _this.isLoading = false;
            _this.router.navigate(["/account/login"]);
        }, function (err) {
            _this.translate.stream("GENERAL.DATAERROR").subscribe(function (text) {
                _this.messageService.add({
                    severity: "error",
                    summary: text,
                    detail: err.error
                });
                console.error(err);
                _this.isLoading = false;
            });
        });
    };
    ResetPasswordComponent.prototype.changeDark = function (value) {
        this.dark = value;
        this.userSettings.darkMode = this.dark;
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: "app-reset-password",
            templateUrl: "./reset-password.component.html"
        })
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset-password.component.js.map