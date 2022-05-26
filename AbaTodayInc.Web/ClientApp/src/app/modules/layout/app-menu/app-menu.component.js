"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMenuComponent = void 0;
var core_1 = require("@angular/core");
var AppMenuComponent = /** @class */ (function () {
    function AppMenuComponent(app) {
        this.app = app;
    }
    AppMenuComponent.prototype.ngOnInit = function () {
        this.model = [
            {
                label: "GENERAL.DASHBOARD",
                icon: "fas fa-fw fa-home",
                routerLink: ["/dashboard"]
            },
            //{
            //    label: "INVENTORY.NAVTITLE",
            //    icon: "fas fa-fw fa-dolly-flatbed",
            //    routerLink: ["/inventories"],
            //    items: [
            //        { label: "INVENTORY.NAVTITLE", icon: "fas fa-fw fa-truck-loading", routerLink: ["/inventories"] },
            //        {
            //            label: "WIRELESSTASKS.CYCLECOUNTS.NAVTITLE",
            //            icon: "fas fa-fw fa-sort-numeric-down",
            //            routerLink: ["/inventories/cycleCounts"],
            //            items: [
            //                { label: "WIRELESSTASKS.CYCLECOUNTS.MANUALNAVTITLE", icon: "fas fa-fw fa-hand-paper", routerLink: ["/inventories/manualCycleCounts"] },
            //                { label: "WIRELESSTASKS.CYCLECOUNTS.AUTOMATEDNAVTITLE", icon: "fas fa-fw fa-robot", routerLink: ["/inventories/cycleCounts"] }
            //            ]
            //        }
            //    ]
            //},
            {
                label: "ADMIN.NAVTITLE",
                icon: "fas fa-fw fa-cog",
                routerLink: ["/administration"],
                items: [
                    { label: "ADMIN.LISTS.NAVTITLE", icon: "fas fa-fw fa-list-alt", routerLink: ["/administration/lists"] },
                    { label: "ADMIN.REASONCODES.NAVTITLE", icon: "fas fa-fw fa-info-circle", routerLink: ["/administration/reasonCodes"] },
                    { label: "ADMIN.PAGEENTITIES.NAVTITLE", icon: "fas fa-fw fa-newspaper", routerLink: ["/administration/pageEntities"] },
                    { label: "ADMIN.NOTIFICATIONS.NAVTITLE", icon: "far fa-fw fa-bell", routerLink: ["/administration/notifications"] },
                    { label: "ADMIN.CARRIERS.NAVTITLE", icon: "fas fa-fw fa-dolly", routerLink: ["/administration/carriers"] },
                    { label: "ADMIN.LUMPERS.NAVTITLE", icon: "fab fa-fw fa-docker", routerLink: ["/administration/lumpers"] },
                    { label: "ADMIN.CARTONS.NAVTITLE", icon: "fab fas fa-cubes", routerLink: ["/administration/cartonStocks"] }
                ]
            },
            {
                label: "SECURITY.NAVTITLE",
                icon: "fas fa-fw fa-shield-alt",
                routerLink: ["/security"],
                items: [
                    { label: "SECURITY.MANAGEROLES.NAVTITLE", icon: "fas fa-fw fa-user-tag", routerLink: ["/security/roles"] },
                    { label: "SECURITY.MANAGEUSERS.NAVTITLE", icon: "fas fa-fw fa-users", routerLink: ["/security/users"] },
                    { label: "SECURITY.MANAGEROLESACTIONS.NAVTITLE", icon: "fas fa-fw fa-sign-out-alt", routerLink: ["/security/manageRoleActions"] },
                    { label: "SECURITY.MANAGEUSERSBYROL.NAVTITLE", icon: "fas fa-fw fa-user-plus", routerLink: ["/security/manageUserRoles"] },
                ]
            },
        ];
    };
    AppMenuComponent.prototype.onMenuClick = function () {
        this.app.menuClick = true;
    };
    AppMenuComponent = __decorate([
        core_1.Component({
            selector: "app-menu",
            templateUrl: "./app-menu.component.html"
        })
    ], AppMenuComponent);
    return AppMenuComponent;
}());
exports.AppMenuComponent = AppMenuComponent;
//# sourceMappingURL=app-menu.component.js.map