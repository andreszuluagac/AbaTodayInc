"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
var core_1 = require("@angular/core");
var dashboard_routing_module_1 = require("./dashboard-routing.module");
var home_component_1 = require("./home/home.component");
var manage_profile_component_1 = require("./manage-profile/manage-profile.component");
var shared_module_1 = require("../shared.module");
var manage_profile_details_component_1 = require("./manage-profile/manage-profile-details/manage-profile-details.component");
var threed_lab_component_1 = require("./threed-lab/threed-lab.component");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            declarations: [
                home_component_1.HomeComponent,
                manage_profile_component_1.ManageProfileComponent,
                manage_profile_details_component_1.ManageProfileDetailsComponent,
                threed_lab_component_1.ThreedLabComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                dashboard_routing_module_1.DashboardRoutingModule
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map