"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutModule = void 0;
var core_1 = require("@angular/core");
var layout_routing_module_1 = require("./layout-routing.module");
var shared_module_1 = require("../shared.module");
var app_main_component_1 = require("./app-main/app-main.component");
var app_topbar_component_1 = require("./app-topbar/app-topbar.component");
var app_footer_component_1 = require("./app-footer/app-footer.component");
var app_menu_component_1 = require("./app-menu/app-menu.component");
var app_rightpanel_component_1 = require("./app-rightpanel/app-rightpanel.component");
var app_breadcrumb_component_1 = require("./app-breadcrumb/app-breadcrumb.component");
var app_config_component_1 = require("./app-config/app-config.component");
var app_menuitem_component_1 = require("./app-menuitem/app-menuitem.component");
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_main_component_1.AppMainComponent,
                app_menu_component_1.AppMenuComponent,
                app_menuitem_component_1.AppMenuitemComponent,
                app_topbar_component_1.AppTopBarComponent,
                app_footer_component_1.AppFooterComponent,
                app_rightpanel_component_1.AppRightPanelComponent,
                app_config_component_1.AppConfigComponent,
                app_breadcrumb_component_1.AppBreadcrumbComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                layout_routing_module_1.LayoutRoutingModule
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
//# sourceMappingURL=layout.module.js.map