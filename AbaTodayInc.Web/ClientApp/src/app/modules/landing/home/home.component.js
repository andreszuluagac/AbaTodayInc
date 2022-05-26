"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(breadcrumbService, translate, messageService, router, notificationsService) {
        this.breadcrumbService = breadcrumbService;
        this.translate = translate;
        this.messageService = messageService;
        this.router = router;
        this.notificationsService = notificationsService;
        this.contactUs = { email: null, name: null, message: null };
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.doContactUs = function () {
        var _this = this;
        this.notificationsService.sendContactUs(this.contactUs).subscribe(function () {
            _this.contactUs = { email: null, name: null, message: null };
            _this.messageService.add({
                severity: "success",
                summary: _this.translate.instant("GENERAL.SUCCESS"),
                detail: _this.translate.instant("GENERAL.CONTACTUS.SENT"),
                life: 5000
            });
        }, function (err) {
        });
    };
    HomeComponent.prototype.navigateToDashboard = function () {
        this.router.navigate(["/dashboard"]);
    };
    HomeComponent.prototype.navigateToRegister = function () {
        this.router.navigate(["/account", "register"]);
    };
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: "./home.component.html"
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map