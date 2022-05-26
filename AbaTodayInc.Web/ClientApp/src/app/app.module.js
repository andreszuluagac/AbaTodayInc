"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.httpLoaderFactory = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var common_2 = require("@angular/common");
//Application Modules
var layout_module_1 = require("./modules/layout/layout.module");
var shared_module_1 = require("./modules/shared.module");
// Application Components
var app_component_1 = require("./app.component");
var app_notfound_component_1 = require("./shared/app-notfound.component");
var app_error_component_1 = require("./shared/app-error.component");
var app_accessdenied_component_1 = require("./shared/app-accessdenied.component");
// Application services
var breadcrumb_service_1 = require("./services/mirage/breadcrumb.service");
var menu_service_1 = require("./services/mirage/menu.service");
var api_1 = require("primeng/api");
var dynamicdialog_1 = require("primeng/dynamicdialog");
//Exported function for translation factory. Required by AoT.
function httpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.httpLoaderFactory = httpLoaderFactory;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot([]),
                //AppRoutes,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                //
                layout_module_1.LayoutModule,
                shared_module_1.SharedModule,
                //Translation
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: httpLoaderFactory,
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            declarations: [
                app_component_1.AppComponent,
                app_notfound_component_1.AppNotfoundComponent,
                app_error_component_1.AppErrorComponent,
                app_accessdenied_component_1.AppAccessdeniedComponent
            ],
            providers: [
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                breadcrumb_service_1.BreadcrumbService,
                menu_service_1.MenuService,
                api_1.MessageService,
                api_1.ConfirmationService,
                dynamicdialog_1.DialogService,
                dynamicdialog_1.DynamicDialogConfig,
                common_2.DatePipe,
                //FilterPipe
                common_2.DatePipe
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map