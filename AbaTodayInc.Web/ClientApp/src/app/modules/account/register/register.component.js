"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(translate, userSettings, masterDataService, messageService, authService) {
        this.translate = translate;
        this.userSettings = userSettings;
        this.masterDataService = masterDataService;
        this.messageService = messageService;
        this.authService = authService;
        this.dark = this.userSettings.darkMode;
        this.register = { emailAddress: null, fullName: null, password: null, confirmPassword: null };
        this.isLoading = false;
        this.userRegistered = false;
        this.errors = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.masterDataService.getCountries().subscribe(function (countries) {
            _this.codeList = countries.map(function (a) {
                return {
                    value: a["additionalData"],
                    label: "+" + a["additionalData"] + " " + a.label
                };
            });
            _this.isLoading = false;
        }, function (err) {
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            console.error(err);
            _this.isLoading = false;
        });
    };
    RegisterComponent.prototype.doRegister = function () {
        var _this = this;
        this.isLoading = true;
        this.errors = [];
        this.authService.register(this.register).subscribe(function () {
            _this.userRegistered = true;
        }, function (err) {
            _this.translate.stream("GENERAL.DATAERROR").subscribe(function () {
                err.error.split(",").forEach(function (a) {
                    _this.errors.push("ACCOUNT." + a.toUpperCase());
                });
                console.error(err);
                _this.isLoading = false;
            });
        });
    };
    RegisterComponent.prototype.changeDark = function (value) {
        this.dark = value;
        this.userSettings.darkMode = this.dark;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: "app-register",
            templateUrl: "./register.component.html"
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map