"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingsService = void 0;
var core_1 = require("@angular/core");
var DARKMODE = "darkMode";
var MENUMODE = "menuMode";
var MENUCOLOR = "menuColor";
var MENUCOLORMODE = "menuColorMode";
var MENUTHEME = "menuTheme";
var COMPONENTSCOLOR = "componentsColor";
var LEFTMENULOCK = "leftMenuLock";
var LAYOUTCOLOR = "layoutColor";
var THEMECOLOR = "themeColor";
var HORIZONTALMENU = "horizontalMenu";
var ACTIVETOPBARITEM = "activeTopbarItem";
var TOPBARMENUACTIVE = "topbarMenuActive";
var RIGHTPANELACTIVE = "rightPanelActive";
var MEGAMENUACTIVE = "megaMenuActive";
var MEGAMENUMOBILEACTIVE = "megaMenuMobileActive";
var MEGAMOBILEACTIVE = "menuMobileActive";
var MEGAHOVERACTIVE = "menuHoverActive";
var MENUCLICK = "menuClick";
var TOPBARITEMCLICK = "topbarItemClick";
var MEGAMENUCLICK = "megaMenuClick";
var MEGAMENUMOBILECLICK = "megaMenuMobileClick";
var RIGHTPANELCLICK = "rightPanelClick";
var TOPBARMOBILEMENUCLICK = "topbarMobileMenuClick";
var TOPBARMOBILEMENUACTIVE = "topbarMobileMenuActive";
var UserSettingsService = /** @class */ (function () {
    function UserSettingsService() {
    }
    Object.defineProperty(UserSettingsService.prototype, "darkMode", {
        get: function () {
            if (this._darkMode) {
                return this._darkMode;
            }
            this._darkMode = localStorage.getItem(DARKMODE) === 'true';
            return this._darkMode;
        },
        set: function (value) {
            this._darkMode = value;
            if (!value) {
                localStorage.removeItem(DARKMODE);
            }
            else {
                localStorage.setItem(DARKMODE, value ? 'true' : 'false');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "menuMode", {
        get: function () {
            if (this._menuMode) {
                return this._menuMode;
            }
            this._menuMode = localStorage.getItem(MENUMODE);
            return this._menuMode;
        },
        set: function (value) {
            this._menuMode = value;
            if (!value) {
                localStorage.removeItem(MENUMODE);
            }
            else {
                localStorage.setItem(MENUMODE, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "menuColor", {
        get: function () {
            if (this._menuColor) {
                return this._menuColor;
            }
            this._menuColor = localStorage.getItem(MENUCOLOR);
            return this._menuColor;
        },
        set: function (value) {
            this._menuColor = value;
            if (!value) {
                localStorage.removeItem(MENUCOLOR);
            }
            else {
                localStorage.setItem(MENUCOLOR, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "menuColorMode", {
        get: function () {
            if (this._menuColorMode) {
                return this._menuColorMode;
            }
            this._menuColorMode = localStorage.getItem(MENUCOLORMODE);
            return this._menuColor;
        },
        set: function (value) {
            this._menuColorMode = value;
            if (!value) {
                localStorage.removeItem(MENUCOLORMODE);
            }
            else {
                localStorage.setItem(MENUCOLORMODE, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "menuTheme", {
        get: function () {
            if (this._menuTheme) {
                return this._menuTheme;
            }
            this._menuTheme = localStorage.getItem(MENUTHEME);
            return this._menuTheme;
        },
        set: function (value) {
            this._menuTheme = value;
            if (!value) {
                localStorage.removeItem(MENUTHEME);
            }
            else {
                localStorage.setItem(MENUTHEME, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "componentsColor", {
        get: function () {
            if (this._componentsColor) {
                return this._componentsColor;
            }
            this._componentsColor = localStorage.getItem(COMPONENTSCOLOR);
            return this._componentsColor;
        },
        set: function (value) {
            this._componentsColor = value;
            if (!value) {
                localStorage.removeItem(COMPONENTSCOLOR);
            }
            else {
                localStorage.setItem(COMPONENTSCOLOR, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "leftMenuLock", {
        get: function () {
            if (this._leftMenuLock) {
                return this._leftMenuLock;
            }
            this._leftMenuLock = localStorage.getItem(LEFTMENULOCK) === 'true';
            return this._leftMenuLock;
        },
        set: function (value) {
            this._leftMenuLock = value;
            if (!value) {
                localStorage.removeItem(LEFTMENULOCK);
            }
            else {
                localStorage.setItem(LEFTMENULOCK, value ? 'true' : 'false');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "layoutColor", {
        get: function () {
            if (this._layoutColor) {
                return this._layoutColor;
            }
            this._layoutColor = localStorage.getItem(LAYOUTCOLOR);
            return this._layoutColor;
        },
        set: function (value) {
            this._layoutColor = value;
            if (!value) {
                localStorage.removeItem(LAYOUTCOLOR);
            }
            else {
                localStorage.setItem(LAYOUTCOLOR, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "themeColor", {
        get: function () {
            if (this._themeColor) {
                return this._themeColor;
            }
            this._themeColor = localStorage.getItem(THEMECOLOR);
            return this._themeColor;
        },
        set: function (value) {
            this._themeColor = value;
            if (!value) {
                localStorage.removeItem(THEMECOLOR);
            }
            else {
                localStorage.setItem(THEMECOLOR, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSettingsService.prototype, "horizontalMenu", {
        get: function () {
            if (this._horizontalMenu) {
                return this._horizontalMenu;
            }
            this._horizontalMenu = localStorage.getItem(HORIZONTALMENU) === 'true';
            return this._horizontalMenu;
        },
        set: function (value) {
            this._horizontalMenu = value;
            if (!value) {
                localStorage.removeItem(HORIZONTALMENU);
            }
            else {
                localStorage.setItem(HORIZONTALMENU, value ? 'true' : 'false');
            }
        },
        enumerable: false,
        configurable: true
    });
    UserSettingsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserSettingsService);
    return UserSettingsService;
}());
exports.UserSettingsService = UserSettingsService;
//# sourceMappingURL=user-settings.service.js.map