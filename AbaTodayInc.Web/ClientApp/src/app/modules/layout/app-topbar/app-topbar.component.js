"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppTopBarComponent = void 0;
var core_1 = require("@angular/core");
var LANGUAGE = "language";
var AppTopBarComponent = /** @class */ (function () {
    function AppTopBarComponent(app, confirmationService, messageService, router, translate, 
    //private readonly masterDataService: MasterDataService,
    securityService, identity, authService, guidedTourService, translateService) {
        var _this = this;
        this.app = app;
        this.confirmationService = confirmationService;
        this.messageService = messageService;
        this.router = router;
        this.translate = translate;
        this.securityService = securityService;
        this.identity = identity;
        this.authService = authService;
        this.guidedTourService = guidedTourService;
        this.translateService = translateService;
        this.isLoading = false;
        this.user = { emailAddress: null, fullName: null, startDate: null, trackingHoursMandatory: false, isActive: true, image: null, hasTutorialBeenShown: false };
        this.isPunchedIn = true;
        this.punchedInDate = new Date();
        this.nextBreakRemainingSeconds = 0;
        var currentLanguage = localStorage.getItem(LANGUAGE);
        if (currentLanguage) {
            this.currentLanguage = currentLanguage;
        }
        this.subscriptionUser = securityService.serviceData.subscribe(function () {
            _this.securityService.getUserByUserName(_this.identity.userName).subscribe(function (data) {
                _this.user = data;
            });
        });
    }
    AppTopBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.securityService.getUserByUserName(this.identity.userName).subscribe(function (data) {
            _this.user = data;
        });
    };
    AppTopBarComponent.prototype.changeLanguage = function (language) {
        var _this = this;
        this.confirmationService.confirm({
            message: this.translate.instant("GENERAL.CONFIRMCHANGELANGUAGE"),
            accept: function () {
                _this.isLoading = true;
                localStorage.setItem(LANGUAGE, language);
                _this.currentLanguage = language;
                _this.translate.use(language).subscribe(function () {
                    _this.isLoading = false;
                    window.location.reload();
                });
            }
        });
    };
    AppTopBarComponent.prototype.doLogout = function () {
        this.authService.logout();
        this.router.navigate(["/account/login"]);
    };
    AppTopBarComponent = __decorate([
        core_1.Component({
            selector: "app-topbar",
            templateUrl: "app-topbar.component.html"
        })
    ], AppTopBarComponent);
    return AppTopBarComponent;
}());
exports.AppTopBarComponent = AppTopBarComponent;
//# sourceMappingURL=app-topbar.component.js.map