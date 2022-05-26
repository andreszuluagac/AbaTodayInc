"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMainComponent = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var AppMainComponent = /** @class */ (function () {
    function AppMainComponent(identityService, renderer, router, userSettings, menuService) {
        this.identityService = identityService;
        this.renderer = renderer;
        this.router = router;
        this.userSettings = userSettings;
        this.menuService = menuService;
        this.staticMenuActive = true;
        this.darkMode = false;
        this.menuColorMode = "light";
        this.menuColor = "layout-menu-light";
        this.themeColor = "blue";
        this.layoutColor = "blue";
    }
    AppMainComponent.prototype.ngOnInit = function () {
        this.darkMode = this.userSettings.darkMode;
        this.staticMenuActive = this.userSettings.leftMenuLock;
        this.menuColor = this.userSettings.menuColor;
        this.menuColorMode = this.userSettings.menuColorMode;
        this.layoutColor = this.userSettings.layoutColor;
        this.themeColor = this.userSettings.themeColor;
        this.horizontalMenu = this.userSettings.horizontalMenu;
        if (!this.identityService.isAuthenticated) {
            this.router.navigate(["/account/login"]);
            return;
        }
    };
    AppMainComponent.prototype.onLayoutClick = function () {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }
        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }
        if (!this.megaMenuClick) {
            this.megaMenuActive = false;
        }
        if (!this.megaMenuMobileClick) {
            this.megaMenuMobileActive = false;
        }
        if (!this.menuClick) {
            if (this.isHorizontal()) {
                this.menuService.reset();
            }
            if (this.menuMobileActive) {
                this.menuMobileActive = false;
            }
            this.menuHoverActive = false;
        }
        this.menuClick = false;
        this.topbarItemClick = false;
        this.megaMenuClick = false;
        this.megaMenuMobileClick = false;
        this.rightPanelClick = false;
    };
    AppMainComponent.prototype.onMegaMenuButtonClick = function (event) {
        this.megaMenuClick = true;
        this.megaMenuActive = !this.megaMenuActive;
        event.preventDefault();
    };
    AppMainComponent.prototype.onMegaMenuClick = function (event) {
        this.megaMenuClick = true;
        this.megaMenuMobileClick = true;
        event.preventDefault();
    };
    AppMainComponent.prototype.onTopbarItemClick = function (event, item) {
        this.topbarItemClick = true;
        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        }
        else {
            this.activeTopbarItem = item;
        }
        event.preventDefault();
    };
    AppMainComponent.prototype.onRightPanelButtonClick = function (event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    };
    AppMainComponent.prototype.onRightPanelClose = function (event) {
        this.rightPanelActive = false;
        this.rightPanelClick = false;
        event.preventDefault();
    };
    AppMainComponent.prototype.onRightPanelClick = function (event) {
        this.rightPanelClick = true;
        event.preventDefault();
    };
    AppMainComponent.prototype.onTopbarMobileMenuButtonClick = function (event) {
        console.log(event);
        this.topbarMobileMenuClick = true;
        this.topbarMobileMenuActive = !this.topbarMobileMenuActive;
        event.preventDefault();
    };
    AppMainComponent.prototype.onMegaMenuMobileButtonClick = function (event) {
        this.megaMenuMobileClick = true;
        this.megaMenuMobileActive = !this.megaMenuMobileActive;
        event.preventDefault();
    };
    AppMainComponent.prototype.onMenuButtonClick = function (event) {
        this.menuClick = true;
        this.topbarMenuActive = false;
        if (this.isMobile()) {
            this.menuMobileActive = !this.menuMobileActive;
        }
        event.preventDefault();
    };
    AppMainComponent.prototype.onSidebarClick = function (event) {
        this.menuClick = true;
    };
    AppMainComponent.prototype.onToggleMenuClick = function (event) {
        this.staticMenuActive = !this.staticMenuActive;
        this.userSettings.leftMenuLock = this.staticMenuActive;
        event.preventDefault();
    };
    AppMainComponent.prototype.isDesktop = function () {
        return window.innerWidth > 991;
    };
    AppMainComponent.prototype.isMobile = function () {
        return window.innerWidth <= 991;
    };
    AppMainComponent.prototype.isHorizontal = function () {
        return this.horizontalMenu;
    };
    AppMainComponent = __decorate([
        core_1.Component({
            selector: "app-main",
            templateUrl: "./app-main.component.html",
            animations: [
                animations_1.trigger("mask-anim", [
                    animations_1.state("void", animations_1.style({
                        opacity: 0
                    })),
                    animations_1.state("visible", animations_1.style({
                        opacity: 0.8
                    })),
                    animations_1.transition("* => *", animations_1.animate("250ms cubic-bezier(0, 0, 0.2, 1)"))
                ])
            ]
        })
    ], AppMainComponent);
    return AppMainComponent;
}());
exports.AppMainComponent = AppMainComponent;
//# sourceMappingURL=app-main.component.js.map