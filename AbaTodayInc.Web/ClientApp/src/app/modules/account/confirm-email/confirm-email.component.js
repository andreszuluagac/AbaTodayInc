"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmEmailComponent = void 0;
var core_1 = require("@angular/core");
var ConfirmEmailComponent = /** @class */ (function () {
    function ConfirmEmailComponent(router, translate, userSettings, authService) {
        this.router = router;
        this.translate = translate;
        this.userSettings = userSettings;
        this.authService = authService;
        this.dark = this.userSettings.darkMode;
        this.isLoading = true;
        this.isConfirmed = false;
    }
    ConfirmEmailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.queryParams.subscribe(function (params) {
            var authToken = { userId: params["user"], code: params["code"] };
            _this.authService.confirmEmail(authToken).subscribe(function () {
                _this.isConfirmed = true;
                _this.error = null;
                _this.isLoading = false;
            }, function (err) {
                _this.error = _this.translate.instant(err.error);
                console.error(err);
                _this.isLoading = false;
            });
        });
    };
    ConfirmEmailComponent = __decorate([
        core_1.Component({
            selector: "app-confirm-email",
            templateUrl: "./confirm-email.component.html",
            styleUrls: ["./confirm-email.component.css"]
        })
    ], ConfirmEmailComponent);
    return ConfirmEmailComponent;
}());
exports.ConfirmEmailComponent = ConfirmEmailComponent;
//# sourceMappingURL=confirm-email.component.js.map