"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBreadcrumbComponent = void 0;
var core_1 = require("@angular/core");
var AppBreadcrumbComponent = /** @class */ (function () {
    function AppBreadcrumbComponent(breadcrumbService, translate, masterFilterService, sitesService, businessesService) {
        var _this = this;
        this.breadcrumbService = breadcrumbService;
        this.translate = translate;
        this.masterFilterService = masterFilterService;
        this.sitesService = sitesService;
        this.businessesService = businessesService;
        this.param = {
            sites: "",
            businesses: "",
        };
        //Load local storage data
        this.param.sites = this.masterFilterService.filteredSiteNames !== null ? this.masterFilterService.filteredSiteNames : "";
        this.param.businesses = this.masterFilterService.filteredBusinessNames.join(",");
        this.loadMessages();
        //Subscribe emiter data
        this.breadCrumbSubscription = breadcrumbService.itemsHandler.subscribe(function (response) {
            _this.items = response;
        });
        this.sitesSubscription = sitesService.serviceData.subscribe(function (response) {
            _this.param.sites = response;
            _this.loadMessages();
        });
        this.businessesSubscription = businessesService.serviceData.subscribe(function (response) {
            _this.param.businesses = response;
            _this.loadMessages();
        });
    }
    AppBreadcrumbComponent.prototype.ngOnInit = function () {
    };
    AppBreadcrumbComponent.prototype.ngOnDestroy = function () {
        if (this.breadCrumbSubscription) {
            this.breadCrumbSubscription.unsubscribe();
        }
    };
    AppBreadcrumbComponent.prototype.loadMessages = function () {
        if (this.param.sites === "" && this.param.businesses.length === 0) {
            this.welcomeMessage = this.translate.instant("GENERAL.WELCOMEINIT");
        }
        if (this.param.sites === "" && this.param.businesses.length > 0) {
            this.welcomeMessage = this.translate.instant("GENERAL.WELCOMESITES");
        }
        if (this.param.sites !== "" && this.param.businesses.length === 0) {
            this.welcomeMessage = this.translate.instant("GENERAL.WELCOMEBUSINESSES");
        }
        if (this.param.sites !== "" && this.param.businesses.length > 0) {
            this.welcomeMessage = this.translate.instant("GENERAL.WELCOME", this.param);
        }
    };
    AppBreadcrumbComponent = __decorate([
        core_1.Component({
            selector: "app-breadcrumb",
            templateUrl: "./app-breadcrumb.component.html"
        })
    ], AppBreadcrumbComponent);
    return AppBreadcrumbComponent;
}());
exports.AppBreadcrumbComponent = AppBreadcrumbComponent;
//# sourceMappingURL=app-breadcrumb.component.js.map